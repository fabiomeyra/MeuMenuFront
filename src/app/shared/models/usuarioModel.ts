export class UsuarioModel {
    usuarioId: string | undefined;
    usuarioNome: string | undefined;
    permissao: string | undefined;
    perfilDescricao: string | undefined;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}