import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho/carrinho.service';
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

  constructor(
    public carrinhoService: CarrinhoService,
    public pedidoService: PedidoService,
    private router: Router
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
    let pedido = {
      pedidoId: '',
      pedidoStatus: '',
      pedidoObservacao: this.observacoes,
      pedidoMesa: 1,
      produtos: this.carrinhoService.produtos.map((obj) => ({
        produtoId: obj.produtoId,
        produtoQuantidade: parseInt(obj.qtd),
        produtoImagem: obj.produtoImagem,
        produtoDescricao: obj.produtoDescricao,
        total: obj.total,
        qtd: obj.qtd,
      })),
    };

    // chamar api pedido
    pedido.pedidoId = 'pedidoId';
    pedido.pedidoStatus = "Em Andamento";

    this.pedidoService.pedido = pedido;
    this.pedidoService.salvarPedido();
    this.carrinhoService.limparCarrinho();
    this.iniciarCarrinho();
    this.totalprice = 0;
    this.observacoes = '';

    const dadosSerializados = encodeURIComponent(
      JSON.stringify(pedido.pedidoId)
    );
    this.router.navigate(['/acompanhar-pedido', dadosSerializados]);
  }
}
