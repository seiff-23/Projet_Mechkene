# GameZone

Mini-projet Angular de Seif Eddine Mechkene. Catalogue d'accessoires gaming avec espace visiteur et espace administrateur.

## Lancer le projet pour la validation

Installer Node.js, puis ouvrir deux terminaux dans le dossier Projet_Mechkene.

```powershell
npm install
```

Premier terminal :

```powershell
npm run api
```

Deuxième terminal :

```powershell
ng serve --port 4220
```

Application : http://localhost:4220. API : http://localhost:3010.

Le rendu local comporte un compte de démonstration, indiqué dans la fiche de lancement remise avec le projet. Aucun identifiant personnel n'est publié ici.

Pour une installation depuis GitHub, copier `src/database/gamezone.example.json` vers `src/database/gamezone.json`, puis renseigner votre compte dans la collection administrateurs :

```json
{ "id": "admin1", "login": "votre_identifiant", "motDePasse": "votre_mot_de_passe" }
```

Ne pas publier votre fichier local gamezone.json.

## Fonctionnalités

- Catalogue avec composant parent Catalogue et enfant ProduitItem.
- Recherche automatique par nom exact, sensible aux majuscules, et prix maximum ; critères séparés ou combinés.
- Détail avec route `/catalogue/:id` et affichage de tous les champs.
- Comparaison par cases à cocher de deux produits de même catégorie.
- Connexion administrateur, consultation, recherche, ajout, modification et suppression.
- Formulaire Signal Forms avec validation et caractéristiques ajoutées dynamiquement.
- Changement du mot de passe et déconnexion.
- Statistiques : effectif total, effectif par catégorie et prix moyen/minimum/maximum.

## Données et notions du cours

`src/database/gamezone.json` est l'unique fichier de données. Il contient les collections `produits` et `administrateurs`. JSON Server génère l'identifiant lors d'un ajout. Les photos fournies sont dans `public/images` ; le formulaire accepte aussi un chemin ou une URL de photo.

Le projet utilise les notions des TP : interfaces, signal/computed, input/output, services injectés, HttpClient et pipe/tap/subscribe, routes imbriquées et paramétrées, Signal Forms, pipes, bindings et Bootstrap. Le pipe personnalisé prixDt ajoute DT après le formatage par number.

## Limites de la démonstration pédagogique

La connexion est gérée par un signal en mémoire et se réinitialise après actualisation du navigateur. Il faut alors se reconnecter. JSON Server ne fournit pas une authentification sécurisée côté serveur : le compte est un compte de démonstration et ses valeurs sont stockées dans le JSON, comme les autres données du TP. Les identifiants réels ne doivent pas être utilisés.

## Déploiement Vercel

Framework : Angular. Commande de compilation : `npm run build`. Dossier de sortie : `dist/Projet_Mechkene/browser`. `vercel.json` redirige les accès directs vers index.html pour le routage Angular.

Choix de l'étudiant : Angular est publié sur Vercel, l'API reste locale pour la validation. Le fichier `src/environments/environment.ts` pointe donc vers `http://localhost:3010`. Le site hébergé ne constitue pas un service autonome pour les autres visiteurs : les données nécessitent que JSON Server soit lancé sur le PC qui le consulte, et que le navigateur autorise l'accès local. Il faut montrer la version locale pendant la validation. Une API hébergée peut être configurée plus tard en remplaçant apiUrl.

## Vérifications

Compilation Angular ; parcours navigateur du catalogue, recherche combinée, comparaison, détails, connexion acceptée/refusée, ajout/modification/suppression d'un produit temporaire et recalcul des statistiques. Les services HTTP et le changement persistant de mot de passe ont aussi été vérifiés avec une copie indépendante du fichier JSON, sans changer le compte de démonstration du projet.
