import { UsuarioModel } from "./usuarioModel";

export class UsuarioAccessTokenModel {
    accessToken: string | undefined;
    user: UsuarioModel | undefined;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}