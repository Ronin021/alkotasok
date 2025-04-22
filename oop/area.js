class Area{ 
/**
 * @param {HTMLDivElement}
 */
#div; // privát változó, ami tárolja a div elemet

/**
 * @returns {HTMLDivElement}
 */
get div(){ // getter, ami visszaadja a div elemet
    return this.#div; // visszaadja a privát változót
}

/**
 * 
 * @param {string} ClassName - class név, amit a div elemhez szeretnénk rendelni 
 */
constructor(ClassName) { // konstruktor, ami létrehozza az Area objektumot a megadott class névvel
    const containsDiv = document.querySelector('.oopcontainer'); // ellenőrzi, hogy létezik-e már ilyen div

    if (!containsDiv) { // ha a body nem tartalmaz div elemet
        const containerDiv = document.createElement('div'); // létrehoz egy új div elemet
        containerDiv.className = 'oopcontainer'; // beállítja a class nevét
        document.body.appendChild(containerDiv); // a body-hoz hozzáadja a létrehozott div elemet
    }

    this.#div = document.createElement('div'); // létrehoz egy új div elemet
    this.#div.className = ClassName; // beállítja a class nevét
    document.querySelector('.oopcontainer').appendChild(this.#div); // a containerDiv-hez hozzáadja a létrehozott div elemet    
}


}

class Table extends Area{ // a Table osztály, ami öröklődik az Area osztályból
/**
 * 
 * @param {string} CssClass - class név, amit a table elemhez szeretnénk rendelni 
 */
    constructor(CssClass){ // konstruktor, ami létrehozza a Table objektumot a megadott class névvel
        super(CssClass); // meghívja az Area osztály konstruktorát

        const table = document.createElement('table'); // létrehoz egy új table elemet
        this.div.appendChild(table); // a div-hez hozzáadja a létrehozott table elemet

        const tableHeader = document.createElement('thead'); // létrehoz egy új thead elemet
        table.appendChild(tableHeader); // a table-hez hozzáadja a létrehozott thead elemet

        const tableHeaderRow = document.createElement('tr'); // létrehoz egy új tr elemet
        tableHeader.appendChild(tableHeaderRow); // a tableHeader-hez hozzáadja a létrehozott tr elemet

        const fejlecekneve = ['Szerző', 'Műfaj', 'Cím']; // a táblázat fejlécének nevei
        for (const fejlec of fejlecekneve) { // végigmegy a fejlecek tömbön
            const th = document.createElement('th'); // létrehoz egy új th elemet
            th.innerText = fejlec; // beállítja a th elem szövegét
            tableHeaderRow.appendChild(th); // a tableHeaderRow-hoz hozzáadja a létrehozott th elemet
        }
        const tableBody = document.createElement('tbody'); // létrehoz egy új tbody elemet
        table.appendChild(tableBody); // a table-hez hozzáadja a létrehozott tbody elemet
    }
}

class Form extends Area{ // a Form osztály, ami öröklődik az Area osztályból
/**
 * 
 * @param {string} CssClass - class név, amit a form elemhez szeretnénk rendelni 
 */
    constructor(CssClass){ // konstruktor, ami létrehozza a Form objektumot a megadott class névvel
        super(CssClass); // meghívja az Area osztály konstruktorát

        const form = document.createElement('form'); // létrehoz egy új form elemet
        this.div.appendChild(form); // a div-hez hozzáadja a létrehozott form elemet

        const Lista = [ // a lista elemei, amik a form elemeket tartalmazzák
            {fieldid: 'szerzo', fieldLabel: 'Szerzo' }, // a lista elemei, amik a form elemeket tartalmazzák
            {fieldid: 'mufaj', fieldLabel: 'Mufaj' }, // a lista elemei, amik a form elemeket tartalmazzák
            {fieldid: 'cim', fieldLabel: 'Cim' } // a lista elemei, amik a form elemeket tartalmazzák
        ]

        for (const field of Lista) { // végigmegy a lista elemein
            
            const fieldDiv = document.createElement('div'); // létrehoz egy új div elemet
            form.appendChild(fieldDiv); // a form-hoz hozzáadja a létrehozott fieldDiv elemet

            const label = document.createElement('label'); // létrehoz egy új label elemet
            label.htmlFor = field.fieldid; // beállítja a label htmlFor attribútumát
            label.textContent = field.fieldLabel; // beállítja a label szövegét
            fieldDiv.appendChild(label); // a fieldDiv-hez hozzáadja a létrehozott label elemet

            const input = document.createElement('input'); // létrehoz egy új input elemet
            input.id = field.fieldid; // beállítja az input id attribútumát
            fieldDiv.appendChild(document.createElement('br')); // létrehoz egy új br elemet és hozzáadja a fieldDiv-hez
            fieldDiv.appendChild(input); // a fieldDiv-hez hozzáadja a létrehozott input elemet
        }
        const button = document.createElement('button'); // létrehoz egy új button elemet
        button.textContent = 'Hozzáadás'; // beállítja a button szövegét
        form.appendChild(button); // a form-hoz hozzáadja a létrehozott button elemet
    }
}