import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-acompanhamento-pedido-geral',
  templateUrl: './acompanhamento-pedido-geral.component.html',
  styleUrls: ['./acompanhamento-pedido-geral.component.scss'],
})
export class AcompanhamentoPedidoGeralComponent {
  formData!: FormGroup;
  submitted = false;
  situacoes: any;
  pedidos: any = [];
  produtoImagem!: File;
  isLoading: boolean = false;
  produtoIdEdit: string = '';
  produtoImgEdit: string = '';
  situacaoSelecionada = 0;
  perfilUsuarioLogado: any = '';

  constructor(
    public formBuilder: UntypedFormBuilder,
    public produtoService: ProdutoService,
    public pedidoService: PedidoService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.perfilUsuarioLogado = this.usuarioService.retornaPermissaoUsuario;

    this.pedidoService.getSituacoes().subscribe(
      (response) => {
        this.situacoes = response.data;
        this.filtrarSituacoesPorPerfil();
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          this.notificacaoService.mostrarMsgErro({ errosApi: error });
          console.log('-- error: ', error);
        }
      }
    );
  }

  filtrarSituacoesPorPerfil() {
    switch (this.perfilUsuarioLogado) {
      case 'COZINHA':
        this.filtrarSituacoesCozinha();
        break;

      case 'GARCOM':
        this.filtrarSituacoesGarcom();
        break;

      default:
        break;
    }
  }

  filtrarSituacoesCozinha() {
    this.situacoes = this.situacoes.filter(
      (s: any) =>
        s.situacaoPedidoId == 1 || // ENVIADO
        s.situacaoPedidoId == 2    // EM PREPARO
    );
  }

  filtrarSituacoesGarcom() {
    this.situacoes = this.situacoes.filter(
      (s: any) =>
        s.situacaoPedidoId == 2 || // EM PREPARO
        s.situacaoPedidoId == 3 || // PRONTO
        s.situacaoPedidoId == 5    // CONTA SOLICITADA
    );
  }

  changeSituacao(event: any) {
    this.isLoading = true;
    this.situacaoSelecionada = event.target.value;
    let produtosResumo = '';

    this.pedidoService
      .getPedidosPorSituacao(this.situacaoSelecionada, true, 1, 100)
      .subscribe(
        (response) => {
          this.pedidos = response.data;

          this.pedidos.forEach(
            (pedido: any, index: any, arrayOriginal: any) => {
              pedido.produtosResumo = '';

              pedido.produtosDoPedido.forEach((p: any) => {
                if (pedido.produtosResumo == '')
                  pedido.produtosResumo = p.produto?.produtoDescricao;
                else
                  pedido.produtosResumo += ', ' + p.produto?.produtoDescricao;
              });

              arrayOriginal[index] = pedido;
            }
          );

          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          if (error instanceof HttpErrorResponse)
            this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
        }
      );
  }

  visualizarPedido(pedido: any) {
    const dadosSerializados = encodeURIComponent(pedido.pedidoId);
    this.router.navigate(['/detalhes-pedido', dadosSerializados]);
  }

  abrirDialogExclusao(produto: any) {
    // this.produtoParaExclusao = produto;
    // this.confirmarExclusao?.abrir();
  }
}
