import { Component } from '@angular/core';
import { Catalogue } from '../catalogue/catalogue';

@Component({
  imports: [Catalogue],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
})
export class Accueil {
}
