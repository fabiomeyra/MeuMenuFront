import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  production: boolean = environment.production;
  apiProdutoUrl: string = environment.apiProdutoUrl;
  apiUsuarioUrl: string = environment.apiUsuarioUrl;
  apiPedidoUrl : string = environment.apiPedidoUrl;
}
