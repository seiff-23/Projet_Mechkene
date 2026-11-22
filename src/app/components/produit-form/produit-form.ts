import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { form, FormField, FormRoot, required, min, minLength, applyEach } from '@angular/forms/signals';
import { ProduitGaming } from '../../models/produit-gaming';
import { ProduitService } from '../../services/produit-service';

@Component({
  selector: 'app-produit-form',
  imports: [FormField, FormRoot, RouterLink],
  templateUrl: './produit-form.html',
  styleUrl: './produit-form.css'
})
export class ProduitForm implements OnInit {
  private readonly produitService = inject(ProduitService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  modification = signal(false);
  chargement = signal(false);
  enCours = signal(false);
  erreur = signal('');
  categories = ['Souris', 'Claviers', 'Casques', 'Manettes'];
  produitModel = signal<ProduitGaming>({
    id: '', nom: '', photo: 'images/g203.png', prix: 0, sansFil: false,
    dateSortie: new Date(), categorie: 'Souris', marque: '', description: '',
    caracteristiques: [{ nom: '', valeur: '' }]
  });
  produitForm = form(this.produitModel, path => {
    required(path.nom, { message: 'Nom obligatoire' });
    minLength(path.nom, 2, { message: 'Le nom doit contenir au moins 2 caractères' });
    required(path.photo, { message: 'Photo obligatoire' });
    required(path.prix, { message: 'Prix obligatoire' });
    min(path.prix, 0.1, { message: 'Prix minimum : 0.1 DT' });
    required(path.dateSortie, { message: 'Date obligatoire' });
    required(path.categorie, { message: 'Catégorie obligatoire' });
    required(path.marque, { message: 'Marque obligatoire' });
    required(path.description, { message: 'Description obligatoire' });
    applyEach(path.caracteristiques, c => {
      required(c.nom, { message: 'Nom de caractéristique obligatoire' });
      required(c.valeur, { message: 'Valeur obligatoire' });
    });
  });

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modification.set(true);
      this.chargement.set(true);
      this.produitService.getProduitById(id).subscribe(
        produit => {
          this.produitModel.set({ ...produit, dateSortie: new Date(produit.dateSortie) });
          this.chargement.set(false);
        },
        () => { this.chargement.set(false); this.erreur.set('Produit introuvable.'); }
      );
    }
  }

  onAjouterCaracteristique() {
    this.produitModel.update(p => ({ ...p,
      caracteristiques: [...p.caracteristiques, { nom: '', valeur: '' }]
    }));
  }

  onSupprimerCaracteristique(indice: number) {
    this.produitModel.update(p => ({ ...p,
      caracteristiques: p.caracteristiques.filter((c, i) => i !== indice)
    }));
  }

  onEnregistrer() {
    if (this.produitForm().invalid() || this.enCours() || this.chargement()) { return; }
    if (this.modification() && this.produitModel().id === '') { return; }
    this.enCours.set(true);
    this.erreur.set('');
    let p = this.produitModel();
    if (this.modification()) {
      this.produitService.updateProduit(p).subscribe(
        () => { this.enCours.set(false); this.router.navigate(['/admin/produits']); },
        () => { this.enCours.set(false); this.erreur.set('Modification impossible.'); }
      );
    } else {
      this.produitService.addProduit({
        nom: p.nom, photo: p.photo, prix: p.prix, sansFil: p.sansFil,
        dateSortie: p.dateSortie, categorie: p.categorie, marque: p.marque,
        description: p.description, caracteristiques: p.caracteristiques
      }).subscribe(
        () => { this.enCours.set(false); this.router.navigate(['/admin/produits']); },
        () => { this.enCours.set(false); this.erreur.set('Ajout impossible.'); }
      );
    }
  }
}
