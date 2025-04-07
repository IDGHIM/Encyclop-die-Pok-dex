# Projet d’intégration : Création d’une Encyclopédie Pokémon

## Objectif :
Créer une interface web nommée Encyclopédie Pokémon en utilisant uniquement HTML et CSS. L’objectif est de construire un design propre, responsive, et structuré. À la fin, vous ajouterez une première touche d’interactivité en JavaScript.

Consignes :
1. Structure de base en HTML
Créez une page HTML avec la structure suivante :
* Une <header> contenant un titre principal (par exemple : "Encyclopédie Pokémon").
* Une <main> qui contiendra les fiches de Pokémon.
* Un <footer> (optionnel).
Dans le <main>, ajoutez manuellement 3 à 6 fiches de Pokémon. Chaque fiche doit contenir :
* Le nom du Pokémon.
* Une image.
* Son type.
* Son numéro (exemple : #001, #025...).
2. Mise en forme des fiches (CSS)
* Utilisez un fichier CSS séparé.
* Les fiches doivent être stylisées avec :
    * Un fond clair.
    * Une bordure fine.
    * Des coins arrondis.
    * Une légère ombre portée.
    * Un affichage en grille pour placer les fiches côte à côte.
3. Mise en couleur selon le type de Pokémon
* Appliquez une couleur de fond différente selon le type de Pokémon (exemples : feu = rouge/orange, eau = bleu, plante = vert...).
* Pour cela, ajoutez une classe liée au type dans votre HTML, puis appliquez les couleurs en CSS.
4. Responsive design
* Adaptez l’affichage pour tous les formats d’écran :
    * Sur écran large : les fiches doivent s’afficher en grille (3 à 4 par ligne).
    * Sur écran mobile : les fiches doivent s’afficher en colonne (1 ou 2 par ligne).
* Utilisez les media queries en CSS.
5. Animation au survol
* Ajoutez un effet visuel lorsqu’on survole une fiche :
    * Par exemple : agrandissement léger, modification de la bordure, changement de l’ombre, etc.

Bonus : interactivité en JavaScript (facultatif)
Ajoutez un champ de recherche simple qui permet de filtrer les fiches Pokémon en temps réel.
1. Dans le HTML :
    * Ajoutez un champ <input type="text"> avec un attribut placeholder="Rechercher un Pokémon..." au-dessus de vos fiches.
2. En JavaScript :
    * Lorsqu’un utilisateur tape dans ce champ, faites en sorte que seules les fiches contenant ce nom restent visibles.
    * Vous pouvez utiliser les méthodes suivantes :
        * document.querySelectorAll pour sélectionner toutes les fiches.
        * addEventListener('input', ...) pour écouter la saisie dans le champ.
        * element.textContent.includes(...) pour filtrer les résultats.
        * element.style.display = 'none' ou 'block' selon le résultat.
