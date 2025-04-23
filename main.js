/**
 * Egy tömb, ami a könyvek adatait tartalmazza.
 * @type {Array<Object>}
 */
const array = []; // egy tömb, ami a könyvek adatait tartalmazza

/**
 * Létrehoz egy div elemet a megadott osztálynévvel.
 * @param {string} className - A div elem osztályneve.
 * @returns {HTMLElement} - A létrehozott div elem.
 */
const makeDiv = (className) => { // egy függvény, ami létrehoz egy div elemet a megadott class névvel
    const div = document.createElement('div'); // létrehoz egy új div elemet
    div.className = className; // beállítja a class nevét
    return div; // visszaadja a létrehozott div elemet
};

// Létrehozza a fő konténer div-et
const containerDiv = makeDiv('container'); // létrehoz egy új div elemet a 'container' class névvel
document.body.appendChild(containerDiv); // a body-hoz hozzáadja a létrehozott div elemet

// Létrehozza a táblázatot tartalmazó div-et
const tableDiv = makeDiv('table'); // létrehoz egy új div elemet a 'table' class névvel
containerDiv.appendChild(tableDiv); // a containerDiv-hez hozzáadja a tableDiv elemet

// Létrehozza a táblázatot
const defaultTable = document.createElement('table'); // létrehoz egy új table elemet
tableDiv.appendChild(defaultTable); // a tableDiv-hez hozzáadja a létrehozott table elemet

// Létrehozza a táblázat fejlécét
const tableHeader = document.createElement('thead'); // létrehoz egy új thead elemet
defaultTable.appendChild(tableHeader); // a defaultTable-hez hozzáadja a létrehozott thead elemet

// A táblázat fejlécének oszlopnevei
const fejlecek = ['Szerző', 'Műfaj', 'Cím']; // a táblázat fejlécének nevei
for (const fejlec of fejlecek) { // végigmegy a fejlecek tömbön
    const th = document.createElement('th'); // létrehoz egy új th elemet
    th.innerText = fejlec; // beállítja a th elem szövegét
    tableHeader.appendChild(th); // a tableHeader-hez hozzáadja a létrehozott th elemet
}

// Létrehozza a táblázat törzsét
const tableBody = document.createElement('tbody'); // létrehoz egy új tbody elemet
defaultTable.appendChild(tableBody); // a defaultTable-hez hozzáadja a létrehozott tbody elemet

// Létrehozza a formot tartalmazó div-et
const formDiv = makeDiv('form'); // létrehoz egy új div elemet a 'form' class névvel
containerDiv.appendChild(formDiv); // a containerDiv-hez hozzáadja a formDiv elemet

// Létrehozza a form elemet
const form = document.createElement('form'); // létrehoz egy új form elemet
formDiv.appendChild(form); // a formDiv-hez hozzáadja a létrehozott form elemet

// A form mezőinek leírása
const Lista = [
    { fieldid: 'szerzo', fieldLabel: 'Szerzo' }, // a lista elemei, amik a form elemeket tartalmazzák
    { fieldid: 'mufaj', fieldLabel: 'Mufaj' }, // a lista elemei, amik a form elemeket tartalmazzák
    { fieldid: 'cim', fieldLabel: 'Cim' } // a lista elemei, amik a form elemeket tartalmazzák
];

// Létrehozza a form mezőit
for (const field of Lista) { // végigmegy a lista elemein
    const fieldDiv = makeDiv('field'); // létrehoz egy új div elemet a 'field' class névvel
    form.appendChild(fieldDiv); // a form-hoz hozzáadja a létrehozott fieldDiv elemet

    const label = document.createElement('label'); // létrehoz egy új label elemet
    label.htmlFor = field.fieldid; // beállítja a label htmlFor attribútumát
    label.textContent = field.fieldLabel; // beállítja a label szövegét
    fieldDiv.appendChild(label); // a fieldDiv-hez hozzáadja a létrehozott label elemet

    const input = document.createElement('input'); // létrehoz egy új input elemet
    input.id = field.fieldid; // beállítja az input id attribútumát
    fieldDiv.appendChild(input); // a fieldDiv-hez hozzáadja a létrehozott input elemet

    const error = document.createElement('span'); // létrehoz egy új span elemet
    error.className = 'error'; // beállítja a span class nevét
    fieldDiv.appendChild(error); // a fieldDiv-hez hozzáadja a létrehozott span elemet
}

// Létrehozza a form elküldésére szolgáló gombot
const submitButton = document.createElement('button'); // létrehoz egy új button elemet
submitButton.textContent = 'Hozzaadas'; // beállítja a button szövegét
form.appendChild(submitButton); // a form-hoz hozzáadja a létrehozott button elemet

// Form elküldésének eseménykezelője
form.addEventListener('submit', (event) => { // eseménykezelő, ami akkor fut le, amikor a formot elküldik
    event.preventDefault(); // megakadályozza az alapértelmezett form elküldést
    const Objectvalue = {}; // létrehoz egy új objektumot, ami a form adatait tartalmazza
    let valid = true; // egy változó, ami azt jelzi, hogy az űrlap érvényes-e

    const bemenet = event.target.querySelectorAll('input'); // lekéri az összes input elemet a formból
    for (const input of bemenet) { // végigmegy az input elemek tömbjén
        const error = input.parentElement.querySelector('.error'); // lekéri a span elemet, ami az inputhoz tartozik
        error.textContent = ''; // törli az error üzenetet

        if (input.value === '') { // ha az input értéke üres
            error.textContent = 'Kötelező mező'; // beállítja az error üzenetet
            valid = false; // az űrlap nem érvényes
        }
        Objectvalue[input.id] = input.value; // beállítja az objektum mezőit az input elemek értékeivel
    }

    if (!valid) return; // ha az űrlap nem érvényes, kilép

    array.push(Objectvalue); // hozzáadja az objektumot a tömbhöz

    const tableRow = document.createElement('tr'); // létrehoz egy új tr elemet
    tableBody.appendChild(tableRow); // a tableBody-hoz hozzáadja a létrehozott tr elemet

    for (const key of ['szerzo', 'mufaj', 'cim']) { // végigmegy az objektum kulcsain
        const td = document.createElement('td'); // létrehoz egy új td elemet
        td.innerText = Objectvalue[key]; // beállítja a td elem szövegét
        tableRow.appendChild(td); // a tableRow-hoz hozzáadja a létrehozott td elemet
    }
});

// Fájl feltöltésére szolgáló input elem
const Uploadinput = document.createElement('input'); // létrehoz egy új input elemet
Uploadinput.id = 'inputfile'; // beállítja az input id attribútumát
Uploadinput.type = 'file'; // beállítja az input típusát fájlra
containerDiv.appendChild(Uploadinput); // a containerDiv-hez hozzáadja a létrehozott input elemet

// Fájl feltöltésének eseménykezelője
Uploadinput.addEventListener('change', (event) => { // eseménykezelő, ami akkor fut le, amikor a fájlt kiválasztják
    const file = event.target.files[0]; // lekéri a kiválasztott fájlt
    const reader = new FileReader(); // létrehoz egy új FileReader objektumot

    reader.onload = () => { // eseménykezelő, ami akkor fut le, amikor a fájl betöltődött
        const filesor = reader.result.split('\n'); // a fájl tartalmát sorokra bontja
        const noheader = filesor.slice(1); // eltávolítja az első sort (fejléc)

        for (const sor of noheader) { // végigmegy a sorokon
            const clean = sor.trim(); // helyesen meghívja a trim() metódust
            const sorTomb = clean.split(';'); // a sort tömbbé alakítja

            const alkotasok = { // létrehoz egy új objektumot, ami a fájl sorait tartalmazza
                szerzo: sorTomb[0], // beállítja az objektum mezőit a sor tömb elemeivel
                mufaj: sorTomb[1],
                cim: sorTomb[2]
            };

            array.push(alkotasok); // hozzáadja az objektumot a tömbhöz

            const tableRow = document.createElement('tr'); // létrehoz egy új tr elemet
            tableBody.appendChild(tableRow); // a tableBody-hoz hozzáadja a létrehozott tr elemet

            for (const key of ['szerzo', 'mufaj', 'cim']) { // végigmegy az objektum kulcsain
                const td = document.createElement('td'); // létrehoz egy új td elemet
                td.textContent = alkotasok[key]; // beállítja a td elem szövegét
                tableRow.appendChild(td); // a tableRow-hoz hozzáadja a létrehozott td elemet
            }
        }
    };
    reader.readAsText(file); // beolvassa a fájlt szövegként
});

// Fájl letöltésére szolgáló gomb
const letoltes = document.createElement('button'); // létrehoz egy új button elemet
letoltes.textContent = 'Letoltes'; // beállítja a button szövegét
containerDiv.appendChild(letoltes); // a containerDiv-hez hozzáadja a létrehozott button elemet

// Fájl letöltésének eseménykezelője
letoltes.addEventListener('click', () => { // eseménykezelő, ami akkor fut le, amikor a gombra kattintanak
    const link = document.createElement('a'); // létrehoz egy új a elemet

    const contentTomb = ['szerző;műfaj;cím']; // létrehoz egy új tömböt, ami a fájl tartalmát tartalmazza
    for (const sor of array) { // végigmegy a tömb elemein
        contentTomb.push(`${sor.szerzo};${sor.mufaj};${sor.cim}`); // hozzáadja a sorokat a tömbhöz
    }

    const content = contentTomb.join('\n'); // a tömb elemeit összefűzi egy szöveggé
    const blob = new Blob([content]); // létrehoz egy új Blob objektumot a szövegből

    link.href = URL.createObjectURL(blob); // beállítja a link href attribútumát a Blob objektum URL-jére
    link.download = 'letoltes.csv'; // beállítja a letöltési fájl nevét
    link.click(); // rákattint a linkre, hogy letöltse a fájlt
    URL.revokeObjectURL(link.href); // visszavonja az URL-t, hogy felszabadítsa a memóriát
});