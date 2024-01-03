let currentPokemon;


async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loaded pokemon', currentPokemon);

    renderPokemonInfo();
}


function renderPokemonInfo() {
    let pokemonName = currentPokemon['name'];
    document.getElementById('pokemon-name').innerHTML = pokemonName;

    // currentPokemon['sprites']['front_default']
    // anderes Bild auswaehlen
    let pokemonImage = currentPokemon['sprites']['front_default'];
    document.getElementById('pokemon-image').src = pokemonImage;
}


// Open Sans einbinden
// https://dribbble.com/shots/6540871-Pokedex-App