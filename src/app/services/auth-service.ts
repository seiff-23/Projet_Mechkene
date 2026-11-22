import { computed, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Administrateur } from '../models/administrateur';
import { environment } from '../../environments/environment';

const URL = environment.apiUrl + '/administrateurs';

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly _administrateur = signal<Administrateur | undefined>(undefined);
  administrateur = this._administrateur.asReadonly();
  connecte = computed(() => this._administrateur() !== undefined);

  connecter(login: string, motDePasse: string): Observable<Administrateur[]> {
    return this.http.get<Administrateur[]>(URL).pipe(
      tap(administrateurs => this._administrateur.set(
        administrateurs.find(a => a.login === login && a.motDePasse === motDePasse)
      ))
    );
  }

  deconnecter() {
    this._administrateur.set(undefined);
  }

  modifierMotDePasse(administrateur: Administrateur): Observable<Administrateur> {
    return this.http.put<Administrateur>(URL + '/' + administrateur.id, administrateur).pipe(
      tap(a => this._administrateur.set(a))
    );
  }
}
