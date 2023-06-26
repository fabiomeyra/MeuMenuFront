import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { products } from './data';
import { cartdata } from '../cart/data';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrinhoService } from 'src/app/services/carrinho/carrinho.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  products: any;
  productdetail: any;
  id!: string;
  descricao!: string;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.descricao = params['descricao'];

      this.produtoService.getProdutosPorCategoria(this.id).subscribe(
        (response) => {
          this.products = response
        },
        (error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse) {
            console.log("-- error: ", error);
          }
        }
      );
    });
  }

  // open modal
  openModal(content: any, i: any) {
    this.productdetail = this.products[i]
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  // add to cart product
  addtocart(i: any) {
    let product = this.products[i];
    product.qtd = 1;
    this.carrinhoService.adicionarProduto(product);
    // cartdata.push(this.products[i])
  }
  
  addcart(product:any){
    product.qtd = 1;
    this.carrinhoService.adicionarProduto(product);
    // cartdata.push(product);
  }

  // filter product
  selectcategory(category: any, event: any) {
    const iconItems = document.querySelectorAll('.filter-list');
    iconItems.forEach((item: any) => {
      var el = item.querySelectorAll('li')
      el.forEach((item: any) => {
        var element = item.querySelector('a').innerHTML
        if (element === category) {
          item.querySelector('a')?.classList.add("active");
        } else {
          item.querySelector('a').classList.remove("active");
        }
      })
    });
    this.products = products.filter((item: any) => {
      return item.category === category
    })
  }

}
