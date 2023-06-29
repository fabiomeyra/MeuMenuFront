import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private toastr: ToastrService) { }

  exibirMsgSucesso({msg, titulo}: ParametrosNotificacao | any = {}) {
    this.toastr.success(msg || 'Operação realizada com sucesso', titulo || 'Sucesso!');
    this.moverTelaParaTopo();
  }

  exibirMsgErro({msg, titulo, timeOut}: ParametrosNotificacao | any) {
    this.toastr.error(msg ||
      'Ocorreu um erro inesperado, por favor tente mais tarde ou entre em contato com o administrador do sistema',
      titulo || 'Ops!', { timeOut:  timeOut ? timeOut * 1000 : 0});
      this.moverTelaParaTopo();
  }

  mostrarMsgErro({errosApi, titulo, timeOut}: ParametrosErro | any) {
    this.toastr.error(this.formatarMensagemDeErro(errosApi.errors) ||
      'Ocorreu um erro inesperado, por favor tente mais tarde ou entre em contato com o administrador do sistema',
      titulo || 'Ops!', { timeOut:  timeOut ? timeOut * 1000 : 0});
      this.moverTelaParaTopo();
  }

  exibirMSgAlerta({msg, titulo, timeOut}: ParametrosNotificacao | any) {
    this.toastr.warning(msg || '', titulo || '', { timeOut:  timeOut ? timeOut * 1000 : 0});
    this.moverTelaParaTopo();
  }

  private formatarMensagemDeErro(erros: Array<string>): string {
    let retorno = '';

    for(let i = 0; i < (erros ?? []).length; i++){
      retorno += `${erros[i]}${(i === erros.length - 1 ? '' : ', <br/ >')}`
    }

    return retorno;
  }

  private moverTelaParaTopo() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}

class ParametrosNotificacao { 
  titulo: string | null | undefined;
  msg: string | null | undefined;
  timeOut: number | undefined
}

class ParametrosErro {
  errosApi: ErrosApi | null | undefined;
  titulo: string | null | undefined;
  timeOut: number | undefined
}

class ErrosApi {
  errors: Array<string> = [];
}