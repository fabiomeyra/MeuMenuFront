import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public pedido: any = {};

  constructor() {
    this.recuperarPedido();
  }

  limparPedido() {
    this.pedido = {};
    this.salvarPedido();
  }

  salvarPedido() {
    localStorage.setItem('pedido', JSON.stringify(this.pedido));
  }

  private recuperarPedido() {
    const pedido = localStorage.getItem('pedido');
    if (pedido) {
      this.pedido = JSON.parse(pedido);
    }

    return this.pedido;
  }
}
