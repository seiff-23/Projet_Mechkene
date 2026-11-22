import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-connexion',
  imports: [FormField, FormRoot],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class Connexion {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  erreur = signal('');
  enCours = signal(false);
  connexionModel = signal({ login: '', motDePasse: '' });
  connexionForm = form(this.connexionModel, path => {
    required(path.login, { message: 'Identifiant obligatoire' });
    required(path.motDePasse, { message: 'Mot de passe obligatoire' });
  });

  onConnexion() {
    if (this.connexionForm().invalid() || this.enCours()) { return; }
    this.enCours.set(true);
    this.erreur.set('');
    this.authService.connecter(this.connexionModel().login, this.connexionModel().motDePasse).subscribe(
      () => {
        this.enCours.set(false);
        if (this.authService.connecte()) {
          this.router.navigate(['/admin/produits']);
        } else {
          this.erreur.set('Identifiant ou mot de passe incorrect.');
        }
      },
      () => { this.enCours.set(false); this.erreur.set('Serveur indisponible.'); }
    );
  }
}
