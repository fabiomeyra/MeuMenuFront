import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { AcompanhamentoPedidoClienteComponent } from './acompanhamento-pedido-cliente/acompanhamento-pedido-cliente.component';
import AuthGuard from '../shared/guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { ListaUsuariosComponent } from './usuario/listar/lista-usuarios.component';
import { SalvarUsuarioComponent } from './usuario/salvar/salvar-usuario.component';
import { AcompanhamentoPedidoGeralComponent } from './acompanhamento-pedido-geral/acompanhamento-pedido-geral.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AuthGuard]
  },
  {
    path: 'categoria/:id/:descricao', component: CategoriasComponent
  },
  {
    path: 'carrinho', component: CartComponent, canActivate: [AuthGuard]
  },
  {
    path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]
  },
  {
    path: 'produtos', component: ListaProdutosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cadastrar-produto', component: CadastroProdutosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'editar-produto/:produto', component: CadastroProdutosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'usuarios', component: ListaUsuariosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cadastrar-usuario', component: SalvarUsuarioComponent, canActivate: [AuthGuard]
  },
  {
    path: 'editar-usuario/:usuarioId', component: SalvarUsuarioComponent, canActivate: [AuthGuard]
  },
  {
    path: 'acompanhar-pedido/:pedido', component: AcompanhamentoPedidoClienteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'acompanhar-pedidos', component: AcompanhamentoPedidoGeralComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
