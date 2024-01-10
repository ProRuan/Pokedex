function render(id) {
    let content = getElement('content');
    content.innerHTML = `
        ${writeHTML(id)}
    `;
}


function getElement(id) {
    return document.getElementById(id);
}


function writeHTML(id) {
    if (id == 'overview') {
        return writeHTMLOverview();
    } else if (id == 'pokecard') {
        return writeHTMLPokecard();
    } else if (id == 'pokecard-collection') {
        renderPokecardCollection();
    }
}


function writeHTMLOverview() {
    return `
        <h1 id="pokedex-headline">Pokedex</h1>
        <section id="pokecard-collector">
            <!-- rendering pokecards -->

            <div style="color: red">Anmerkung: render('overview') --> bitte löschen</div>

        </section>
    `;
}
// Please add filter button


// function renderPokecardCollection() {
//     let pokecardCollector = getElement('pokecard-collector');
//     pokecardCollector.innerHTML = '';

//     for (let i = 0; i < 7; i++) {
//         pokecardCollector.innerHTML += `
//         ${renderPokecard(i)}
//     `;
//     }
// }


function renderPokecardCollection() {
    let pokecardCollector = getElement('pokecard-collector');
    pokecardCollector.innerHTML = '';

    for (let i = 0; i < pokedex.length; i++) {
        pokecardCollector.innerHTML += `
        ${filterPokecard(i)}
    `;
    }
}


let filter = [];    // Bitte bearbeiten!!! + filter menu / button einfuegen!!!

function filterPokecard(i) {    // Bitte vereinfachen!!!
    let pokecard;
    let keys = ['main', 'types'];
    let types = getPokedexDeepValue(i, keys);
    if (filter.length > 0) {
        for (let j = 0; j < types.length; j++) {
            let type = types[j];
            let match;
            for (let k = 0; k < filter.length; k++) {
                match = type == filter[k];
                if (match) {
                    // pokecard = renderPokecard(i);
                    break;
                }
            }
            if (match) {
                pokecard = renderPokecard(i);
                break;
            } else {
                pokecard = '';
            }
        }
    } else {
        pokecard = renderPokecard(i);
    }
    return pokecard;
}


function renderPokecard(i) {
    let keys = ['main', 'types', 0];
    let color = getPokedexDeepValue(i, keys);
    return `
        <div id="pokecard-0" class="pokecard ${color}" onclick="openDialog(${i})">
            ${writePokecardId(i)}
            ${writePokecardName(i)}
            <div class="pokecard-types">
                ${writePokecardType(i, 0)}
                ${writePokecardType(i, 1)}
            </div>
            <div class="flex-end">
                ${writePokecardArtwork(i)}
            </div>
        </div>
    `;
}


function writePokecardId(i) {    // bearbeiten
    let id = getPokecardId(i);
    return `<div class="pokecard-index ta-right">${id}</div>`;
}


function getPokecardId(i) {
    let keys = ['main', 'id'];
    let id = getPokedexDeepValue(i, keys);
    return formatPokecardId(id);
}


function getPokedexDeepValue(index, keys) {
    let value = pokedex[index];
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        value = value[key];
    }
    return value;
}


function formatPokecardId(id) {
    return ((id > 99) ? '#' : ((id > 9) ? '#0' : '#00')) + id;
}


function writePokecardName(i) {    // bearbeiten
    let name = getPokecardName(i);
    return `<h3 class="pokecard-name">${name}</h3>`;
}


function getPokecardName(i) {
    let keys = ['main', 'name'];
    let name = getPokedexDeepValue(i, keys);
    return formatFirstLetter(name);
}


function formatFirstLetter(name) {
    first = name[0];
    capital = first.toUpperCase();
    return name.replace(first, capital);
}


function writePokecardType(i, j) {    // Bitte bearbeiten und main bg bearbeiten!!!
    let keys = ['main', 'types'];
    let types = getPokedexDeepValue(i, keys);
    let slot = j < types.length;
    if (slot) {
        let color = types[j];
        let type = formatFirstLetter(color);
        return `<div class="pokecard-type type-${color}">${type}</div>`;
    } else {
        return '';
    }
}


function writePokecardArtwork(i) {
    let keys = ['main', 'image'];
    let image = getPokedexDeepValue(i, keys);
    return `<img class="pokecard-artwork" src="${image}" alt="artwork">`;
}


function openDialog(i) {
    let dialog = getElement('pokecard-cover');
    dialog.show();
    let pokecard = getElement('pokecard');
    pokecard.innerHTML = '';
    pokecard.innerHTML = writeHTMLPokecard(i);
}


function closeDialog() {
    let dialog = getElement('pokecard-cover');
    dialog.close();
}


function stop(event) {
    event.stopPropagation();
}


function writeHTMLPokecard(i) {    // section pokecard erforderlich? --> use main from indes.html
    let keys = ['main', 'types', 0];
    let color = getPokedexDeepValue(i, keys);
    return `
        <section id="pokecard">
            <article id="pokecard-header" class="pokecard-header ${color}">
                <div id="header-group">
                    ${writePokecardNameDialog(i)}
                    ${writePokecardIdDialog(i)}
                    <div id="types" class="flex-between-center">
                        ${writePokecardTypeDialog(i, 0)}
                        ${writePokecardTypeDialog(i, 1)}
                    </div>
                </div>
                <div class="artwork-frame">
                    ${writePokecardArtworkDialog(i)}
                </div>
            </article>
            <article id="pokecard-body">
                <nav id="info-link-bar">
                    ${renderPokecardInfoLinks(i)}
                </nav>

                <div id="pokecard-info">
                    ${renderAbout(i)}
                </div>
            </article>
        </section>
    `;
}


function writePokecardNameDialog(i) {
    let name = getPokecardName(i);
    return `
        <h1 id="name">${name}</h1>
    `;
}


function writePokecardIdDialog(i) {
    let id = getPokecardId(i);
    return `
        <div id="index" class="ta-right">${id}</div>
    `;
}


function writePokecardTypeDialog(i, j) {    // Bitte bearbeiten und main bg bearbeiten!!!
    let keys = ['main', 'types'];
    let types = getPokedexDeepValue(i, keys);
    let slot = j < types.length;
    if (slot) {
        let color = types[j];
        let type = formatFirstLetter(color);
        return `<div id="type-1" class="type type-${color}">${type}</div>`;
    } else {
        return '';
    }
}


function writePokecardArtworkDialog(i) {
    let keys = ['main', 'image'];
    let image = getPokedexDeepValue(i, keys);
    return `<img class="artwork" src="${image}" alt="artwork">`;
}


function renderPokecardInfoLinks(i) {
    return `
        <a id="about" class="info-link info-link-active" onclick="renderPokecardInfo(${i}, id)">About</a>
        <a id="base-stats" class="info-link" onclick="renderPokecardInfo(${i}, id)">Base Stats</a>
        <a id="evolution" class="info-link" onclick="renderPokecardInfo(${i}, id)">Evolution</a>
        <a id="moves" class="info-link" onclick="renderPokecardInfo(${i}, id)">Moves</a>
    `;
}


function renderPokecardInfo(i, id) {
    let info = getElement('pokecard-info');
    info.innerHTML = '';
    if (id == 'moves') {
        info.innerHTML = 'moves';
    } else if (id == 'evolution') {
        info.innerHTML = 'evolution';
    } else if (id == 'base-stats') {
        info.innerHTML = renderBaseStats(i);
    } else if (id == 'about') {
        info.innerHTML = renderAbout(i);
    }
}


function renderAbout(i) {
    return `
        <table>
            ${renderSpecies(i)}
            ${renderHeight(i)}
            ${renderWeight(i)}
            ${renderAbilities(i)}
        </table>
    `;
}


function renderSpecies(i) {
    let keys = ['about', 'species'];
    let species = getPokedexDeepValue(i, keys);
    return `
        <tr>
            <td>Species</td>
            <td>${species}</td>
        </tr>
    `;
}


function renderHeight(i) {
    let height = formatValue(i, 'height');
    return `
        <tr>
            <td>Species</td>
            <td>${height} m</td>
        </tr>
    `;
}


function formatValue(i, key) {
    let keys = ['about', key];
    let integer = getPokedexDeepValue(i, keys);
    let decimal = integer / 10;
    return decimal.toFixed(1);
}


function renderWeight(i) {
    let weight = formatValue(i, 'weight');
    return `
        <tr>
            <td>Species</td>
            <td>${weight} kg</td>
        </tr>
    `;
}


function renderAbilities(i) {    // Bitte bearbeiten + Solar-power!!!
    let keys = ['about', 'abilities'];
    let abilities = getPokedexDeepValue(i, keys);
    let output = [];
    for (let j = 0; j < abilities.length; j++) {
        let ability = abilities[j];
        ability = formatFirstLetter(ability);
        if (j < 1) {
            output.push(ability);
        } else {
            output.push(' ' + ability);
        }
    }
    return `
        <tr>
            <td>Species</td>
            <td>${output}</td>
        </tr>
    `;
}


function renderBaseStats(i) {    // Bitte vereinfachen!!! + css 45 67 aso rendern!!!
    return `
        <table>
            ${renderStat(i, 'hp', 'HP')}
            ${renderStat(i, 'attack', 'Attack')}
            ${renderStat(i, 'defense', 'Defense')}
            ${renderStat(i, 'special-attack', 'Sp. Atk')}
            ${renderStat(i, 'special-defense', 'Sp. Def')}
            ${renderStat(i, 'speed', 'Speed')}
        </table>
    `;
}


function renderStat(i, key, title) {
    let keys = ['base-stats', key];
    let stat = getPokedexDeepValue(i, keys);
    setStatClass(key, stat);
    return `
        <tr>
            <td>${title}</td>
            <td>${stat}</td>
            <td>
                <div class="total-bar">
                    <div class="value-bar ${key}"></div>
                </div>
            <td>
        </tr>
    `;
}


function setStatClass(key, stat) {
    let style = getElement('style-collector');
    let color = setStatClassColor(stat);
    if (key == 'hp') {
        style.innerHTML = '';
    }
    style.innerHTML += `
        <style id="${key}">
            .${key} {
                width: ${stat}px;
                background-color: ${color};
            }
        </style>
    `;
}


function setStatClassColor(stat) {
    let color = 'transparent';
    if (stat > 49) {
        color = '#5EC788';
    } else {
        color = '#FB7878';
    }
    return color;
}


function search() {
    let input = document.getElementById('search').value;
    let empty = input.length < 1;
    if (empty) {
        for (let i = 0; i < pokedex.length; i++) {
            delete pokedex[i]['search'];
        }
    } else {
        let keys = ['main', 'name'];
        for (let i = 0; i < 7; i++) {
            let name = getPokedexDeepValue(i, keys);
            let inputTrue = name.toLowerCase().indexOf(input) > -1;
            if (inputTrue) {
                pokedex[i]['search'] = true;
            } else {
                pokedex[i]['search'] = false;
            }
        }
    }
    save('pokedex', pokedex);
    renderPokecardCollection();
}


// Option
// render Pokeball svg