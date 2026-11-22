import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { APropos } from './components/a-propos/a-propos';
import { Erreur } from './components/erreur/erreur';
import { Catalogue } from './components/catalogue/catalogue';
import { ProduitDetail } from './components/produit-detail/produit-detail';
import { Connexion } from './components/connexion/connexion';
import { Admin } from './components/admin/admin';
import { GestionProduits } from './components/gestion-produits/gestion-produits';
import { ProduitForm } from './components/produit-form/produit-form';
import { Statistiques } from './components/statistiques/statistiques';
import { MotDePasse } from './components/mot-de-passe/mot-de-passe';

export const routes: Routes = [
  { path: 'accueil', title: 'GameZone - Accueil', component: Accueil },
  { path: 'catalogue', title: 'GameZone - Catalogue', component: Catalogue },
  { path: 'catalogue/:id', title: 'GameZone - Détail', component: ProduitDetail },
  { path: 'a-propos', title: 'GameZone - À propos', component: APropos },
  { path: 'connexion', title: 'GameZone - Connexion', component: Connexion },
  { path: 'admin', title: 'GameZone - Administration', component: Admin, children: [
    { path: '', redirectTo: 'produits', pathMatch: 'full' },
    { path: 'produits', component: GestionProduits },
    { path: 'ajouter', component: ProduitForm },
    { path: 'modifier/:id', component: ProduitForm },
    { path: 'statistiques', component: Statistiques },
    { path: 'mot-de-passe', component: MotDePasse }
  ] },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', title: 'GameZone - Page introuvable', component: Erreur }
];
