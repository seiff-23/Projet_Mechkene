import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prixDt' })
export class PrixDtPipe implements PipeTransform {
  transform(prix: string | null): string {
    return prix + ' DT';
  }
}
