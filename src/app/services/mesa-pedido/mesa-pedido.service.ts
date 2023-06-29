import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../environment/environment.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MesaPedidoService {

  httpOptions = { headers: new HttpHeaders() };

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService,
    private usuarioService: UsuarioService
  ) {}

  ocuparMesa(mesa: number): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.post(`${this.environment.apiPedidoUrl}/mesa/ocupar`, {mesaPedidoNumero: mesa} ,this.httpOptions);
  }

  desocuparMesa(): Observable<any> {
    var mesa = this.retornaMesaOcupada;
    this.adicionarTokenNaRequisicao();
    return this.http.post(`${this.environment.apiPedidoUrl}/mesa/desocupar`, {mesaPedidoNumero: mesa ?? 0} ,this.httpOptions);
  }

  definirMesaOcupada(mesa: number): void {
    localStorage.setItem('mesa_em_uso', mesa.toString());
  }

  definirMesaDesocupada(): void {
    localStorage.removeItem('mesa_em_uso');
  }

  get retornaMesaOcupada() {
    let mesa = localStorage.getItem('mesa_em_uso')?.toString() || null;
    if(!mesa) return null
    return Number(mesa);
  }

  private adicionarTokenNaRequisicao() {
    let token = this.usuarioService.obterToken;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization',  `Bearer ${token}`);
  }
}
