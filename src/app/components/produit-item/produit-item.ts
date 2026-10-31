import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProduitGaming } from '../../models/produit-gaming';

@Component({
  imports: [DecimalPipe],
  selector: 'app-produit-item',
  styleUrl: './produit-item.css',
  templateUrl: './produit-item.html',
})
export class ProduitItem {
  produit = input.required<ProduitGaming>();
}
