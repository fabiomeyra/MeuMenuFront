import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {

  @ViewChild('confirmarExclusao') confirmarExclusao: ConfirmDialogComponent | undefined;

  produtos: any;
  categorias: any;
  isLoading = false;
  categoriaSelecionada = 0;
  produtoEdit: any;
  produtoParaExclusao: any;

  constructor(
    public produtoService: ProdutoService,
    public notificacaoService: NotificacaoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obterTodosProdutos();

    this.produtoService.getCategorias().subscribe(
      (response) => {
        this.categorias = response.data
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error.error});
      }
    );
  }

  carregarProdutos() {
    if (this.categoriaSelecionada == 0)
      this.obterTodosProdutos();
    else
      this.obterProdutosPorCategoria(this.categoriaSelecionada);
  }

  obterTodosProdutos() {
    this.isLoading = true;
    this.produtoService.getProdutos().subscribe(
      (response) => {
        this.produtos = response.data
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error.error});
      }
    );
  }

  obterProdutosPorCategoria(categoriaId: any) {
    this.isLoading = true;
    this.produtoService.getProdutosPorCategoria(categoriaId).subscribe(
      (response) => {
        this.produtos = response.data
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error.error});
      }
    );
  }

  alterarProduto(produto: any) {
    const dadosSerializados = encodeURIComponent(JSON.stringify(produto.produtoId));
    this.router.navigate(['/editar-produto', dadosSerializados]);
  }

  deletarProduto(produto: any) {
    this.isLoading = true;
    this.produtoService.deletarProduto(produto.produtoId).subscribe(
      (response) => {
        this.carregarProdutos();
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

  changeCategoria(event: any) {
    this.categoriaSelecionada = event.target.value;
    this.carregarProdutos();
  }

  abrirDialogExclusao(produto: any) {
    this.produtoParaExclusao = produto;
    this.confirmarExclusao?.abrir();
  }

  confirmou(valor: boolean) {
    if(!valor || !this.produtoParaExclusao) {
      this.produtoParaExclusao = null;
      return;
    }
    this.deletarProduto(this.produtoParaExclusao);
  }
}
