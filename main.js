const array = [] // egy tömb, ami a könyvek adatait tartalmazza


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

const form = document.createElement('form'); // létrehoz egy új form elemet
formDiv.appendChild(form); // a formDiv-hez hozzáadja a létrehozott form elemet

const Lista = [
    {fieldid: 'szerzo', fieldLabel: 'Szerzo' }, // a lista elemei, amik a form elemeket tartalmazzák
    {fieldid: 'mufaj', fieldLabel: 'Mufaj' }, // a lista elemei, amik a form elemeket tartalmazzák
    {fieldid: 'cim', fieldLabel: 'Cim' } // a lista elemei, amik a form elemeket tartalmazzák
]

for (const field of Lista) { // végigmegy a lista elemein
    
    const fieldDiv = makeDiv('field'); // létrehoz egy új div elemet a 'field' class névvel
    form.appendChild(fieldDiv); // a form-hoz hozzáadja a létrehozott fieldDiv elemet
    
    
    const label = document.createElement('label'); // létrehoz egy új label elemet
    label.htmlFor = field.fieldid; // beállítja a label htmlFor attribútumát
    label.textContent = field.fieldLabel; // beállítja a label szövegét
    fieldDiv.appendChild(label); // a fieldDiv-hez hozzáadja a létrehozott label elemet
    fieldDiv.appendChild(document.createElement('br')); // létrehoz egy új br elemet és hozzáadja a fieldDiv-hez

    const input = document.createElement('input'); // létrehoz egy új input elemet
    input.id = field.fieldid; // beállítja az input id attribútumát
    fieldDiv.appendChild(document.createElement('br')); // létrehoz egy új br elemet és hozzáadja a fieldDiv-hez
    fieldDiv.appendChild(input); // a fieldDiv-hez hozzáadja a létrehozott input elemet

    fieldDiv.appendChild(document.createElement('br')); // létrehoz egy új br elemet és hozzáadja a fieldDiv-hez
 const error = document.createElement('span'); // létrehoz egy új span elemet
 error.className = 'error'; // beállítja a span class nevét
 fieldDiv.appendChild(error); // a fieldDiv-hez hozzáadja a létrehozott span elemet


}

const submitButton = document.createElement('button'); // létrehoz egy új button elemet
submitButton.textContent = 'Hozzaadas'; // beállítja a button szövegét
form.appendChild(submitButton); // a form-hoz hozzáadja a létrehozott button elemet

form.addEventListener('submit', (event) => { // eseménykezelő, ami akkor fut le, amikor a formot elküldik
    event.preventDefault(); // megakadályozza az alapértelmezett form elküldést
    const Objectvalue = {}; // létrehoz egy új objektumot, ami a form adatait tartalmazza
    let valid = true; // egy változó, ami azt jelzi, hogy az űrlap érvényes-e
   
   
   
   
    const bemenet = event.target.querySelectorAll('input'); // lekéri az összes input elemet a formból
    for (const input of bemenet) { // végigmegy az input elemek tömbjén
        const error = input.parentElement.querySelector('.error'); // lekéri a span elemet, ami az inputhoz tartozik
        if(!error){ // ha nincs error elem
            console.error('Nincs error elem'); // hibaüzenet a konzolra
return; // kilép a függvényből
    }


    error.textContent = ''; // törli az error üzenetet

    if (input.value === '') { // ha az input értéke üres
        error.textContent = 'Kötelező mező'; // beállítja az error üzenetet
        valid = false; // az űrlap nem érvényes

    }
    Objectvalue[input.id] = input.value; // beállítja az objektum mezőit az input elemek értékeivel
    }

    if (!valid) { // ha az űrlap nem érvényes
    

    


    array.push(Objectvalue); // hozzáadja az objektumot a tömbhöz

    const tableRow = document.createElement('tr'); // létrehoz egy új tr elemet
    tableBody.appendChild(tableRow); // a tableBody-hoz hozzáadja a létrehozott tr elemet

    const szerzoTd = document.createElement('td'); // létrehoz egy új td elemet
    szerzoTd.innerText = Objectvalue.szerzo; // beállítja a td elem szövegét
    tableRow.appendChild(szerzoTd); // a tableRow-hoz hozzáadja a létrehozott td elemet

    const mufajTd = document.createElement('td'); // létrehoz egy új td elemet
    mufajTd.innerText = Objectvalue.mufaj; // beállítja a td elem szövegét
    tableRow.appendChild(mufajTd); // a tableRow-hoz hozzáadja a létrehozott td elemet

    const cimTd = document.createElement('td'); // létrehoz egy új td elemet
    cimTd.innerText = Objectvalue.cim; // beállítja a td elem szövegét
    tableRow.appendChild(cimTd); // a tableRow-hoz hozzáadja a létrehozott td elemet
}

})



containerDiv.appendChild(tableDiv); // a containerDiv-hez hozzáadja a tableDiv elemet
containerDiv.appendChild(formDiv); // a containerDiv-hez hozzáadja a formDiv elemet