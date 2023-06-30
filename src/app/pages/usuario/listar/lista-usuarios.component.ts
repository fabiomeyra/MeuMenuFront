import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';
import { FiltroPesquisaUsuarioModel } from 'src/app/shared/models/filtroPesquisaUsuarioModel';
import { PerfilUsuarioModel } from 'src/app/shared/models/perfilUsuarioModel';
import { UsuarioModel } from 'src/app/shared/models/usuarioModel';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  @ViewChild('confirmarExclusao') confirmarExclusao: ConfirmDialogComponent | undefined;

  usuarios: Array<UsuarioModel> = [];
  perfis: Array<PerfilUsuarioModel> = [];
  isLoading = false;
  usuarioParaExclusao: UsuarioModel | undefined | null;
  quantidadeTotalBusca: number = 0;
  nomeUsuarioAtualizado = new Subject<string>();
  loginUsuarioAtualizado = new Subject<string>();

  filtroPesquisa: FiltroPesquisaUsuarioModel = new FiltroPesquisaUsuarioModel({
    perfilId: -1,
    quantidadePorPagina: 5,
    paginaAtual: 1
  });

  constructor(
    public usuarioService: UsuarioService,
    public notificacaoService: NotificacaoService,
    private router: Router,
  ) { 
    this.nomeUsuarioAtualizado.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(value=> {
        this.pesquisarUsuarios();
      });

    this.loginUsuarioAtualizado.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(value=> {
        this.pesquisarUsuarios();
      });
  }

  ngOnInit(): void {
    this.pesquisarUsuarios();

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

  proximaPagina() {
    this.filtroPesquisa.paginaAtual = this.filtroPesquisa?.paginaAtual ?? 0 + 1;
    this.pesquisarUsuarios();
  }

  paginaAnterior() {
    this.filtroPesquisa.paginaAtual = this.filtroPesquisa?.paginaAtual ?? 0 - 1;
    this.pesquisarUsuarios();
  }

  definirPaginaAtual(pagina: number){
    this.filtroPesquisa.paginaAtual = pagina;
    this.pesquisarUsuarios();
  }

  pesquisarUsuarios() {
    console.log('filtro: ', this.filtroPesquisa)
    this.isLoading = true;
    this.usuarioService.pesquisar(this.filtroPesquisa).subscribe(
      ({ data }) => {
        this.isLoading = false;
        this.usuarios = data.lista
        this.quantidadeTotalBusca = data.quantidadeTotalRegistros
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error.error});
      }
    );
  }

  alterar(usuario: UsuarioModel) {
    const dadosSerializados = encodeURIComponent(JSON.stringify(usuario.usuarioId));
    this.router.navigate(['/editar-usuario', dadosSerializados]);
  }

  deletar(usuario: UsuarioModel) {
    this.isLoading = true;
    this.usuarioService.excluir(usuario.usuarioId ?? '').subscribe(
      () => {
        this.pesquisarUsuarios();
        this.isLoading = false;
        this.notificacaoService.exibirMsgSucesso();
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error.error});
      }
    );
  }

  abrirDialogExclusao(usuario: UsuarioModel) {
    this.usuarioParaExclusao = usuario;
    this.confirmarExclusao?.abrir();
  }

  confirmou(valor: boolean) {
    if(!valor || !this.usuarioParaExclusao) {
      this.usuarioParaExclusao = null;
      return;
    }
    this.deletar(this.usuarioParaExclusao);
  }
}
