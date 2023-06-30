import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho/carrinho.service';
import { MesaPedidoService } from 'src/app/services/mesa-pedido/mesa-pedido.service';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  qtd: any = 1;
  cartproduct: any;
  totalprice: any = 0;
  submitted = false;
  observacoes = '';
  isLoading = false;

  constructor(
    public carrinhoService: CarrinhoService,
    public pedidoService: PedidoService,
    private router: Router,
    private notificacaoService: NotificacaoService,
    private mesaPedidoService: MesaPedidoService
  ) {}

  ngOnInit(): void {
    this.iniciarCarrinho();
    this.atualizarCarrinho();
  }

  iniciarCarrinho() {
    this.cartproduct = this.carrinhoService.produtos;
    this.cartproduct.forEach((element: any, index: any) => {
      if (!element.qtd) {
        element['qtd'] = 1;
      }

      element['total'] =
        parseFloat(element.produtoValor) * parseFloat(element.qtd);
      this.totalprice +=
        parseFloat(element.produtoValor) * parseFloat(element.qtd);
    });
  }

  atualizarCarrinho() {
    this.carrinhoService.produtos = this.cartproduct;
    this.carrinhoService.salvarCarrinho();
  }

  calculatetotal(i: any, ev: any) {
    this.qtd = ev.target.value;
    this.cartproduct[i].total =
      parseFloat(this.cartproduct[i].produtoValor) * this.qtd;

    if (this.cartproduct[i].qtd > this.qtd)
      this.totalprice -= parseFloat(this.cartproduct[i].produtoValor);
    else this.totalprice += parseFloat(this.cartproduct[i].produtoValor);

    this.cartproduct[i].qtd = this.qtd;
    this.atualizarCarrinho();
  }

  removecart(i: any) {
    this.totalprice -= parseFloat(this.cartproduct[i].total);
    this.carrinhoService.removerProduto(i);
  }

  setprice(price: any) {
    return price.toFixed(2);
  }

  finalizarPedido() {
    this.isLoading = true;
    const mesaOcupada = this.mesaPedidoService.retornaMesaOcupada;

    if (!mesaOcupada) {
      this.notificacaoService.exibirMsgErro({ msg: 'Mesa não ocupada!' });
      this.isLoading = false;
      return;
    }

    let pedido = {
      pedidoId: '',
      pedidoStatus: '',
      pedidoObservacao: this.observacoes,
      pedidoMesa: mesaOcupada,
      produtos: this.carrinhoService.produtos.map((obj) => ({
        produtoId: obj.produtoId,
        produtoQuantidade: parseInt(obj.qtd),
        produtoImagem: obj.produtoImagem,
        produtoDescricao: obj.produtoDescricao,
        total: obj.total,
        qtd: obj.qtd,
      })),
    };

    this.pedidoService.cadastrarPedido(pedido).subscribe(
      (response) => {
        this.notificacaoService.exibirMsgSucesso();
        pedido.pedidoId = response.data.pedidoId;
        pedido.pedidoStatus = response.data.situacaoPedidoDrescricao;

        this.pedidoService.pedido = pedido;
        this.pedidoService.salvarPedido();
        this.carrinhoService.limparCarrinho();
        this.iniciarCarrinho();
        this.totalprice = 0;
        this.observacoes = '';
        this.isLoading = false;

        const dadosSerializados = encodeURIComponent(
          JSON.stringify(pedido.pedidoId)
        );
        this.router.navigate(['/acompanhar-pedido', dadosSerializados]);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
      }
    );
  }
}
