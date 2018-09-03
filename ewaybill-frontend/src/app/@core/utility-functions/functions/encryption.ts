import * as CryptoJS from 'crypto-js';


export class Encryption {

  private static key: string = "## PRISON BREAK 2017 ##";
  // private iv =  CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");

  public static encryptLocalStorage(data: object): string {
    let ciphertext: object = CryptoJS.AES.encrypt(JSON.stringify(data), this.key);
    return ciphertext.toString();
  }

  public static decryptLocalStorage(data: string): object {
    let bytes: any = CryptoJS.AES.decrypt(data.toString(), this.key);
    let decryptedData: object = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

}