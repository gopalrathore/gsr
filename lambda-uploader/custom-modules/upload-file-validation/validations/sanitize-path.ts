export class SanitizePath {

  private readonly branchingLimit:number = 4;
  private readonly allowedFolderLength:number = 10;
  private readonly commonFolder:string = "commons";

  private validateFileLocation(location: string): boolean {
    
    let subLocation:string[] = location.split('/');

    if(subLocation.length>this.branchingLimit){
      return false; 
    }else {
      for (let index:number = 0; index < subLocation.length; index++) {
        if(subLocation[index].length > this.allowedFolderLength || subLocation[index].length < 1) return false;        
      }
    }
    return true;
  }

  public sanitize(path: string): string {

    let isLocationValid:boolean = this.validateFileLocation(path);
    if(isLocationValid !== true) return this.commonFolder;

    let allowedPath: string[] | null = path.match(/[a-zA-Z0-9\-\.\_\/]/g);
    return allowedPath !== null ? allowedPath.join('') : this.commonFolder;
  }
}