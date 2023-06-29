import { Component, OnInit, ViewChild } from '@angular/core';

// Swiper Slider
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';

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
  headerIsLoading: boolean = false;

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor(
    public router: Router,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService,
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
        this.isLoading = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error?.error});
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

  tratarHeaderCarregando(valor: boolean){
    this.headerIsLoading = valor;
  }

  godetail() {}
}
