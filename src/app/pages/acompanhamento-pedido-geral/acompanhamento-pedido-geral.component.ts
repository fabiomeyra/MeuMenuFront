import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

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

  constructor(
    public formBuilder: UntypedFormBuilder,
    public produtoService: ProdutoService,
    public pedidoService: PedidoService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pedidoService.getSituacoes().subscribe(
      (response) => {
        this.situacoes = response.data;
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          this.notificacaoService.mostrarMsgErro({ errosApi: error });
          console.log('-- error: ', error);
        }
      }
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
                  pedido.produtosResumo +=
                    ', ' + p.produto?.produtoDescricao;
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
    this.router.navigate(['/'])
  }

  abrirDialogExclusao(produto: any) {
    // this.produtoParaExclusao = produto;
    // this.confirmarExclusao?.abrir();
  }
}
