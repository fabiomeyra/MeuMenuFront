import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {

  produtos: any;
  categorias: any;
  isLoading = false;
  categoriaSelecionada = 0;
  produtoEdit: any;

  constructor(
    public produtoService: ProdutoService,
  ) { }

  ngOnInit(): void {
    this.obterTodosProdutos();

    this.produtoService.getCategorias().subscribe(
      (response) => {
        this.categorias = response.data
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          console.log("-- error: ", error);
        }
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
        if (error instanceof HttpErrorResponse) {
          console.log("-- error: ", error);
          this.isLoading = false;
        }
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
        if (error instanceof HttpErrorResponse) {
          console.log("-- error: ", error);
          this.isLoading = false;
        }
      }
    );
  }

  alterarProduto(produto: any) {
    this.produtoEdit = produto;
  }

  deletarProduto(produto: any) {
    this.isLoading = true;
    this.produtoService.deletarProduto(produto.produtoId).subscribe(
      (response) => {
        this.carregarProdutos();
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          console.log("-- error: ", error);
          this.isLoading = false;
        }
      }
    );
  }

  changeCategoria(event: any) {
    this.categoriaSelecionada = event.target.value;
    this.carregarProdutos();
  }
}
