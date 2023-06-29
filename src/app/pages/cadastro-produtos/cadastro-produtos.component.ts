import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss'],
})
export class CadastroProdutosComponent implements OnInit {
  formData!: FormGroup;
  submitted = false;
  categorias: any;
  produtoImagem!: File;
  isLoading: boolean = false;
  produtoIdEdit: string = '';

  constructor(
    public formBuilder: UntypedFormBuilder,
    public produtoService: ProdutoService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtoService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias.data;
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          console.log('-- error: ', error);
        }
      }
    );

    this.route.params.subscribe((params) => {
      const dadosSerializados = params['produto'];
      if (dadosSerializados) {
        const dadosDeserializados = JSON.parse(
          decodeURIComponent(dadosSerializados)
        );
        this.produtoIdEdit = dadosDeserializados;
      }
    });

    // Validation
    this.formData = this.formBuilder.group({
      produtoDescricao: ['', [Validators.required]],
      produtoAtivo: ['true', [Validators.required]],
      produtoValor: ['', [Validators.required]],
      produtoIngredientes: ['', [Validators.required]],
      produtoCalorias: ['', [Validators.required]],
      produtoAlergias: ['', [Validators.required]],
      categoriaId: ['', [Validators.required]],
      produtoImagem: [''],
    });

    if (this.produtoIdEdit) {
      this.isLoading = true;
      this.produtoService.getProdutoPorId(this.produtoIdEdit).subscribe(
        (response) => {
          this.isLoading = false;
          this.formData.patchValue({
            ...response.data,
            produtoImagem: '',
            produtoAtivo: response.data.produtoAtivo ? 'true' : 'false',
          });
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          if (error instanceof HttpErrorResponse)
            this.notificacaoService.mostrarMsgErro(error);
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

  onFileSelected(event: any) {
    this.produtoImagem = event.target.files[0];
  }

  limparCampos() {
    this.formData.reset();
  }

  salvar() {
    let form = this.formData.value;
    this.submitted = true;
    this.isLoading = true;

    const formData: FormData = new FormData();
    formData.append('ProdutoDescricao', form.produtoDescricao);
    formData.append('ProdutoAtivo', form.produtoAtivo);
    formData.append('ProdutoValor', form.produtoValor);
    formData.append('ProdutoIngredientes', form.produtoIngredientes);
    formData.append('ProdutoCalorias', form.produtoCalorias);
    formData.append('ProdutoAlergias', form.produtoAlergias);
    formData.append('CategoriaId', form.categoriaId);

    if (this.produtoImagem)
      formData.append(
        'ProdutoImagem',
        this.produtoImagem,
        this.produtoImagem?.name
      );

    if (this.produtoIdEdit) this.alterarProduto(formData);
    else this.cadastrarProduto(formData);
  }

  cadastrarProduto(produto: any) {
    this.produtoService.cadastrarProduto(produto).subscribe(
      () => {
        this.limparCampos();
        this.submitted = false;
        this.isLoading = false;
        this.notificacaoService.exibirMsgSucesso();
        this.router.navigate(['/produtos']);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.submitted = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error.error});
      }
    );
  }

  alterarProduto(produto: any) {
    produto.append('ProdutoId', this.produtoIdEdit);
    this.produtoService.alterarProduto(produto, this.produtoIdEdit).subscribe(
      () => {
        this.limparCampos();
        this.submitted = false;
        this.isLoading = false;
        this.notificacaoService.exibirMsgSucesso();
        this.router.navigate(['/produtos']);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.submitted = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({errosApi: error.error});
      }
    );
  }
}
