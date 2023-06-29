export class UsuarioModel {
    usuarioId: string | undefined;
    usuarioNome: string | undefined;
    permissao: string | undefined;
    perfilDescricao: string | undefined;
    ehUsuarioTipoPedido: boolean = false;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}