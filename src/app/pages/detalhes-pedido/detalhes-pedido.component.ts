import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho/carrinho.service';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.scss'],
})
export class DetalhesPedidoComponent {
  produtosPedido: any;
  totalprice: any = 0;
  pedidoStatus = '';
  isLoading = false;
  pedidoId: any = '';
  detalhesPedido: any = '';
  perfilUsuarioLogado: any = '';

  constructor(
    public carrinhoService: CarrinhoService,
    public pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.perfilUsuarioLogado = this.usuarioService.retornaPermissaoUsuario;

    this.route.params.subscribe((params) => {
      const dadosSerializados = params['pedidoId'];
      if (dadosSerializados) {
        const dadosDeserializados = decodeURIComponent(dadosSerializados);
        this.pedidoId = dadosDeserializados;
      }
    });

    this.pedidoService.getPedidoPorId(this.pedidoId).subscribe(
      (response) => {
        this.detalhesPedido = response.data;
        this.produtosPedido = response.data.produtosDoPedido;
        this.pedidoStatus = response.data.situacaoPedidoDrescricao;
        this.totalprice = response.data.valorTotal;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
      }
    );
  }

  setprice(price: any) {
    return price.toFixed(2);
  }

  obterMensagemAtualizacao() {
    switch (this.detalhesPedido.situacaoPedidoId) {
      case 1:
        return 'Iniciar Preparo';

      case 2:
        return 'Liberar Para Entrega';

        case 3:
        return 'Produto Entregue';

        case 5:
        return 'Pedido Pago';

      default:
        return "Cancelar";
    }
  }

  atualizarSituacao() {
    this.isLoading = true;

    const pedido = {
      pedidoId: this.detalhesPedido.pedidoId,
      situacaoId: parseInt(this.detalhesPedido.situacaoPedidoId) + 1,
    };

    this.pedidoService.alterarSituacaoPedido(pedido).subscribe(
      () => {
        this.notificacaoService.exibirMsgSucesso();
        this.router.navigate(['/acompanhar-pedidos'])
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse)
          this.notificacaoService.mostrarMsgErro({ errosApi: error?.error });
      }
    );
  }
}
