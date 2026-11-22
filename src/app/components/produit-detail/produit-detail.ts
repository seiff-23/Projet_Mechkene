import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ProduitService } from '../../services/produit-service';
import { ProduitGaming } from '../../models/produit-gaming';
import { PrixDtPipe } from '../../pipes/prix-dt-pipe';

@Component({
  selector: 'app-produit-detail',
  imports: [RouterLink, DatePipe, DecimalPipe, PrixDtPipe],
  templateUrl: './produit-detail.html',
  styleUrl: './produit-detail.css'
})
export class ProduitDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly produitService = inject(ProduitService);
  produit = signal<ProduitGaming>({
    id: '', nom: '', photo: '', prix: 0, sansFil: false, dateSortie: new Date(),
    categorie: '', marque: '', description: '', caracteristiques: []
  });
  chargement = signal(true);
  erreur = signal('');

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produitService.getProduitById(id).subscribe(
        produit => { this.produit.set(produit); this.chargement.set(false); },
        () => { this.erreur.set('Produit introuvable ou serveur indisponible.'); this.chargement.set(false); }
      );
    } else {
      this.erreur.set('Identifiant manquant.');
      this.chargement.set(false);
    }
  }
}
