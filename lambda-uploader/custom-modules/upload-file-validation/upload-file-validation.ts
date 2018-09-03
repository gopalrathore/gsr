import { ValidateFileSize, ValidateFileType } from "./validations/validations";
import { ALLOWED_FILE_SIZE } from "../../config/config";

export class UploadFileValidation {

  private validateFileSize: ValidateFileSize = new ValidateFileSize();
  private validateFileType: ValidateFileType = new ValidateFileType();

  public validateFile(extention: string, fileSize: number): string | boolean {
    if (!this.validateFileType.validateFileType(extention))
      return "Invalid file type uploaded.";
    else if (!this.validateFileSize.validateFileSize(fileSize))
      return `File size more than ${ALLOWED_FILE_SIZE} MB.`;
    else
      return true;
  }

}