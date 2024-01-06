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
            'base-stat': recordBaseStat(i),
            'evolution': recordEvolution(i),
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
        'image': getKantomonArwork(i, 'sprites')
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


function recordBaseStat(i) {
    let stats = getKantomonObjectValue(i, 'stats');
    let baseStats = {
        'hp': stats[0]['base_stat'],
        'attack': stats[1]['base_stat'],
        'defense': stats[2]['base_stat'],
        'special-attack': stats[3]['base_stat'],
        'special-defence': stats[4]['base_stat'],
        'speed': stats[5]['base_stat']
    }
    return baseStats;
}


function getStat(index) {
    let stats = getKantomonObjectValue(index, 'stats');
    let baseStats = [];
    for (let i = 0; i < stats.length; i++) {
        let stat = getKantomonObjectValue[i, 'base_stat'];
        baseStats.push(stat);
    }
    return baseStats;
}


function recordEvolution(index) {    // funktioniert, aber bitte vereinfachen
    let evolutionCases = getEvolutionCases(index);
    let evolutionFamilies = getEvolutionFamilies(index);
    return getFamilyOfThis(index, evolutionCases, evolutionFamilies);
}


function getEvolutionCases(index) {
    let [beforePrevious, previous, current, next, afterNext] = getIndices(index);
    let tertiary = evolution[beforePrevious] && evolution[previous];
    let secondary = evolution[previous] && evolution[current];
    let primary = evolution[current] && evolution[next];
    let simple = evolution[previous];
    let basic = evolution[current];
    return [tertiary, secondary, primary, simple, basic];
}


function getIndices(index) {
    let indices = [];
        for (let i = 0; i < 5; i++) {
            let id = index + i - 2;
            indices.push(id)
        }
    return indices;
}


function getEvolutionFamilies(index) {
    let [beforePrevious, previous, current, next, afterNext] = getIndices(index);
    let familyOfTertiary = [beforePrevious, previous, current];
    let familyOfSecondary = [previous, current, next];
    let familyOfPrimary = [current, next, afterNext];
    let familyOfSimple = [previous, current];
    let familyOfBasic = [current, next];
    return [familyOfTertiary, familyOfSecondary, familyOfPrimary, familyOfSimple, familyOfBasic];
}


function getFamilyOfThis(single, members, families) {
    for (let i = 0; i < 5; i++) {
        let member = members[i];
        if (member) {
            let family = families[i];
            return family;
        }
    }
    return [single];
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