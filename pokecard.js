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
    }
}


function writeHTMLOverview() {
    return `
        <header>
            <button>back</button>
            <button>menu</button>
        </header>
        <main id="pokedex">
            <h1>Pokedex</h1>
            <section id="pokecard-collector">
                <!-- rendering pokecards -->
            </section>

            <div style="color: red">Anmerkung: render('overview') --> bitte löschen</div>

        </main>
    `;
}
// Please add filter button


function writeHTMLPokecard() {
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