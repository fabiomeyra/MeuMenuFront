import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CriptografiaService } from 'src/app/services/criptografia/criptografia.service';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { EquivalentValidator } from 'src/app/shared/EquivalentValidator/equivalentValidator';
import { PerfilUsuarioModel } from 'src/app/shared/models/perfilUsuarioModel';
import { SalvarUsuarioModel } from 'src/app/shared/models/salvarUsuarioModel';

@Component({
  selector: 'app-salvar-usuario',
  templateUrl: './salvar-usuario.component.html',
  styleUrls: ['./salvar-usuario.component.scss'],
})
export class SalvarUsuarioComponent implements OnInit {
  formData!: FormGroup;
  submitted = false;
  categorias: any;
  produtoImagem!: File;
  isLoading: boolean = false;
  usuarioEdicaoId: string = '';
  perfis: Array<PerfilUsuarioModel> = [];
  campoSenhaTipoText = false;
  campoConfirmarSenhaTipoText = false;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public usuarioService: UsuarioService,
    public criptografiaService: CriptografiaService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarPerfis();

    this.route.params.subscribe((params) => {
      const dadosSerializados = params['usuarioId'];
      if (dadosSerializados) {
        const dadosDeserializados = JSON.parse(
          decodeURIComponent(dadosSerializados)
        );
        this.usuarioEdicaoId = dadosDeserializados;
      }
    });

    // Validation
    this.formData = this.formBuilder.group({
      usuarioNome: ['', [Validators.required]],
      usuarioLogin: ['', [Validators.required]],
      perfilId: ['', [Validators.required]],
      usuarioSenha: ['', [Validators.required]],
      usuarioSenhaConfirmacao: ['', [Validators.required]]
    }, {
      validators: [ EquivalentValidator('usuarioSenha', 'usuarioSenhaConfirmacao') ]
    });

    if (this.usuarioEdicaoId) {
      this.isLoading = true;
      this.usuarioService.buscar(this.usuarioEdicaoId).subscribe(
        ({data}) => {
          this.isLoading = false;
          this.formData.patchValue({
            ...data
          });
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          if (error instanceof HttpErrorResponse)
            this.notificacaoService.mostrarMsgErro({errosApi: error?.error});
        }
      );
    }
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  limparCampos() {
    this.formData.reset();
  }
  
  buscarPerfis() {
    this.usuarioService.buscarPerfis().subscribe(
      ({data}) => {
        this.perfis = data ?? []
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error.error});
      }
    );
  }

  criptografarSenhas(usuario: SalvarUsuarioModel): SalvarUsuarioModel {
    usuario.usuarioSenha = usuario?.usuarioSenha 
      ? this.criptografiaService.criptografar(usuario.usuarioSenha)
      : usuario.usuarioSenha;

    usuario.usuarioSenhaConfirmacao = usuario?.usuarioSenhaConfirmacao 
      ? this.criptografiaService.criptografar(usuario.usuarioSenhaConfirmacao)
      : usuario.usuarioSenhaConfirmacao;

    return usuario;
  }

  salvar() {
    let form = this.formData.value;
    this.submitted = true;
    this.isLoading = true;

    if(this.formData.invalid) return;

    var usuario = new SalvarUsuarioModel({
      usuarioNome: form.usuarioNome,
      usuarioLogin: form.usuarioLogin,
      perfilId: form.perfilId,
      usuarioSenha: form.usuarioSenha,
      usuarioSenhaConfirmacao: form.usuarioSenhaConfirmacao
    });

    usuario = this.criptografarSenhas(usuario);

    if (this.usuarioEdicaoId) this.alterar(usuario);
    else this.cadastrar(usuario);
  }

  cadastrar(usuario: SalvarUsuarioModel) {
    this.usuarioService.cadastrar(usuario).subscribe(
      () => {
        this.submitted = false;
        this.isLoading = false;
        this.limparCampos();
        this.notificacaoService.exibirMsgSucesso();
        this.router.navigate(['/usuarios']);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.submitted = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error?.error});
      }
    );
  }

  alterar(usuario: SalvarUsuarioModel) {
    usuario.usuarioId = this.usuarioEdicaoId;
    this.usuarioService.atualizar(usuario).subscribe(
      () => {
        this.limparCampos();
        this.submitted = false;
        this.isLoading = false;
        this.notificacaoService.exibirMsgSucesso();
        this.router.navigate(['/usuarios']);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.submitted = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error?.error});
      }
    );
  }
}
