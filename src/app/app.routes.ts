import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { APropos } from './components/a-propos/a-propos';
import { Erreur } from './components/erreur/erreur';
import { Catalogue } from './components/catalogue/catalogue';

export const routes: Routes = [
  { path: 'accueil', title: 'GameZone - Accueil', component: Accueil },
  { path: 'catalogue', title: 'GameZone - Catalogue', component: Catalogue },
  { path: 'a-propos', title: 'GameZone - À propos', component: APropos },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', title: 'GameZone - Page introuvable', component: Erreur },
];
