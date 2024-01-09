let kantodex;
let names = [];
let kantomon = [];
let species = [];    // Bitte bearbeiten
let pokedex = [];


load('kantodex');
load('species');    // Bitte bearbeiten
load('pokedex');


async function init() {
    await loadKantodex();
    getNames();
    await loadPokemon();
    await loadSpecies();
    recordPokemon();
    getSpecies();
    render('overview');
    renderPokecardCollection();
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


async function loadSpecies() {    // Bitte bearbeiten
    for (let i = 0; i < 151; i++) {
        let url = kantomon[i]['species']['url'];
        let response = await fetch(url);
        let pokedata = await response.json();
        let genus = pokedata['genera'][7]['genus'];
        species.push(genus);
    }
    save('species', species);    // load is still missing
}


function recordPokemon() {
    for (let i = 0; i < kantodex.length; i++) {
        pokedex[i] = {
            'main': recordMain(i),
            'about': recordAbout(i),
            'base-stats': recordBaseStat(i),
            'evolution': recordEvolution(i),
            'moves': recordMoves(i)
        };
    }
    save('pokedex', pokedex);
}


function recordMain(i) {
    let main = {
        'id': getKantomonObjectValue(i, 'id'),
        'name': getKantomonObjectValue(i, 'name'),
        'types': getKantomonObjectValueDeep(i, 'types', 'type'),
        'image': getKantomonArwork(i, 'sprites')
    };
    return main;
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
        'species': getSpecies(i),
        'height': getKantomonObjectValue(i, 'height'),
        'weight': getKantomonObjectValue(i, 'weight'),
        'abilities': getKantomonObjectValueDeep(i, 'abilities', 'ability')
    };
    return about;
}


function getSpecies(i) {
    return species[i];
}


function recordBaseStat(i) {    // think about object names
    let baseStats = {
        'hp': getBaseStatsNew(i, 0),
        'attack': getBaseStatsNew(i, 1),
        'defense': getBaseStatsNew(i, 2),
        'special-attack': getBaseStatsNew(i, 3),
        'special-defence': getBaseStatsNew(i, 4),
        'speed': getBaseStatsNew(i, 5)
    }
    return baseStats;
}


function getBaseStat(i, j) {    // opton 1 (not in use)
    let stats = getJSONObjectValue(kantomon, i, 'stats');
    let stat = getJSONObjectValue(stats, j, 'base_stat');
    return stat;
}


function getJSONObjectValue(variable, index, key) {    // opton 1 (not in use)
    return variable[index][key];
}


function getBaseStatsNew(i, j) {    // opton 2
    let keys = ['stats', j, 'base_stat'];
    let stat = getJSONObjectValueDeep(kantomon, i, keys);
    return stat;
}


function getJSONObjectValueDeep(variable, index, keys) {    // opton 2
    result = variable[index];
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        result = result[key];
    }
    return result;
}


function recordEvolution(index) {
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


function recordMoves(index) {
    let version = {
        'red-blue': getMovesVersion(index, 'red-blue'),
        'yellow': getMovesVersion(index, 'yellow')
    }
    return version;
}


function getMovesVersion(index, key) {
    let [names, methods, levels] = getVersionDetails(index, key);
    let version = {
        'names': names,
        'methods': methods,
        'levels': levels
    }
    return version;
}


function getVersionDetails(index, key) {    // Bitte vereinfachen!!!
    let [names, methods, levels] = getVersionParameters();
    let moves = getKantomonObjectValue(index, 'moves');
    let namesMethodsLevels = [names, methods, levels];
    iterateOverMoves(key, moves, namesMethodsLevels);
    return [names, methods, levels];
}


function getVersionParameters() {
    let names = [];
    let methods = [];
    let levels = [];
    return [names, methods, levels];
}


function iterateOverMoves(key, moves, namesMethodsLevels) {
    for (let i = 0; i < moves.length; i++) {
        let name = moves[i]['move']['name'];
        let versionGroup = moves[i]['version_group_details'];
        let nameVersionGroup = [name, versionGroup];
        iterateOverVersionGroup(key, namesMethodsLevels, nameVersionGroup);
    }
}


function iterateOverVersionGroup(key, namesMethodsLevels, nameVersionGroup) {
    let [name, versionGroup] = nameVersionGroup;
    for (let j = 0; j < versionGroup.length; j++) {
        let version = versionGroup[j]['version_group']['name'];
        let method = versionGroup[j]['move_learn_method']['name'];
        let level = versionGroup[j]['level_learned_at'];
        let nameVersionMethodLevel = [name, version, method, level];
        pushVersionDetails(key, namesMethodsLevels, nameVersionMethodLevel);
    }
}


function pushVersionDetails(key, namesMethodsLevels, nameVersionMethodLevel) {
    let [names, methods, levels] = namesMethodsLevels;
    let [name, version, method, level] = nameVersionMethodLevel;
    if (version == key) {
        names.push(name);
        methods.push(method);
        levels.push(level);
    }
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
    } else if (variableAsText && key == 'species') {
        species = JSON.parse(variableAsText);
    }
}




// Tasks
// -----
// II. Render TypeColor (HTML)
// I. Calculate Total (JavaScript)


// Options
// -------
// About: breeding details
// Evolution:  evolution chain
// moves: other versions


// Clean Coding
// ------------
// kantomon --> pokemon
// think about function names
// think about save and load
// use i instead of index
// use MASTERKEY()