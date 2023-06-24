import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryData, resturants, Reviews } from './data';

// Swiper Slider
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  category: any;
  restaurants: any;
  review: any;

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.category = categoryData
    this.restaurants = resturants
    this.review = Reviews

    document.querySelector('.cart')?.classList.add('d-none')
  }

  /**
 * Swiper setting
 */
  public config: SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 25,
    pagination: true,
    breakpoints: {
      575: {
        slidesPerView: 2,
      },
      850: {
        slidesPerView: 3,
      },
      1080: {
        slidesPerView: 4,
      }
    }
  };


  godetail() {
    // this.router.navigate('category')
    // this.router.navigate(['/ecommerce/product-detail/1', this.products[id]])
  }


}
