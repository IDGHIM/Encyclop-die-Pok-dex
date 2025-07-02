let pokemonsFR = [];

async function loadPokemonListFR() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=10000');
  if (!res.ok) throw new Error("Impossible de charger la liste des Pokémon");
  const data = await res.json();

  const promises = data.results.map(async (species) => {
    const spRes = await fetch(species.url);
    if (!spRes.ok) throw new Error("Erreur sur une espèce Pokémon");
    const spData = await spRes.json();
    const nameFR = spData.names.find(n => n.language.name === 'fr')?.name || spData.name;
    return { id: spData.id, nameFR };
  });

  pokemonsFR = await Promise.all(promises);
}

function getTypeFR(type) {
  const map = {
    fire: 'feu',
    water: 'eau',
    grass: 'plante',
    electric: 'electrik',
    poison: 'poison',
    flying: 'vol',
    ice: 'glace',
    bug: 'insecte',
    normal: 'normal',
    fighting: 'combat',
    ground: 'sol',
    rock: 'roche',
    ghost: 'spectre',
    steel: 'acier',
    psychic: 'psy',
    dragon: 'dragon',
    dark: 'tenebres',
    fairy: 'fée',
  };
  return map[type] || type;
}

const typeColors = {
  normal: '#A8A878',
  feu: '#F08030',
  eau: '#6890F0',
  plante: '#78C850',
  electrik: '#F8D030',
  glace: '#98D8D8',
  combat: '#C03028',
  poison: '#A040A0',
  sol: '#E0C068',
  vol: '#A890F0',
  spectre: '#705898',
  insecte: '#A8B820',
  roche: '#B8A038',
  acier: '#B8B8D0',
  fée: '#EE99AC',
  psy: '#F85888',
  dragon: '#7038F8',
  tenebres: '#705848'
};

async function fetchPokemonByFrenchName(searchName) {
  if (pokemonsFR.length === 0) {
    await loadPokemonListFR();
  }

  const poke = pokemonsFR.find(p => p.nameFR.toLowerCase() === searchName.toLowerCase());

  if (!poke) {
    throw new Error('Pokémon en français non trouvé');
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.id}`);
  if (!res.ok) throw new Error('Erreur lors de la récupération des données Pokémon');
  const data = await res.json();

  const resSpec = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke.id}`);
  if (!resSpec.ok) throw new Error('Erreur lors de la récupération des données species');
  const species = await resSpec.json();

  const flavorEntry = species.flavor_text_entries.find(f => f.language.name === 'fr');
  const descriptionFR = flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, ' ') : 'Pas de description disponible.';

  return { data, nameFR: poke.nameFR, descriptionFR };
}

async function fetchPokemon() {
  const input = document.getElementById('searchInput').value.trim();
  const container = document.getElementById('pokemonContainer');
  container.innerHTML = '<p>Recherche en cours...</p>';

  if (!input) {
    container.innerHTML = '<p class="erreur">Veuillez entrer un nom de Pokémon.</p>';
    return;
  }

  try {
    const { data, nameFR, descriptionFR } = await fetchPokemonByFrenchName(input);

    const types = data.types.map(t => t.type.name);
    const typesFR = types.map(t => getTypeFR(t));

    // Récupère les couleurs des types (ou une couleur par défaut)
    const colors = typesFR.map(t => typeColors[t] || '#777');

    // Crée un dégradé pour 2 types, sinon couleur simple
    let bgGradient;
    if (colors.length === 2) {
      bgGradient = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    } else {
      bgGradient = colors[0];
    }

    const typesHTML = typesFR.map(t => `<span class="type">${t}</span>`).join(' ');

    container.innerHTML = `
      <section class="carte" style="--bg-gradient: ${bgGradient}">
        <h2>${nameFR}</h2>
        <p>N°${data.id.toString().padStart(4, '0')}</p>
        <div>${typesHTML}</div>
        <img src="${data.sprites.front_default}" alt="${nameFR}" />
        <p><em>${descriptionFR}</em></p>
      </section>
    `;
  } catch (e) {
    container.innerHTML = `<p class="erreur">${e.message}</p>`;
  }
}

document.getElementById('searchBtn').addEventListener('click', fetchPokemon);
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') fetchPokemon();
});
