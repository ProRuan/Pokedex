let kantodex;
let register = [];
let kantomon = [];


load('kantodex');
load('pokedex');


async function init() {
    await loadKantodex();
    getPokeNames();
    await loadPokemon();
    await createEntry();
    await createHead();
    createId();
}

async function loadKantodex() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;
    let response = await fetch(url);
    let pokedata = await response.json();
    kantodex = pokedata['results'];
    save('kantodex', kantodex);

    // console.log('kantodex', kantodex);
}


async function getPokeNames() {
    for (let i = 0; i < kantodex.length; i++) {
        let name = kantodex[i]['name'];
        register.push(name);
    }
}


async function loadPokemon() {
    for (let i = 0; i < kantodex.length; i++) {
        let name = register[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        let response = await fetch(url);
        let pokemon = await response.json();
        kantomon.push(pokemon);
    }
}


async function createEntry() {
    for (let i = 0; i < kantodex.length; i++) {
        pokedex[i] = {
            'head': null,
            'about': null,
            'base-stat': null,
            'evolution': null,
            'moves': null
        };
    }
    save('pokedex', pokedex);
}


async function createHead() {
    for (let i = 0; i < kantodex.length; i++) {
        pokedex[i]['head'] = {
            'id': null,
            'name': null,
            'type': null,
            'image': null
        }
    }
    save('pokedex', pokedex);
}


function createId() {
    for (let i = 0; i < kantomon.length; i++) {
        let id = kantomon[i]['id'];
        pokedex[i]['head']['id'] = id;
        let name = kantomon[i]['name'];
        pokedex[i]['head']['name'] = name;
    }
    save('pokedex', pokedex);
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