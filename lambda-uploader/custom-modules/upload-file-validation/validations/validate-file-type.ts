import { ALLOWED_FILE_TYPE } from "../../../config/config";

export class ValidateFileType {

  public validateFileType(fileType: string): boolean {
    let allowedFileType: string[] = ALLOWED_FILE_TYPE;
    return allowedFileType.indexOf(fileType) >= 0;
  }

}