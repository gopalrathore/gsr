import moment from "moment";
import sha1 from "sha1";

export class FileNameMaker {

  public getFileName(extention: string, fileSize: number = 0): string {
    let hash: string = this.getHash(fileSize);
    let now: string = moment()
      .format("YYYYMMDDHHmmss")
      .toString();

    return `${now}-${hash}.${extention}`;
  }

  private getHash(fileSize: number = 0): string {
    let hash: string = sha1(new Buffer(new Date().toString()))
      .toString()
      .trim()
      .slice(4, 14);

    let filesizeString: string = fileSize.toString();

    return `${hash}${filesizeString}`;

  }

}