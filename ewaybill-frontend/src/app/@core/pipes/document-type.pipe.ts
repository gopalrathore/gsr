import { Pipe, PipeTransform } from '@angular/core';
import { Documents } from '../dataset/dataset';
import { DocumentType } from '../dataset/document-type/documents';


@Pipe({
  name: 'documentType'
})
export class DocumentTypePipe implements PipeTransform {

  private document: Documents = new Documents();

  private data: DocumentType = this.document.getDocumentType();

  transform(type: string): string {
    try {
      type = type.toUpperCase();
      return this.data[type].toString();
    }
    catch (Error) {
      return "";
    }
  }

}
