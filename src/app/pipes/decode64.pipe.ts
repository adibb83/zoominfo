import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'decode64',
  pure: true
})
export class decode64Pipe implements PipeTransform {
  transform(str: string): string {
    return btoa(str);
  }
}
