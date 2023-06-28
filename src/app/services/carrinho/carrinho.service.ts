import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  public produtos: any[] = [];

  constructor() {
    this.recuperarCarrinho();
  }

  adicionarProduto(produto: any) {
    this.produtos.push(produto);
    this.salvarCarrinho();
  }

  removerProduto(index: any) {
    if (index !== -1) {
      this.produtos.splice(index, 1);
      this.salvarCarrinho();
    }
  }

  limparCarrinho() {
    this.produtos = [];
    this.salvarCarrinho();
  }

  salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(this.produtos));
  }

  private recuperarCarrinho() {
    const carrinho = localStorage.getItem('carrinho');
    if (carrinho) {
      this.produtos = JSON.parse(carrinho);
    }

    return this.produtos;
  }
}
