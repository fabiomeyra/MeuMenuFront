import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

// page routing
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

// Swiper Slider
import { SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';

import { CategoriasComponent } from './categorias/categorias.component';
import { IndexComponent } from './index/index.component';

import { NgbDropdownModule, NgbProgressbarModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// scroll package
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import AuthGuard from '../shared/guard/auth.guard';
import { AcompanhamentoPedidoClienteComponent } from './acompanhamento-pedido-cliente/acompanhamento-pedido-cliente.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { LoginComponent } from './login/login.component';
import { ListaUsuariosComponent } from './usuario/listar/lista-usuarios.component';


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
    AcompanhamentoPedidoClienteComponent,
    LoginComponent,
    ListaUsuariosComponent
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
