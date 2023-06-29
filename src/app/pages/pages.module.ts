import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

// page routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { CategoriasComponent } from './categorias/categorias.component';
import { IndexComponent } from './index/index.component';

import { NgbRatingModule, NgbDropdownModule, NgbTooltipModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';

// scroll package
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { NgxCurrencyModule } from 'ngx-currency';
import AuthGuard from '../shared/guard/auth.guard';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    CategoriasComponent,
    IndexComponent,
    CartComponent,
    CheckoutComponent,
    ListaProdutosComponent,
    CadastroProdutosComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    SwiperModule,
    NgbNavModule,
    NgbRatingModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule, 
    NgbProgressbarModule,
    NgxCurrencyModule,
    ScrollToModule.forRoot()
  ],
  providers: [AuthGuard]

})
export class PagesModule { }
