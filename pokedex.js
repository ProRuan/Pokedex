let kantodex;
let names = [];
let kantomon = [];
let pokedex = [];


load('kantodex');
load('pokedex');


async function init() {
    await loadKantodex();
    getNames();
    await loadPokemon();
    recordPokemon();
}

async function loadKantodex() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;
    let response = await fetch(url);
    let pokedata = await response.json();
    kantodex = pokedata['results'];
    save('kantodex', kantodex);

    // console.log('kantodex', kantodex);
}


async function getNames() {
    for (let i = 0; i < kantodex.length; i++) {
        let name = kantodex[i]['name'];
        names.push(name);
    }
}


async function loadPokemon() {
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        let response = await fetch(url);
        let pokemon = await response.json();
        kantomon.push(pokemon);
    }
}


function recordPokemon() {
    for (let i = 0; i < kantodex.length; i++) {
        pokedex[i] = {
            'main': recordMain(i),
            'about': recordAbout(i),
            // 'base-stat': recordBaseStat(i),
            // 'evolution': recordEvolution(i),
            // 'moves': recordMoves(i)
        };
    }
    save('pokedex', pokedex);
}


function recordMain(i) {
    let head = {
        'id': getKantomonObjectValue(i, 'id'),
        'name': getKantomonObjectValue(i, 'name'),
        'types': getKantomonObjectValueDeep(i, 'types', 'type'),
        'artwork': getKantomonArwork(i, 'sprites')
    };
    return head;
}


function getKantomonObjectValue(index, key) {
    return kantomon[index][key];
}


function getKantomonObjectValueDeep(index, key, subkey) {
    let master = getKantomonObjectValue(index, key);
    let slots = [];
    for (let i = 0; i < master.length; i++) {
        let primal = master[i][subkey]['name'];
        slots.push(primal);
    }
    return slots;
}


function getKantomonArwork(index, key) {
    let sprites = getKantomonObjectValue(index, key);
    return sprites['other']['official-artwork']['front_default'];
}


function recordAbout(i) {
    let about = {
        'height': getKantomonObjectValue(i, 'height'),
        'weight': getKantomonObjectValue(i, 'weight'),
        'abilities': getKantomonObjectValueDeep(i, 'abilities', 'ability')
    };
    return about;
}


function save(key, variable) {
    let variableAsText = JSON.stringify(variable);
    localStorage.setItem(key, variableAsText);
}


function load(key) {
    let variableAsText = localStorage.getItem(key);
    if (variableAsText && key == 'kantodex') {
        kantodex = JSON.parse(variableAsText);
    } else if (variableAsText && key == 'kantomon') {
        kantomon = JSON.parse(variableAsText);
    }
}


// kantomon --> pokemon
// think about function names
// think about save and load