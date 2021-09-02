import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'de64',
})
export class code64Pipe implements PipeTransform {
  transform(str: string): string {
    return atob(str);
  }
}
