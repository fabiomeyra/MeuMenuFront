import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {}

  getCategorias(): Observable<any> {
    return this.http.get(`${this.environment.apiProdutoUrl}/categoria/obter-todos`);
  }

  getProdutos(): Observable<any> {
    return this.http.get(`${this.environment.apiProdutoUrl}/produto/obter-todos`);
  }

  getProdutosPorCategoria(id: any): Observable<any> {
    return this.http.get(`${this.environment.apiProdutoUrl}/produto/obter-por-categoria/${id}`);
  }

  getProdutoPorId(id: any): Observable<any> {
    return this.http.get(`${this.environment.apiProdutoUrl}/produto/${id}`);
  }

  cadastrarProduto(produto: any): Observable<any> {
    return this.http.post(`${this.environment.apiProdutoUrl}/produto`, produto);
  }

  deletarProduto(produtoId: any): Observable<any> {
    return this.http.delete(`${this.environment.apiProdutoUrl}/produto/${produtoId}`);
  }

  alterarProduto(produto: any, produtoId: any): Observable<any> {
    return this.http.put(`${this.environment.apiProdutoUrl}/produto/${produtoId}`, produto);
  }
}
