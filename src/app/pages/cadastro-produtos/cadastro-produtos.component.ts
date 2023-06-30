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
  produtoImgEdit: string = '';

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
          this.notificacaoService.mostrarMsgErro({ errosApi: error });
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
          this.produtoImgEdit = response.data.produtoImagem;
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          if (error instanceof HttpErrorResponse)
            this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
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

    const payload = {
      produtoDescricao: form.produtoDescricao,
      produtoAtivo: form.produtoAtivo == 'true',
      produtoValor: form.produtoValor,
      produtoIngredientes: form.produtoIngredientes,
      produtoCalorias: form.produtoCalorias,
      produtoAlergias: form.produtoAlergias,
      categoriaId: form.categoriaId,
      produtoImagem: '',
    };

    if (this.produtoImagem) {
      this.fileToBase64(this.produtoImagem)
        .then((base64) => {
          payload.produtoImagem = base64;

          if (this.produtoIdEdit) this.alterarProduto(payload);
          else this.cadastrarProduto(payload);
        })
        .catch((error) => {
          this.notificacaoService.exibirMsgErro({ msg: error });
          console.log('-- error: ', error);
        });
    } else {
      if (this.produtoIdEdit) this.alterarProduto(payload);
      else this.cadastrarProduto(payload);
    }
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
          this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
      }
    );
  }

  alterarProduto(produto: any) {
    produto.produtoId = this.produtoIdEdit;

    produto.produtoImagem = produto.produtoImagem || this.produtoImgEdit;

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
          this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
      }
    );
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64 = base64String.split(',')[1]; // Remove o cabeçalho da string Base64
        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }
}
