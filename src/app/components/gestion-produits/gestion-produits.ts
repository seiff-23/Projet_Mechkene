import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProduitService } from '../../services/produit-service';
import { PrixDtPipe } from '../../pipes/prix-dt-pipe';

@Component({
  selector: 'app-gestion-produits',
  imports: [RouterLink, DecimalPipe, PrixDtPipe],
  templateUrl: './gestion-produits.html',
  styleUrl: './gestion-produits.css'
})
export class GestionProduits implements OnInit {
  private readonly produitService = inject(ProduitService);
  produits = this.produitService.produits;
  nomRecherche = signal('');
  aSupprimer = signal('');
  enCours = signal(false);
  erreur = signal('');
  produitsFiltres = computed(() => this.produits().filter(p =>
    this.nomRecherche() === '' || p.nom === this.nomRecherche()
  ));

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(
      () => {}, () => this.erreur.set('Impossible de charger les produits.')
    );
  }

  onSupprimer(id: string) {
    if (this.enCours()) { return; }
    this.enCours.set(true);
    this.erreur.set('');
    this.produitService.deleteProduit(id).subscribe(
      () => { this.enCours.set(false); this.aSupprimer.set(''); },
      () => { this.enCours.set(false); this.erreur.set('Suppression impossible.'); }
    );
  }
}
