import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(value: string): unknown {
    const fileSize = +value; // cast to number
    if (fileSize < 1048576) {
      return (fileSize / 1024).toFixed(2) + 'KB';
    } else if (fileSize < 1073741824) {
      return (fileSize / 1048576).toFixed(2) + 'MB';
    } else {
      return (fileSize / 1073741824).toFixed(2) + 'GB';
    }
  }

}
