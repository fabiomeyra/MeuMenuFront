import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
} from '@angular/forms';
import { SignmodalComponent } from '../signmodal/signmodal.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { cartdata } from 'src/app/pages/cart/data';
import { CarrinhoService } from 'src/app/services/carrinho/carrinho.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { MesaPedidoService } from 'src/app/services/mesa-pedido/mesa-pedido.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { ConfirmDialogComponent } from '../dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onIsLoading = new EventEmitter<boolean>();

  @ViewChild('confirmarLogOut') confirmarLogOut: ConfirmDialogComponent | undefined;

  public isCollapsed = true;
  formData!: UntypedFormGroup;
  signupformData!: UntypedFormGroup;
  signupPassfield!: boolean;
  fieldTextType: any;
  submitted = false;
  signupsubmit = false;
  selectedLocation: any;
  carts: any;
  total: any = 0;
  term: any;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    public translate: TranslateService,
    public router: Router,
    public usuarioService: UsuarioService,
    private notificacaoService: NotificacaoService,
    private mesaPedidoService: MesaPedidoService,
    public carrinhoService: CarrinhoService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.selectedLocation = 'New York';

    this.carts = this.carrinhoService.produtos;

    // Validation
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.signupformData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // calculate cart total
  calculatetotal(total: any) {
    this.total = 0;
    this.carts.forEach((element: any) => {
      this.total += parseFloat(element.produtoValor) * parseFloat(element.qtd);
    });
    return this.total.toFixed(2);
  }

  // set location
  ChangeLocation(location: any) {
    this.selectedLocation = location;
  }

  /**
   * Open modal
   */
  openModal() {
    // this.submitted = false;
    this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  /**
   * Password Hide/Show
   */
  togglesignupPassfield() {
    this.signupPassfield = !this.signupPassfield;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  /**
   * Returns signup form
   */
  get signupform() {
    return this.signupformData.controls;
  }

  logOut() {
    if (
      !this.mesaPedidoService.retornaMesaOcupada ||
      this.mesaPedidoService.retornaMesaOcupada <= 0
    )
      return this.limparDadosUsuarioLogado();

    this.carrinhoService.limparCarrinho();
    this.onIsLoading.emit(true);
    this.mesaPedidoService.desocuparMesa().subscribe(
      () => {
        this.onIsLoading.emit(false);
        this.limparDadosUsuarioLogado();
      },
      (error: HttpErrorResponse) => {
        this.onIsLoading.emit(false);
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
      }
    );
  }

  limparDadosUsuarioLogado() {
    this.usuarioService.realizarLogOut();
    this.router.navigate(['/login']);
  }

  abrirDialogConfirmarLogOut() {
    this.confirmarLogOut?.abrir();
  }

  confirmalogOut(deslogar: boolean){
    if(deslogar) this.logOut();
  }

  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (
      document.body.scrollTop > 350 ||
      document.documentElement.scrollTop > 350
    ) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.add('show');
    } else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.remove('show');
    }
  }

  // remove from cart
  removecart(i: any, produto: any) {
    this.total -= parseFloat(this.carts[i].produtoValor);
    this.total = this.total.toFixed(2);
    this.carrinhoService.removerProduto(i);
  }

  get usuarioEstaLogado() {
    return this.usuarioService.usuarioEstaLogado;
  }

  get podeExibirAbaProdutos() {
    var usuario = this.usuarioService.getUsuario;
    return (
      this.usuarioService.usuarioEstaLogado && usuario?.permissao === 'ADMIN'
    );
  }
}
