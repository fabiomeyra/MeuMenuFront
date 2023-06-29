import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../environment/environment.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  httpOptions = { headers: new HttpHeaders() };

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService,
    private usuarioService: UsuarioService
  ) {}

  getCategorias(): Observable<any> {
    return this.http.get(`${this.environment.apiProdutoUrl}/categoria/obter-todos`, this.httpOptions);
  }

  getProdutos(): Observable<any> {
    return this.http.get(`${this.environment.apiProdutoUrl}/produto/obter-todos`, this.httpOptions);
  }

  getProdutosPorCategoria(id: any): Observable<any> {
    return this.http.get(`${this.environment.apiProdutoUrl}/produto/obter-por-categoria/${id}`, this.httpOptions);
  }

  getProdutoPorId(id: any): Observable<any> {
    return this.http.get(`${this.environment.apiProdutoUrl}/produto/${id}`, this.httpOptions);
  }

  cadastrarProduto(produto: any): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.post(`${this.environment.apiProdutoUrl}/produto`, produto, this.httpOptions);
  }

  deletarProduto(produtoId: any): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.delete(`${this.environment.apiProdutoUrl}/produto/${produtoId}`, this.httpOptions);
  }

  alterarProduto(produto: any, produtoId: any): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.put(`${this.environment.apiProdutoUrl}/produto/${produtoId}`, produto, this.httpOptions);
  }

  private adicionarTokenNaRequisicao() {
    let token = this.usuarioService.obterToken;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization',  `Bearer ${token}`);
  }
}
