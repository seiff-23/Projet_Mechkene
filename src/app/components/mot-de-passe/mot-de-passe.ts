import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-mot-de-passe',
  imports: [FormField, FormRoot],
  templateUrl: './mot-de-passe.html',
  styleUrl: './mot-de-passe.css'
})
export class MotDePasse {
  private readonly authService = inject(AuthService);
  message = signal('');
  erreur = signal('');
  enCours = signal(false);
  motDePasseModel = signal({ ancien: '', nouveau: '', confirmation: '' });
  motDePasseForm = form(this.motDePasseModel, path => {
    required(path.ancien, { message: 'Ancien mot de passe obligatoire' });
    required(path.nouveau, { message: 'Nouveau mot de passe obligatoire' });
    minLength(path.nouveau, 6, { message: 'Au moins 6 caractères' });
    required(path.confirmation, { message: 'Confirmation obligatoire' });
  });

  onModifier() {
    if (this.motDePasseForm().invalid() || this.enCours()) { return; }
    this.message.set('');
    this.erreur.set('');
    let administrateur = this.authService.administrateur();
    if (!administrateur) { this.erreur.set('Connecte-toi à nouveau.'); return; }
    if (this.motDePasseModel().ancien !== administrateur.motDePasse) {
      this.erreur.set('Ancien mot de passe incorrect.'); return;
    }
    if (this.motDePasseModel().nouveau !== this.motDePasseModel().confirmation) {
      this.erreur.set('La confirmation ne correspond pas.'); return;
    }
    this.enCours.set(true);
    this.authService.modifierMotDePasse({
      ...administrateur, motDePasse: this.motDePasseModel().nouveau
    }).subscribe(
      () => {
        this.enCours.set(false);
        this.message.set('Mot de passe modifié.');
        this.motDePasseModel.set({ ancien: '', nouveau: '', confirmation: '' });
        this.motDePasseForm().reset();
      },
      () => { this.enCours.set(false); this.erreur.set('Modification impossible.'); }
    );
  }
}
