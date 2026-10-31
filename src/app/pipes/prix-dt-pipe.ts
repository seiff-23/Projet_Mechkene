import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prixDt',
})
export class PrixDtPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
