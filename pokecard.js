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


function renderPokecardCollection() {
    let pokecardCollector = getElement('pokecard-collector');
    pokecardCollector.innerHTML = '';

    for (let i = 0; i < pokedex.length; i++) {
        pokecardCollector.innerHTML += `
        ${renderPokecard(i)}
    `;
    }
}


function renderPokecard(i) {
    let keys = ['main', 'types', 0];
    let color = getPokedexDeepValue(i, keys);
    return `
        <div id="pokecard-0" class="pokecard ${color}">
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
    return `<img class="pokecard-artwork" src="${image}" alt="bulbasaur">`;
}


function writeHTMLPokecard() {    // section pokecard erforderlich? --> use main from indes.html
    return `
        <section id="pokecard">
            <article id="pokecard-header" class="pokecard-header">
                <div id="header-group">
                    <h1 id="name">Bulbasaur</h1>
                    <div id="index" class="ta-right">#001</div>
                    <div id="types" class="flex-between-center">
                        <div id="type-1" class="type">Grass</div>
                        <div id="type-2" class="type">Poison</div>
                    </div>
                </div>
                <div id="artwork-frame">
                    <img id="artwork" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="bulbasaur">
                </div>
            </article>
            <article id="pokecard-body">
                <nav id="info-link-bar">
                    <a id="about" class="info-link info-link-active">About</a>
                    <a id="base-stats" class="info-link">Base Stats</a>
                    <a id="evolution" class="info-link">Evolution</a>
                    <a id="moves" class="info-link">Moves</a>
                </nav>

                <!-- rendering link 1, 2, 3 or 4 -->

                <table>
                    <tr>
                        <td>Species</td>
                        <td>Seed</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>0.70 m</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>6.90 kg</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td>Overgrow, Clorophyl</td>
                    </tr>
                </table>
            </article>
        </section>
    `;
}




// Option
// render Pokeball svg