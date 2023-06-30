import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public pedido: any = {};
  httpOptions = { headers: new HttpHeaders() };

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private environment: EnvironmentService,
  ) {
    this.recuperarPedido();
  }

  limparPedido() {
    this.pedido = {};
    this.salvarPedido();
  }

  salvarPedido() {
    localStorage.setItem('pedido', JSON.stringify(this.pedido));
  }

  cadastrarPedido(pedido: any): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.post(`${this.environment.apiPedidoUrl}/pedido`, pedido, this.httpOptions);
  }

  alterarSituacaoPedido(pedido: any): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.patch(`${this.environment.apiPedidoUrl}/pedido/alterar-situacao`, pedido, this.httpOptions);
  }

  private recuperarPedido() {
    const pedido = localStorage.getItem('pedido');
    if (pedido) {
      this.pedido = JSON.parse(pedido);
    }

    return this.pedido;
  }

  private adicionarTokenNaRequisicao() {
    let token = this.usuarioService.obterToken;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization',  `Bearer ${token}`);
  }
}
