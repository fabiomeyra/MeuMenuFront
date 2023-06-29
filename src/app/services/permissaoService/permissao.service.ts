import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  permissoes = {
    produtos: ['ADMIN']
  }

  constructor() {}

  usuarioTemPermissao(rota: string | undefined, permissaoUsuario: string | undefined | null) {
    if(rota === null || rota === undefined) return false;
    var permissoes = this.permissoes[rota as keyof typeof this.permissoes];
    return !(permissoes ?? []).length  ||
      permissoes.some(x => x === permissaoUsuario);
  }
}
