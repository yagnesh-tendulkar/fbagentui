import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(values: any, args?: any): any {
    values.sort((a: any, b: any) => {
      if ( a.timestamp < b.timestamp) {
       return 1
      } else if (a.timestamp > b.timestamp) {
      return -1
      } else {
      return 0
      }
    })
return values
  }

}
