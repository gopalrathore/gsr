import { Encryption } from "./encryption";

export class LocalStorage {

  public static setLocalStorage(key: string, value: object): void {
    let cyperValue: string = Encryption.encryptLocalStorage(value);
    localStorage.setItem(key, cyperValue);
  }

  public static getLocalStorage(key: string): any {
    let value:any;
    try {
      let cyperValue:string = localStorage.getItem(key)
      value = Encryption.decryptLocalStorage(cyperValue);
    }
    catch (Error) {
      value = null
    }
    return value;
  }

}