import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PermissaoService } from 'src/app/services/permissaoService/permissao.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router, 
        private permissaoService: PermissaoService, 
        private usuarioService: UsuarioService
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        
        if (!this.permissaoService.usuarioTemPermissao(route.routeConfig?.path, this.usuarioService.retornaPermissaoUsuario)) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}

export default AuthGuard;