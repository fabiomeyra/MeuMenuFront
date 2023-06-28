import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho/carrinho.service';
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

  constructor(
    public carrinhoService: CarrinhoService,
    public pedidoService: PedidoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.produtosPedido = this.pedidoService.pedido.produtos;
    this.pedidoStatus = this.pedidoService.pedido.pedidoStatus;
    console.log(this.produtosPedido);
    this.produtosPedido.forEach((element: any) => {
      this.totalprice += element.total;
    });
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
    // chamar api para atualizar status

    console.log('-- pedido ', this.pedidoService.pedido);
    this.pedidoService.limparPedido();

    // mostrar mensagem de boas vindas
    this.router.navigate(['/']);
  }
}
