const makeDiv = (className) => { // egy függvény, ami létrehoz egy div elemet a megadott class névvel
    const div = document.createElement('div');// létrehoz egy új div elemet
    div.className = className; // beállítja a class nevét
    return div; // visszaadja a létrehozott div elemet
}

const containerDiv = makeDiv('container');// létrehoz egy új div elemet a 'container' class névvel
document.body.appendChild(containerDiv); // a body-hoz hozzáadja a létrehozott div elemet
const tableDiv = makeDiv('table'); // létrehoz egy új div elemet a 'table' class névvel

const formDiv = makeDiv('form'); // létrehoz egy új div elemet a 'form' class névvel

containerDiv.appendChild(tableDiv); // a containerDiv-hez hozzáadja a tableDiv elemet
containerDiv.appendChild(formDiv); // a containerDiv-hez hozzáadja a formDiv elemet