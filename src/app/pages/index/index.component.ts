import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryData, resturants, Reviews } from './data';

// Swiper Slider
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  category: any;
  restaurants: any;
  review: any;
  isLoading: boolean = true;

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor(
    public router: Router,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.verificaPedidoAberto();

    this.produtoService.getCategorias().subscribe(
      (response) => {
        this.category = response.data;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          console.log('-- error: ', error);
          this.isLoading = false;
        }
      }
    );

    document.querySelector('.cart')?.classList.add('d-none');
  }

  verificaPedidoAberto() {
    if (this.pedidoService.pedido.pedidoId) {
      const dadosSerializados = encodeURIComponent(
        JSON.stringify(this.pedidoService.pedido.pedidoId)
      );
      this.router.navigate(['/acompanhar-pedido', dadosSerializados]);
    }
  }

  godetail() {}
}
