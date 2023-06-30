export class SalvarUsuarioModel {
    usuarioId: string | undefined;
    usuarioNome: string | undefined;
    usuarioLogin: string | undefined;
    perfilId: number | undefined;
    usuarioSenha: string | undefined;
    usuarioSenhaConfirmacao: string | undefined;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}