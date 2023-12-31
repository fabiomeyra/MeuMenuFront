export class UsuarioModel {
    usuarioId: string | undefined;
    usuarioNome: string | undefined;
    usuarioLogin: string | undefined;
    perfilId: number | undefined;
    dataCadastro: Date | undefined;
    dataAlteracao: Date | undefined;
    permissao: string | undefined;
    perfilDescricao: string | undefined;
    ehUsuarioTipoPedido: boolean = false;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}