import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProduitGaming } from '../../models/produit-gaming';
import { ProduitItem } from '../produit-item/produit-item';
import { Comparaison } from '../comparaison/comparaison';

import { ProduitService } from '../../services/produit-service';

@Component({
  imports: [ProduitItem, Comparaison],
  selector: 'app-catalogue',
  styleUrl: './catalogue.css',
  templateUrl: './catalogue.html',
})
export class Catalogue implements OnInit {
  private readonly produitService = inject(ProduitService);
  erreur = signal('');
  chargement = signal(true);
  nomRecherche = signal('');
  prixMaximum = signal('');
  selection = signal<ProduitGaming[]>([]);

  produits = this.produitService.produits;

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(
      () => this.chargement.set(false),
      () => {
        this.chargement.set(false);
        this.erreur.set("Impossible de charger les produits. Vérifie que le serveur JSON est lancé.");
      }
    );
  }

  produitsFiltres = computed(() => this.produits().filter(produit =>
    (this.nomRecherche() === '' || produit.nom === this.nomRecherche()) &&
    (this.prixMaximum() === '' || produit.prix <= +this.prixMaximum())
  ));

  onEffacer() {
    this.nomRecherche.set('');
    this.prixMaximum.set('');
  }

  estSelectionne(produit: ProduitGaming): boolean {
    return this.selection().filter(p => p.id === produit.id).length > 0;
  }

  estBloque(produit: ProduitGaming): boolean {
    if (this.estSelectionne(produit)) {
      return false;
    }
    if (this.produits().filter(p => p.categorie === produit.categorie).length < 2) {
      return true;
    }
    return this.selection().length === 2 ||
      (this.selection().length > 0 && this.selection()[0].categorie !== produit.categorie);
  }

  onComparer(produit: ProduitGaming) {
    if (this.estSelectionne(produit)) {
      this.onRetirer(produit.id);
    } else if (!this.estBloque(produit)) {
      this.selection.update(produits => [...produits, produit]);
    }
  }

  onRetirer(id: string) {
    this.selection.update(produits => produits.filter(p => p.id !== id));
  }

  onViderSelection() {
    this.selection.set([]);
  }
}
