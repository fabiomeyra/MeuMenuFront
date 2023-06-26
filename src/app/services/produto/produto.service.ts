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
}
