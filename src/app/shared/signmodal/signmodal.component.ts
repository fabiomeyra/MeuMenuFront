import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { CriptografiaService } from 'src/app/services/criptografia/criptografia.service';
import { RealizarLoginModel } from '../models/realizarLoginModel';

@Component({
  selector: 'app-signmodal',
  templateUrl: './signmodal.component.html',
  styleUrls: ['./signmodal.component.scss']
})
export class SignmodalComponent implements OnInit {

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
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private criptografiaService: CriptografiaService) { }

  ngOnInit(): void {

    // Validation
    this.formData = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  /**
  * Close modal
  */
   closemodal() {
    // this.submitted = false;
    this.modalService.dismissAll();
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
    .subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.modalService.dismissAll();
    }, err => {
      this.isLoading = false;
      console.log(err);
    })

  }

}

