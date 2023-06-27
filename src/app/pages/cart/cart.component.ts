import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { cartdata } from './data';
import { CarrinhoService } from 'src/app/services/carrinho/carrinho.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  formData!: UntypedFormGroup;
  qtd: any = 1;
  cartproduct: any;
  totalprice: any = 0;
  submitted = false;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public carrinhoService: CarrinhoService,
  ) { }

  ngOnInit(): void {

    this.cartproduct = this.carrinhoService.produtos;
    this.cartproduct.forEach((element: any, index: any) => {
      element['total'] = element.produtoValor

      if (!element.qtd) {
        element['qtd'] = 1
      }

      this.totalprice += parseFloat(element.produtoValor) * parseFloat(element.qtd)
    });

    this.atualizarCarrinho();
  }

  atualizarCarrinho() {
    this.carrinhoService.produtos = this.cartproduct;
    this.carrinhoService.salvarCarrinho();
  }

  /**
* Returns form
*/
  get form() {
    return this.formData.controls;
  }

  calculatetotal(i: any, ev: any) {
    this.qtd = ev.target.value;
    this.cartproduct[i].total = parseFloat(this.cartproduct[i].produtoValor) * this.qtd

    if (this.cartproduct[i].qtd > this.qtd) 
      this.totalprice -= parseFloat(this.cartproduct[i].produtoValor)
    else
      this.totalprice += parseFloat(this.cartproduct[i].produtoValor)

    this.cartproduct[i].qtd = this.qtd;
    this.atualizarCarrinho();
  }

  removecart(i: any) {
    this.totalprice -= parseFloat(this.cartproduct[i].total)
    this.carrinhoService.removerProduto(i);
  }

  setprice(price: any) {
    return price.toFixed(2)
  }
}
