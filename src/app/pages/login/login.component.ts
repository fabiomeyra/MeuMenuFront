import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { CriptografiaService } from 'src/app/services/criptografia/criptografia.service';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { RealizarLoginModel } from 'src/app/shared/models/realizarLoginModel';
import { Router } from '@angular/router';
import { MesaPedidoService } from 'src/app/services/mesa-pedido/mesa-pedido.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isCollapsed = true;
  formData!: UntypedFormGroup;
  signupformData!:UntypedFormGroup;
  signupPassfield!: boolean;
  fieldTextType:any;
  submitted = false;
  isLoading = false;
  signupsubmit = false;

  constructor(
    public formBuilder: UntypedFormBuilder, 
    private router: Router, 
    private usuarioService: UsuarioService,
    private mesaPedidoService: MesaPedidoService,
    private notificacaoService: NotificacaoService,
    private criptografiaService: CriptografiaService) { }

  ngOnInit(): void {

    // Validation
    this.formData = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      mesa: [0, [Validators.required]]
    });

  }

  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType
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

  /**
 * submit signin form
 */
  signin() {
    if (this.formData.valid) {
      var usuario = new RealizarLoginModel();
      usuario.login = this.formData.get('login')!.value 
      let senha = this.formData.get('password')!.value;
      usuario.senha = this.criptografiaService.criptografar(senha);
      this.realizarLogin(usuario);
    }

    this.submitted = true;
  }

  realizarLogin(usuario: RealizarLoginModel) {
    this.isLoading = true;
    this.usuarioService.realizarLogin(usuario)
    .subscribe(() => {
      this.isLoading = false;
      this.ocuparMesa();
    }, (error: HttpErrorResponse) => {
      this.isLoading = false;
      if (error instanceof HttpErrorResponse)
        this.notificacaoService.mostrarMsgErro({errosApi: error?.error});
    })

  }

  finalizarLogin() {
    this.router.navigate(['/']);
    this.notificacaoService.exibirMsgSucesso({msg: 'Seja bem vindo!'})
  }

  ocuparMesa() {
    var mesa = Number(this.formData.get('mesa')!.value ?? "0")
    if(mesa <= 0) {
      this.mesaPedidoService.definirMesaOcupada(-2);
      return this.finalizarLogin();
    }

    this.isLoading = true;
    this.mesaPedidoService.ocuparMesa(mesa).subscribe(() => {
      this.usuarioService.definirUsuarioTipoPedido();
      this.mesaPedidoService.definirMesaOcupada(mesa);
      this.finalizarLogin();
    }, 
    (error: HttpErrorResponse) => {
      this.usuarioService.realizarLogOut();
      this.isLoading = false;
      if (error instanceof HttpErrorResponse)
        this.notificacaoService.mostrarMsgErro({errosApi: error?.error});
    })
  }
}

