import { Caracteristique } from './caracteristique';

export interface ProduitGaming {
  id: string;
  nom: string;
  photo: string;
  prix: number;
  sansFil: boolean;
  dateSortie: Date;
  categorie: string;
  marque: string;
  description: string;
  caracteristiques: Caracteristique[];
}
