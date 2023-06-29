import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import * as cryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CriptografiaService {

  constructor(private environment: EnvironmentService) {}

  criptografar(valor: string): string {
    let key = cryptoJS.enc.Utf8.parse(this.environment.criptogafiaKey);
    let iv = cryptoJS.enc.Utf8.parse(this.environment.criptogafiaKey);

    var loginCriptografado = cryptoJS.AES.encrypt(cryptoJS.enc.Utf8.parse(valor), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: cryptoJS.mode.CBC,
      padding: cryptoJS.pad.Pkcs7,
    });

    return cryptoJS.enc.Base64.stringify(loginCriptografado.ciphertext)
  }
}
