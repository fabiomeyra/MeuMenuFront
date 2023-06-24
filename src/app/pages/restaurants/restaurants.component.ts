import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { products } from './data';
import { cartdata } from '../cart/data';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  products: any;
  productdetail: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.products = products
  }

  // open modal
  openModal(content: any, i: any) {
    this.productdetail = this.products[i]
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  // add to cart product
  addtocart(i: any) {
    cartdata.push(this.products[i])
  }
  
  addcart(product:any){
    cartdata.push(product)
  }

  // filter product
  selectcategory(category: any, event: any) {
    const iconItems = document.querySelectorAll('.filter-list');
    iconItems.forEach((item: any) => {
      var el = item.querySelectorAll('li')
      el.forEach((item: any) => {
        var element = item.querySelector('a').innerHTML
        if (element === category) {
          item.querySelector('a')?.classList.add("active");
        } else {
          item.querySelector('a').classList.remove("active");
        }
      })
    });
    this.products = products.filter((item: any) => {
      return item.category === category
    })
  }

}
