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


// function writeHTMLCard() {
//     return `
        
//     `;
// }




// Option
// render Pokeball svg