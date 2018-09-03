import { ALLOWED_FILE_SIZE } from "../../../config/config";

export class ValidateFileSize {

  public validateFileSize(fileSize: number): boolean {
    let allowedSize: number = ALLOWED_FILE_SIZE * Math.pow(1024, 2);

    return fileSize < allowedSize;
  }

}