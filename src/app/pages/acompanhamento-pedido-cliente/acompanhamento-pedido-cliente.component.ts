import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho/carrinho.service';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-acompanhamento-pedido-cliente',
  templateUrl: './acompanhamento-pedido-cliente.component.html',
  styleUrls: ['./acompanhamento-pedido-cliente.component.scss'],
})
export class AcompanhamentoPedidoClienteComponent {
  qtd: any = 1;
  produtosPedido: any;
  totalprice: any = 0;
  submitted = false;
  pedidoStatus = '';
  pedidoStatusId: any;
  isLoading = false;
  timer: any;

  constructor(
    public carrinhoService: CarrinhoService,
    public pedidoService: PedidoService,
    private router: Router,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.consultarStatusPedido();
    this.produtosPedido = this.pedidoService.pedido.produtos;
    this.produtosPedido.forEach((element: any) => {
      this.totalprice += element.total;
    });

    this.timer = setInterval(() => {
      this.consultarStatusPedido();
    }, 10000); // 10 segundos
  }

  consultarStatusPedido() {
    this.pedidoService.getPedidoPorId(this.pedidoService.pedido.pedidoId).subscribe(
      (response) => {
        this.pedidoStatus = response.data.situacaoPedidoDrescricao;
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
      }
    );
  }

  calculatetotal(i: any, ev: any) {
    this.qtd = ev.target.value;
    this.produtosPedido[i].total =
      parseFloat(this.produtosPedido[i].produtoValor) * this.qtd;

    if (this.produtosPedido[i].qtd > this.qtd)
      this.totalprice -= parseFloat(this.produtosPedido[i].produtoValor);
    else this.totalprice += parseFloat(this.produtosPedido[i].produtoValor);

    this.produtosPedido[i].qtd = this.qtd;
  }

  removecart(i: any) {
    this.totalprice -= parseFloat(this.produtosPedido[i].total);
    this.carrinhoService.removerProduto(i);
  }

  setprice(price: any) {
    return price.toFixed(2);
  }

  finalizarPedido() {
    this.isLoading = true;

    clearInterval(this.timer);

    const pedido = {
      pedidoId: this.pedidoService.pedido.pedidoId,
      situacaoId: 5, // conta solicitada
    };

    this.pedidoService.alterarSituacaoPedido(pedido).subscribe(
      () => {
        this.notificacaoService.exibirMsgSucesso({
          msg: 'Seu pedido foi finalizado com sucesso, em breve um atendente irá levar sua conta até sua mesa!',
          titulo: 'Pedido Finalizado'
        });
        this.pedidoService.limparPedido();
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
      }
    );
  }
}
