import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { Observable } from 'rxjs';
import { RealizarLoginModel } from 'src/app/shared/models/realizarLoginModel';
import { UsuarioModel } from 'src/app/shared/models/usuarioModel';
import { UsuarioAccessTokenModel } from 'src/app/shared/models/usuarioAccesTokenModel';
import { FiltroPesquisaUsuarioModel } from 'src/app/shared/models/filtroPesquisaUsuarioModel';
import { query } from '@angular/animations';
import { SalvarUsuarioModel } from 'src/app/shared/models/salvarUsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {}

  buscarPerfis(): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.get(`${this.environment.apiUsuarioUrl}/usuario/perfis-para-selecao`, this.httpOptions);
  }

  pesquisar(filtro: FiltroPesquisaUsuarioModel): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.get(this.montaQueryString(`${this.environment.apiUsuarioUrl}/usuario/pesquisar`, filtro), this.httpOptions);
  }

  buscar(id: string): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.get(`${this.environment.apiUsuarioUrl}/usuario/${id}`, this.httpOptions);
  }

  buscarTodos(): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.get(`${this.environment.apiUsuarioUrl}/usuario`, this.httpOptions);
  }

  cadastrar(usuario: SalvarUsuarioModel): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.post(`${this.environment.apiUsuarioUrl}/usuario/`, usuario, this.httpOptions);
  }

  atualizar(usuario: SalvarUsuarioModel): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.put(`${this.environment.apiUsuarioUrl}/usuario/`, usuario, this.httpOptions);
  }

  excluir(id: string): Observable<any> {
    this.adicionarTokenNaRequisicao();
    return this.http.delete(`${this.environment.apiUsuarioUrl}/usuario/${id}`, this.httpOptions);
  }

  realizarLogin(model: RealizarLoginModel): Observable<any> {
    return new Observable(subscriber => {
      return this.http.post(`${this.environment.apiUsuarioUrl}/login`, model, this.httpOptions)
        .subscribe((res: any) => {
          this.salvarUsuario(res.data as UsuarioAccessTokenModel)
          this.salvarToken(res.data as UsuarioAccessTokenModel)
          subscriber.next(res);
          subscriber.complete();
        }, err => subscriber.error(err));
    })    
  }

  salvarUsuario(usuario: UsuarioAccessTokenModel): void {
    if(!usuario?.user) return;
    localStorage.setItem('usuario_meu_menu', JSON.stringify(usuario.user));
  }

  salvarToken(usuario: UsuarioAccessTokenModel): void {
    if(!usuario?.accessToken) return;
    localStorage.setItem('token_meu_menu', usuario.accessToken);
  }

  definirUsuarioTipoPedido(): void {
    var usuario = this.getUsuario;
    if(!usuario) return;
    usuario.ehUsuarioTipoPedido = true;
    var usuarioToken = new UsuarioAccessTokenModel();
    usuarioToken.user = usuario;
    this.salvarUsuario(usuarioToken);
  }

  get ehUsuarioTipoPedido(): boolean {
    var usuario = this.getUsuario;
    return usuario?.ehUsuarioTipoPedido ?? false;
  }

  get obterToken(): string | null | undefined {
    let token = localStorage.getItem('token_meu_menu')?.toString();
    return token;
  }

  get usuarioEstaLogado() {
    let token = localStorage.getItem('token_meu_menu')?.toString();
    let usuario = this.getUsuario;
    return token && usuario;
  }

  get getUsuario(): UsuarioModel | null {
    let usuario = localStorage.getItem('usuario_meu_menu')?.toString() || null;
    if(!usuario) return null;
    return JSON.parse(usuario);
  }

  realizarLogOut() {
    localStorage.removeItem('usuario_meu_menu');
    localStorage.removeItem('token_meu_menu');
  }

  get retornaPermissaoUsuario(): string | null | undefined {
    var usuario = this.getUsuario;
    return usuario?.permissao;
  }

  private adicionarTokenNaRequisicao() {
    let token = this.obterToken;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization',  `Bearer ${token}`);
  }

  private montaQueryString(url: string, params: object): string{
    if(!params) return url;
    let keys: Array<string> = Object.keys(params);
    if(!keys || !keys.length) return url;

    let inseriuPrimeiroParametro = false;

    for(let i = 0; i < keys.length; i++){
      let simbolo = !inseriuPrimeiroParametro ? '?' : '&';
      var valor = params[keys[i] as keyof typeof params]
      if(valor) {
        url += `${simbolo}${keys[i]}=${valor}`;
        inseriuPrimeiroParametro = true;
      }
    }

    return url;
  }
}
