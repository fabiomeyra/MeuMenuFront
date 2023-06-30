export class FiltroPesquisaUsuarioModel {
    usuarioId: string | undefined;
    usuarioNome: string | undefined;
    usuarioLogin: string | undefined;
    perfilId: number | undefined;
    paginaAtual: number = 0;
    quantidadePorPagina: number | undefined;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}