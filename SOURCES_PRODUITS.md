# Sources du catalogue GameZone

Les prix en DT sont des exemples choisis pour le mini-projet. Ils ne représentent pas des prix de vente constatés. Les dates du jeu d'essai servent de repères d'annonce des modèles ; elles ne désignent pas leur disponibilité en Tunisie.

Les photos proviennent des pages officielles Logitech et sont stockées dans public/images. Les noms de marques et les visuels appartiennent à leurs propriétaires. Aucune licence de réutilisation générale n'est supposée ici ; vérifier les conditions applicables avant toute publication publique.

## Pages produits

- G203 LIGHTSYNC : https://www.logitechg.com/en-us/shop/p/g203-lightsync-rgb-gaming-mouse
- G305 LIGHTSPEED : https://www.logitechg.com/en-us/shop/p/g305-lightspeed-wireless-gaming-mouse
- G413 SE : https://www.logitechg.com/en-us/shop/p/g413-se-gaming-keyboard
- G435 LIGHTSPEED : https://www.logitechg.com/en-us/shop/p/g435-wireless-bluetooth-gaming-headset
- F310 : https://www.logitechg.com/en-us/shop/p/f310-gamepad
- F710 : https://www.logitechg.com/en-us/shop/p/f710-wireless-gamepad

## Repères d'annonce

- G203 : https://news.logitech.com/press-releases/news-details/2020/New-Logitech-G203-LIGHTSYNC-Gaming-Mouse-Delivers-Gaming-Grade-Performance-at-an-Affordable-Price/default.aspx
- G305 : https://ir.logitech.com/news/news-details/2018/Logitech-G-Unleashes-New-Wireless-Gaming-Mouse/default.aspx
- G413 SE : https://news.logitech.com/press-releases/news-details/2022/New-Year-New-Gear---Logitech-G-Introduces-G413-SE-Mechanical-Gaming-Keyboard-in-Full-Size-and-TKL-Versions/default.aspx
- G435 : https://www.logitech.com/blog/2021/09/14/logitech-g435-wireless-gaming-headset-our-most-sustainable-gaming-headset-yet/
- F310 et F710 : https://itechnews.net/2010/09/05/logitech-f310-f510-and-f710-pc-gamepads/

## Notions utilisées à cette étape

- Interfaces TypeScript ProduitGaming et Caracteristique : cours signals et TP4/TP5.
- signal et lecture avec parenthèses : cours signals et TP4.
- Composant Catalogue parent et ProduitItem enfant avec input.required : cours communication et TP5.
- @for, @empty, @if et binding de classe : cours contrôle de flux et TP3.
- DecimalPipe pour afficher les prix avec trois chiffres après la virgule : cours pipes et TP3/TP5.
- RouterLink et route statique catalogue : cours routage et TP6.
- Cartes, colonnes, badges et CSS simple : cours Bootstrap et TP2/TP5.

La recherche instantanée utilise deux signals, computed et filter : nom exact (égalité, sensible aux majuscules) et prix maximum facultatif. Le champ prix reste un texte lu via .value ; l'opérateur + convertit cette valeur en nombre pour la comparaison. Les champs sont liés avec [value] et (input), sans nouvelle API de formulaire. Les méthodes includes et toLowerCase ne sont pas utilisées, conformément au choix de l'étudiant.

La comparaison utilise une case à cocher par carte, input.required pour l'état coché et désactivé, output pour transmettre les choix au parent et un signal pour la sélection. Elle accepte deux produits au maximum dans une même catégorie. Les catégories qui n'ont qu'un produit ne sont pas comparables. Le tableau Comparaison reçoit la sélection par input et émet l'identifiant à retirer avec output. Les filtres ne suppriment pas la sélection. Aucune méthode includes ou toLowerCase n'est utilisée.

Finalisation du 22 novembre : détails et routes paramétrées (TP7), ProduitService et AuthService avec HttpClient, Observable et pipe/tap (TP8), formulaires validés et caractéristiques dynamiques avec Signal Forms (TP9), statistiques avec computed et pipe personnalisé prixDt. Le fichier de données local est gamezone.json ; seule sa copie d’exemple sans compte est publiée sur GitHub. Angular est prévu sur Vercel et l’API reste locale, selon le choix de l’étudiant.

