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

  constructor(
    public produtoService: ProdutoService,
  ) { }

  ngOnInit(): void {

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

  editar(produto: any) {
    console.log("-- produto: ", produto);
  }

  changeCategoria(event: any) {
    console.log('--event:', event);
    const valorSelecionado = event.target.value;
    console.log('Opção selecionada:', valorSelecionado);
  }
}
