export class PerfilUsuarioModel {
    perfilId: number | undefined;
    perfilDescricao: string | undefined;
    perfilRole: string | undefined;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}