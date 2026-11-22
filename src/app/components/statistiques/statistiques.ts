import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProduitService } from '../../services/produit-service';
import { PrixDtPipe } from '../../pipes/prix-dt-pipe';

@Component({
  selector: 'app-statistiques',
  imports: [DecimalPipe, PrixDtPipe],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.css'
})
export class Statistiques implements OnInit {
  private readonly produitService = inject(ProduitService);
  produits = this.produitService.produits;
  erreur = signal('');
  categories = ['Souris', 'Claviers', 'Casques', 'Manettes'];
  nombreTotal = computed(() => this.produits().length);
  prixMoyen = computed(() => {
    let total = 0;
    for (let produit of this.produits()) { total += produit.prix; }
    return this.nombreTotal() === 0 ? 0 : total / this.nombreTotal();
  });
  prixMinimum = computed(() => {
    if (this.produits().length === 0) { return 0; }
    let minimum = this.produits()[0].prix;
    for (let produit of this.produits()) {
      if (produit.prix < minimum) { minimum = produit.prix; }
    }
    return minimum;
  });
  prixMaximum = computed(() => {
    let maximum = 0;
    for (let produit of this.produits()) {
      if (produit.prix > maximum) { maximum = produit.prix; }
    }
    return maximum;
  });

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(
      () => {}, () => this.erreur.set('Impossible de charger les statistiques.')
    );
  }

  nombreParCategorie(categorie: string): number {
    return this.produits().filter(p => p.categorie === categorie).length;
  }
}
