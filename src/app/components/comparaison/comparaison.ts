import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProduitGaming } from '../../models/produit-gaming';

@Component({
  imports: [DecimalPipe],
  selector: 'app-comparaison',
  styleUrl: './comparaison.css',
  templateUrl: './comparaison.html',
})
export class Comparaison {
  produits = input.required<ProduitGaming[]>();
  retirer = output<string>();

  onRetirer(id: string) {
    this.retirer.emit(id);
  }
}
