// Sélectionner le champ de recherche
const searchInput = document.getElementById('searchInput');

// Écouter l'événement de saisie dans le champ de recherche
searchInput.addEventListener('input', function() {
    // Sélectionner toutes les fiches de Pokémon
    const pokemonCards = document.querySelectorAll('.carte');

    // Récupérer la valeur de la saisie
    const searchQuery = searchInput.value.toLowerCase(); // Mettre en minuscules pour ne pas être sensible à la casse

    // Filtrer les fiches en fonction de la saisie
    pokemonCards.forEach(function(card) {
        const pokemonName = card.querySelector('.nom').textContent.toLowerCase();

        // Si le nom du Pokémon contient la requête de recherche, on le garde visible, sinon on le cache
        if (pokemonName.includes(searchQuery)) {
            card.style.display = 'block'; // Afficher la fiche
        } else {
            card.style.display = 'none'; // Cacher la fiche
        }
    });
});
