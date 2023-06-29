export class RealizarLoginModel {
    login: string | undefined;
    senha: string | undefined;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}