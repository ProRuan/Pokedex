let pokemon

async function init() {
    // buildPokedex();
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;
    let response = await fetch(url);
    pokemon = await response.json();
    console.log('pokemon', pokemon);

    // for (let i = 0; i < kantoPokemon < length; i++) {
    //     let name = pokemon['results']['0 _ 99'][i]['name'];
    //     pokemonNames.push(name);
    //     console.log(name);
    // }

    // renderPokemon();
}


// async function buildPokedex() {
//     for (let i = 0; i < pokemonKanto.length; i++) {
//         let pokemon = pokemonKanto[i];
//         let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
//         let response = await fetch(url);
//         pokemon = await response.json();
//         console.log('pokemon', pokemon);
//     }
// }