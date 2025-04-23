/**
 * @typedef {{szerzo:String, Mufaj:string, Cim:string}} array
 * Egy tömb, ami a könyvek adatait tartalmazza.
 * @type {array[]} - A tömb típusa, amely a könyvek adatait tartalmazza
 */
const array = []; // egy tömb, ami a könyvek adatait tartalmazza

// Létrehozza a fő konténer div-et
const containerDiv = makeDiv('container'); // létrehoz egy új div elemet a 'container' class névvel
document.body.appendChild(containerDiv); // a body-hoz hozzáadja a létrehozott div elemet

// Táblázat és funkciók inicializálása
tablaKrealas(containerDiv, (bodyOfTable) => {
    createForm(bodyOfTable, containerDiv, array); // létrehoz egy űrlapot
    createFileUploader(bodyOfTable, containerDiv, array); // létrehoz egy fájlfeltöltő funkciót
    fajlLetoltes(containerDiv, array); // hozzáad egy letöltési funkciót
    szuresSima(containerDiv, array, bodyOfTable); // hozzáadja a szűrési funkciót
});


