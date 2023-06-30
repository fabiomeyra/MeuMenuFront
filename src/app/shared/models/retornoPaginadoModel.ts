export class RetornoPaginadoModel {
    quantidadeTotalRegistros: number | undefined;
    lista: Array<any> = [];

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}