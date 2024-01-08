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
        <main id="pokecard">
            <section id="header">
                <div id="header-group">
                    <h1 id="name">Bulbasaur</h1>
                    <div id="index">#001</div>
                    <div id="types">
                        <div id="type-1">Grass</div>
                        <div id="type-2">Poison</div>
                    </div>
                </div>
                <img id="artwork" src="" alt="bulbasaur">
            </section>
            <section id="pokecard-body">
                <nav id="link-group">
                    <a id="about">About</a>
                    <a id="base-stats">Base Stats</a>
                    <a id="evolution">Evolution</a>
                    <a id="moves">Moves</a>
                </nav>

                <!-- rendering link 1, 2, 3 or 4 -->

                <article id="about-content">
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
                    </table>
                </article>
            </section>
        </main>
    `;
}




// Option
// render Pokeball svg