import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'shuffle',
  pure: true,
})
export class ShufflePipe implements PipeTransform {
  transform(answers: string[]): string[] {
    return answers.sort(() => {
      return 0.5 - Math.random(); // shuffle order of the answers
    });
  }
}
