import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { cartdata } from './data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  formData!: UntypedFormGroup;
  qty: any = 1;
  cartproduct: any;
  totalprice: any = 0;
  submitted = false;

  constructor(public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    // Validation
    this.formData = this.formBuilder.group({
      promocode: ['', [Validators.required]],
    });

    this.cartproduct = cartdata
    this.cartproduct.forEach((element: any) => {
      element['total'] = element.price
      element['qty'] = 1
      this.totalprice += parseFloat(element.price)
    });
  }

  /**
* Returns form
*/
  get form() {
    return this.formData.controls;
  }

  calculatetotal(i: any, ev: any) {
    this.qty = ev.target.value
    this.cartproduct[i].total = parseFloat(this.cartproduct[i].price) * this.qty

    if (this.cartproduct[i].qty > this.qty) {
      this.totalprice -= parseFloat(this.cartproduct[i].price)
    } else {
      this.totalprice += parseFloat(this.cartproduct[i].price)
    }
    this.cartproduct[i].qty = this.qty
  }

  removecart(i: any) {
    this.totalprice -= parseFloat(this.cartproduct[i].total)
    this.cartproduct.splice(i, 1)
  }

  setprice(price: any) {
    return price.toFixed(2)
  }

  applycode() {
    this.submitted = true
  }


}
