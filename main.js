/**
 * 
 * @param {string} className - class név, amit a div elemhez szeretnénk rendelni
 * @returns HTMLElement - létrehozott div elem
 */
const makeDiv = (className) => { // egy függvény, ami létrehoz egy div elemet a megadott class névvel
    const div = document.createElement('div');// létrehoz egy új div elemet
    div.className = className; // beállítja a class nevét
    return div; // visszaadja a létrehozott div elemet
}

const containerDiv = makeDiv('container');// létrehoz egy új div elemet a 'container' class névvel
document.body.appendChild(containerDiv); // a body-hoz hozzáadja a létrehozott div elemet
const tableDiv = makeDiv('table'); // létrehoz egy új div elemet a 'table' class névvel

const defaultTable = document.createElement('table'); // létrehoz egy új table elemet
tableDiv.appendChild(defaultTable); // a tableDiv-hez hozzáadja a létrehozott table elemet

const tableHeader = document.createElement('thead'); // létrehoz egy új thead elemet
defaultTable.appendChild(tableHeader); // a defaultTable-hez hozzáadja a létrehozott thead elemet

const fejlecek = ['Szerző', 'Műfaj', 'Cím']; // a táblázat fejlécének nevei
for (const fejlec of fejlecek) { // végigmegy a fejlecek tömbön
    const th = document.createElement('th'); // létrehoz egy új th elemet
    th.innerText = fejlec; // beállítja a th elem szövegét
    tableHeader.appendChild(th); // a tableHeader-hez hozzáadja a létrehozott th elemet
}

const tableBody = document.createElement('tbody'); // létrehoz egy új tbody elemet
defaultTable.appendChild(tableBody); // a defaultTable-hez hozzáadja a létrehozott tbody elemet

const formDiv = makeDiv('form'); // létrehoz egy új div elemet a 'form' class névvel

containerDiv.appendChild(tableDiv); // a containerDiv-hez hozzáadja a tableDiv elemet
containerDiv.appendChild(formDiv); // a containerDiv-hez hozzáadja a formDiv elemet