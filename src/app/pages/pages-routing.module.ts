import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { AcompanhamentoPedidoClienteComponent } from './acompanhamento-pedido-cliente/acompanhamento-pedido-cliente.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent
  },
  {
    path: 'categoria/:id/:descricao', component: CategoriasComponent
  },
  {
    path: 'carrinho', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'produtos', component: ListaProdutosComponent
  },
  {
    path: 'cadastrar-produto', component: CadastroProdutosComponent
  },
  {
    path: 'editar-produto/:produto', component: CadastroProdutosComponent
  },
  {
    path: 'acompanhar-pedido/:pedido', component: AcompanhamentoPedidoClienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
