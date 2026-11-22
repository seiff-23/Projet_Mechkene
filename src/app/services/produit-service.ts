import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ProduitGaming } from '../models/produit-gaming';
import { environment } from '../../environments/environment';

const URL = environment.apiUrl + '/produits';

@Service()
export class ProduitService {
  private readonly http = inject(HttpClient);
  private readonly _produits = signal<ProduitGaming[]>([]);
  produits = this._produits.asReadonly();

  getProduits(): Observable<ProduitGaming[]> {
    return this.http.get<ProduitGaming[]>(URL).pipe(
      tap(produits => this._produits.set(produits))
    );
  }

  getProduitById(id: string): Observable<ProduitGaming> {
    return this.http.get<ProduitGaming>(URL + '/' + id);
  }

  addProduit(produit: Omit<ProduitGaming, 'id'>): Observable<ProduitGaming> {
    return this.http.post<ProduitGaming>(URL, produit).pipe(
      tap(nouveau => this._produits.update(produits => [...produits, nouveau]))
    );
  }

  updateProduit(produit: ProduitGaming): Observable<ProduitGaming> {
    return this.http.put<ProduitGaming>(URL + '/' + produit.id, produit).pipe(
      tap(modifie => this._produits.update(produits =>
        produits.map(p => p.id === modifie.id ? modifie : p)
      ))
    );
  }

  deleteProduit(id: string): Observable<void> {
    return this.http.delete<void>(URL + '/' + id).pipe(
      tap(() => this._produits.update(produits => produits.filter(p => p.id !== id)))
    );
  }
}
