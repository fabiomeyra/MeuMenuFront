import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormGroup } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { NgxCurrencyModule } from 'ngx-currency';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss']
})
export class CadastroProdutosComponent implements OnInit {

  formData!: FormGroup;
  submitted = false;
  categorias: any;
  produtoImagem!: File;
  isLoading: boolean = false;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public produtoService: ProdutoService,
  ) { }

  ngOnInit(): void {
    this.produtoService.getCategorias().subscribe(
      (categorias) => {
      this.categorias = categorias.data;
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          console.log("-- error: ", error);
        }
      }
    );

    // Validation
    this.formData = this.formBuilder.group({
      descricao: ['', [Validators.required]],
      status: ['true', [Validators.required]],
      valor: ['', [Validators.required]],
      ingredientes: ['', [Validators.required]],
      calorias: ['', [Validators.required]],
      alergias: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
    });
  }

  
  /**
  * Returns form
  */
  get form() {
    return this.formData.controls;
  }

  onFileSelected(event: any) {
    this.produtoImagem = event.target.files[0];
  }

  limparCampos() {
    this.formData.reset();
  }

  cadastrarProduto() {
    let form = this.formData.value;
    this.submitted = true;
    this.isLoading = true;

    const formData: FormData = new FormData();
    formData.append('produtoDescricao', form.descricao);
    formData.append('ProdutoAtivo', form.status);
    formData.append('ProdutoValor', form.valor);
    formData.append('ProdutoIngredientes', form.ingredientes);
    formData.append('ProdutoCalorias', form.calorias);
    formData.append('ProdutoAlergias', form.alergias);
    formData.append('CategoriaId', form.categoria);
    formData.append('ProdutoImagem', this.produtoImagem, this.produtoImagem.name);

    this.produtoService.cadastrarProduto(formData).subscribe((produto) => {
      this.limparCampos();
      this.submitted = false;
      this.isLoading = false;
    },
    (error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        this.submitted = false;
        this.isLoading = false;
        console.log("-- error: ", error);
      }
    });
  }

}
