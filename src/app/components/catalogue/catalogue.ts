import { Component, computed, signal } from '@angular/core';
import { ProduitGaming } from '../../models/produit-gaming';
import { ProduitItem } from '../produit-item/produit-item';

@Component({
  imports: [ProduitItem],
  selector: 'app-catalogue',
  styleUrl: './catalogue.css',
  templateUrl: './catalogue.html',
})
export class Catalogue {
  nomRecherche = signal('');
  prixMaximum = signal('');

  produits = signal<ProduitGaming[]>([
    {
      id: 'GZ001', nom: 'Logitech G203 LIGHTSYNC', photo: 'images/g203.png',
      prix: 89.9, sansFil: false, dateSortie: new Date(2020, 3, 21),
      categorie: 'Souris', marque: 'Logitech G',
      description: 'Souris filaire avec éclairage RGB LIGHTSYNC et six boutons.',
      caracteristiques: [
        { nom: 'Connexion', valeur: 'USB' },
        { nom: 'Boutons', valeur: '6' },
        { nom: 'Éclairage', valeur: 'RGB LIGHTSYNC' },
      ],
    },
    {
      id: 'GZ002', nom: 'Logitech G305 LIGHTSPEED', photo: 'images/g305.png',
      prix: 159.9, sansFil: true, dateSortie: new Date(2018, 4, 15),
      categorie: 'Souris', marque: 'Logitech G',
      description: 'Souris sans fil LIGHTSPEED équipée du capteur HERO.',
      caracteristiques: [
        { nom: 'Connexion', valeur: 'LIGHTSPEED avec récepteur USB' },
        { nom: 'Boutons', valeur: '6' },
        { nom: 'Capteur', valeur: 'HERO' },
      ],
    },
    {
      id: 'GZ003', nom: 'Logitech G413 SE', photo: 'images/g413.png',
      prix: 279.9, sansFil: false, dateSortie: new Date(2022, 0, 25),
      categorie: 'Claviers', marque: 'Logitech G',
      description: 'Clavier mécanique avec switches tactiles et éclairage blanc.',
      caracteristiques: [
        { nom: 'Connexion', valeur: 'USB' },
        { nom: 'Switches', valeur: 'Mécaniques tactiles' },
        { nom: 'Éclairage', valeur: 'LED blanc' },
      ],
    },
    {
      id: 'GZ004', nom: 'Logitech G435 LIGHTSPEED', photo: 'images/g435.png',
      prix: 229.9, sansFil: true, dateSortie: new Date(2021, 8, 14),
      categorie: 'Casques', marque: 'Logitech G',
      description: 'Casque gaming sans fil avec connexions LIGHTSPEED et Bluetooth.',
      caracteristiques: [
        { nom: 'Connexion', valeur: 'LIGHTSPEED et Bluetooth' },
        { nom: 'Microphone', valeur: 'Deux microphones intégrés' },
      ],
    },
    {
      id: 'GZ005', nom: 'Logitech F310', photo: 'images/f310.png',
      prix: 109.9, sansFil: false, dateSortie: new Date(2010, 8, 3),
      categorie: 'Manettes', marque: 'Logitech',
      description: 'Manette filaire pour PC avec deux sticks analogiques.',
      caracteristiques: [
        { nom: 'Connexion', valeur: 'USB' },
        { nom: 'Modes', valeur: 'XInput et DirectInput' },
      ],
    },
    {
      id: 'GZ006', nom: 'Logitech F710', photo: 'images/f710.png',
      prix: 179.9, sansFil: true, dateSortie: new Date(2010, 8, 3),
      categorie: 'Manettes', marque: 'Logitech',
      description: 'Manette sans fil pour PC avec retour de vibrations.',
      caracteristiques: [
        { nom: 'Connexion', valeur: '2,4 GHz avec récepteur USB' },
        { nom: 'Vibrations', valeur: 'Deux moteurs' },
      ],
    },
  ]);

  produitsFiltres = computed(() => this.produits().filter(produit =>
    (this.nomRecherche() === '' || produit.nom === this.nomRecherche()) &&
    (this.prixMaximum() === '' || produit.prix <= +this.prixMaximum())
  ));

  onEffacer() {
    this.nomRecherche.set('');
    this.prixMaximum.set('');
  }
}
