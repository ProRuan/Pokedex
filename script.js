let currentPokemon;


async function loadPokemon() {
    // let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
    let url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
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



    // Pokemon Cards: name + type + image

    // Head
    let id = currentPokemon['id'];
    console.log(id);
    let name = currentPokemon['name'];
    console.log(name);
    let artwork = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    console.log(artwork);
    // let artworkDefault = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    // console.log(artworkDefault);
    // let artworkShiny = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
    // console.log(artworkShiny);
    let typeOne = currentPokemon['types'][0]['type']['name'];
    console.log(typeOne);
    let typeTwo = currentPokemon['types'][1]['type']['name'];
    console.log(typeTwo);


    // (1) About
    // Species - not available
    let height = currentPokemon['height'];
    console.log(height);
    let weight = currentPokemon['weight'];
    console.log(weight);
    let abilitiesOne = currentPokemon['abilities'][0]['ability']['name'];
    console.log(abilitiesOne);
    let abilitiesTwo = currentPokemon['abilities'][1]['ability']['name'];
    console.log(abilitiesTwo);
    // array required!!!

    // Breeding - not available


    // (2) Base Stats
    let hp = currentPokemon['stats'][0]['stat']['name'];
    console.log(hp);
    let hpBaseStat = currentPokemon['stats'][0]['base_stat'];
    console.log(hpBaseStat);
    let attack = currentPokemon['stats'][1]['stat']['name'];
    console.log(attack);
    let attackBaseStat = currentPokemon['stats'][1]['base_stat'];
    console.log(attackBaseStat);
    let defense = currentPokemon['stats'][2]['stat']['name'];
    console.log(defense);
    let defenseBaseStat = currentPokemon['stats'][2]['base_stat'];
    console.log(defenseBaseStat);
    let specialAttack = currentPokemon['stats'][3]['stat']['name'];
    console.log(specialAttack);
    let specialAttackBaseStat = currentPokemon['stats'][3]['base_stat'];
    console.log(specialAttackBaseStat);
    let specialDefense = currentPokemon['stats'][4]['stat']['name'];
    console.log(specialDefense);
    let specialDefenseBaseStat = currentPokemon['stats'][4]['base_stat'];
    console.log(specialDefenseBaseStat);
    let speed = currentPokemon['stats'][5]['stat']['name'];
    console.log(speed);
    let speedBaseStat = currentPokemon['stats'][5]['base_stat'];
    console.log(speedBaseStat);
    // calculate total

    // Type Defenses - not available


    // (3) Evolution
    // evolution == true
    // see next pokemon


    // (4) Moves
    // array required!!!
    let move = currentPokemon['moves'][0]['move']['name'];
    console.log(move);

    let moves = [];
    for (let m = 0; m < currentPokemon['moves'].length; m++) {
        let move = currentPokemon['moves'][m]['move']['name'];
        moves.push(move);
    }
    console.log(moves);

    let moveCondition = currentPokemon['moves'][0]['version_group_details'][0]['version_group']['name'];
    console.log(moveCondition);

}


// smarte Funktionen schreiben (JSON pokedex und pokemon - max loc 400)
// clean coding
// German and English version with ChatGPT


// Open Sans einbinden
// https://dribbble.com/shots/6540871-Pokedex-App