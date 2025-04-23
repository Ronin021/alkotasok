class Area{ 
/**
 * @param {HTMLDivElement}
 */
#div; // privát változó, ami tárolja a div elemet

/**
 * @type {Manager}
 */
#manager; // privát változó, ami tárolja a manager objektumot

/**
 * @returns {HTMLDivElement}
 */
get div(){ // getter, ami visszaadja a div elemet
    return this.#div; // visszaadja a privát változót
}

/**
 * @returns {Manager}
 */
get manager(){ // getter, ami visszaadja a manager objektumot
    return this.#manager; // visszaadja a privát változót
}

/**
 * 
 * @param {string} ClassName - class név, amit a div elemhez szeretnénk rendelni 
 * @param {Manager} manager - a manager objektum, ami kezeli az adatokat
 */
constructor(ClassName, manager) { // konstruktor, ami létrehozza az Area objektumot a megadott class névvel
    
    this.#manager = manager; // beállítja a manager objektumot
    const container = this.#getContainerDiv(); // meghívja a getContainerDiv() függvényt, ami létrehozza a containerDiv elemet, ha még nem létezik
    this.#div = document.createElement('div'); // létrehoz egy új div elemet
    this.#div.className = ClassName; // beállítja a class nevét
    container.appendChild(this.#div); // a containerDiv-hez hozzáadja a létrehozott div elemet
}

/**
 * 
 * @returns {HTMLElement} - visszaadja a containerDiv elemet
 */
    #getContainerDiv() { // egy privát függvény, ami létrehozza a containerDiv elemet, ha még nem létezik
    let containsDiv = document.querySelector('.oopcontainer'); // ellenőrzi, hogy létezik-e már ilyen div
    if (!containsDiv) { // ha a body nem tartalmaz div elemet
        const containerDiv = document.createElement('div'); // létrehoz egy új div elemet
        containerDiv.className = 'oopcontainer'; // beállítja a class nevét
        document.body.appendChild(containerDiv); // a body-hoz hozzáadja a létrehozott div elemet
        containsDiv = containerDiv; // frissíti a containsDiv változót az újonnan létrehozott div-re
    }
    return containsDiv; // visszaadja a containerDiv elemet
}



}




class Table extends Area{ // a Table osztály, ami öröklődik az Area osztályból
/**
 * 
 * @param {string} CssClass - class név, amit a table elemhez szeretnénk rendelni 
 * @param {Manager}
 */
    constructor(CssClass, manager){ // konstruktor, ami létrehozza a Table objektumot a megadott class névvel
        super(CssClass, manager); // meghívja az Area osztály konstruktorát

        const tabla = this.#makeTable(); // meghívja a makeTable() függvényt, ami létrehozza a table elemet
    

    this.manager.setaddSzerzoCallback((adatok) => { // beállítja a callback függvényt, ami új adat hozzáadásakor hívódik meg
this.#createRows(tabla, adatok); // meghívja a createRows() függvényt, ami létrehozza a sorokat a táblázatban
    })

    this.manager.setRenderTableCallback((adatokTomb) => {
        // Töröld a teljes táblázatot
        tabla.innerHTML = '';
        // Minden adatból hozz létre sort
        for (const adatok of adatokTomb) {
            this.#createRows(tabla, adatok);
        }
    });
}

#createRows(tabla, adatok){ // egy privát függvény, ami létrehozza a sorokat a táblázatban

    const row = document.createElement('tr'); // létrehoz egy új tr elemet
    tabla.appendChild(row); // a table-hez hozzáadja a létrehozott tr elemet
    const cell1 = document.createElement('td'); // létrehoz egy új td elemet
    cell1.innerText = adatok.szerzo; // beállítja a td elem szövegét
    row.appendChild(cell1); // a row-hoz hozzáadja a létrehozott td elemet

    const cell2 = document.createElement('td'); // létrehoz egy új td elemet
    cell2.innerText = adatok.mufaj; // beállítja a td elem szövegét
    row.appendChild(cell2); // a row-hoz hozzáadja a létrehozott td elemet

    const cell3 = document.createElement('td'); // létrehoz egy új td elemet
    cell3.innerText = adatok.cim; // beállítja a td elem szövegét
    row.appendChild(cell3); // a row-hoz hozzáadja a létrehozott td elemet

}

/**
 * @returns {HTMLElement} - visszaadja a table elemet
 */
    #makeTable(){ // egy privát függvény, ami létrehozza a table elemet
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
        return tableBody; // visszaadja a létrehozott tbody elemet
    }
}

class Form extends Area{ // a Form osztály, ami öröklődik az Area osztályból
/**
 * * @type {FormField[]}
 */
#tombInput; // privát változó, ami tárolja a form elemeket

/**
 * 
 * @param {string} CssClass - class név, amit a form elemhez szeretnénk rendelni 
 * @param {{fieldid: string, fieldLabel: string}[]} Lista - a lista elemei, amik a form elemeket tartalmazzák
 * @param {Manager} manager - a manager objektum, ami kezeli az adatokat
 */
    constructor(CssClass, ListaOOP, manager){ // konstruktor, ami létrehozza a Form objektumot a megadott class névvel
        super(CssClass,  manager); // meghívja az Area osztály konstruktorát

        this.#tombInput = []; // inicializálja a tombInput tömböt üresen

        const form = document.createElement('form'); // létrehoz egy új form elemet
        this.div.appendChild(form); // a div-hez hozzáadja a létrehozott form elemet

        for (const field of ListaOOP) { // végigmegy a lista elemein
            const formField = new FormField(field.fieldid, field.fieldLabel); // létrehoz egy új FormField objektumot
            this.#tombInput.push(formField); // hozzáadja a tombInput tömbhöz
            form.appendChild(formField.getDiv()); // hozzáadja a form-hoz a FormField div-jét
        }

        const button = document.createElement('button'); // létrehoz egy új button elemet
        button.textContent = 'Hozzáadás'; // beállítja a button szövegét
        form.appendChild(button); // hozzáadja a form-hoz

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const ObjectvalueOOP = {}; // létrehoz egy új objektumot
            let validOOP = true;

            for (const errorfield of this.#tombInput) {
                errorfield.error = ''; // törli a hibaüzenetet
                if (errorfield.value === '') {
                    errorfield.error = 'Kötelező mező!';
                    validOOP = false;
                }
                ObjectvalueOOP[errorfield.id] = errorfield.value; // feltölti az objektumot
            }

            if (validOOP) {
                const oopadat = new Adat(ObjectvalueOOP.szerzo, ObjectvalueOOP.mufaj, ObjectvalueOOP.cim);
                this.manager.addSzerzo(oopadat); // hozzáadja az adatot a managerhez
            }
        });
    }
}

class UploaderAndDownloader extends Area{ // a Uploader osztály, ami öröklődik az Area osztályból
/**
 * 
 * @param {string} CssClass - class név, amit a
 * @param {Manager} manager - a manager objektum, ami kezeli az adatokat
 * */
 
    constructor(CssClass, manager){ // konstruktor, ami létrehozza az Uploader objektumot a megadott class névvel
        super(CssClass, manager); // meghívja az Area osztály konstruktorát

        const uploader = document.createElement('input'); // létrehoz egy új input elemet
        uploader.id = 'uploader'; // beállítja az input id attribútumát
        uploader.type = 'file'; // beállítja az input type attribútumát
        this.div.appendChild(uploader); // a div-hez hozzáadja a létrehozott input elemet

        uploader.addEventListener('change', (event) => { // eseménykezelő, ami akkor hívódik meg, amikor a fájl kiválasztásra kerül
            const file = event.target.files[0]; // lekéri az első fájlt a kiválasztott fájlok közül
            const reader = new FileReader(); // létrehoz egy új FileReader objektumot

            reader.onload = () => { // eseménykezelő, ami akkor hívódik meg, amikor a fájl betöltődött
                const fileContent = reader.result.split('\n'); // a fájl tartalmát sorokra bontja
                const withoutheader = fileContent.slice(1); // eltávolítja az első sort (fejléc)
                for (const sor of withoutheader) { // végigmegy a sorokon
                    const cleansor = sor.trim(); // eltávolítja a felesleges szóközöket a sor elejéről és végéről
                    const soradat = cleansor.split(';'); // a sort pontosvesszők mentén bontja fel

                    const adat = new Adat(soradat[0], soradat[1], soradat[2]); // létrehoz egy új Adat objektumot a megadott értékekkel
                    this.manager.addSzerzo(adat); // hozzáadja az új adatot a managerhez
                }
            }
            reader.readAsText(file); // beolvassa a fájlt szövegként
        })

        const downloader = document.createElement('button'); // létrehoz egy új button elemet
        downloader.textContent = 'Letöltés'; // beállítja a button szövegét
        this.div.appendChild(downloader); // a div-hez hozzáadja a létrehozott button elemet

        downloader.addEventListener('click', () => { // eseménykezelő, ami akkor hívódik meg, amikor a gombra kattintanak
            const link = document.createElement('a'); // létrehoz egy új a elemet
            const fileContent = this.manager.generateOutputStringForDownloader(); // lekéri a fájl tartalmát a managerből
            const blob = new Blob([fileContent]); // létrehoz egy új Blob objektumot a fájl tartalmával

            link.href = URL.createObjectURL(blob); // beállítja a link href attribútumát a Blob objektum URL-jére
            link.download = 'adatok.csv'; // beállítja a letöltési fájl nevét
            link.click(); // rákattint a linkre, hogy letöltse a fájlt
            URL.revokeObjectURL(link.href); // visszavonja az URL-t, hogy felszabadítsa a memóriát
        })
    }
}




class FormField{ // a FormField osztály, ami a form elemeket reprezentálja
/**
 * @type {string}
 */
   #id // privát változó, ami tárolja az input id-t

/**
 * @type {HTMLElement}
 * */
   #inputitem; // privát változó, ami tárolja az input elemet

/**
 * @type {HTMLElement}
 * */
   #labelitem // privát változó, ami tárolja a label elemet

/**
 * @type {HTMLElement}
 * */
   #hibaitem; // privát változó, ami tárolja a hiba üzenetet

 /**
  * @returns {string} - visszaadja az input id-t
  */
   get id(){ // getter, ami visszaadja az input id-t
    return this.#id; // visszaadja a privát változót
   }

   /**
    * @returns {string} - visszaadja az input elemet
    */
   get value(){ // getter, ami visszaadja az input elem értékét
    return this.#inputitem.value; // visszaadja az input elem értékét
   }

   set error(value){ // setter, ami beállítja a hiba üzenetet
    this.#hibaitem.textContent = value; // beállítja a hiba üzenetet

   }


   /**
    * 
    * @param {string} id - az input id-ja 
    * @param {string} labelContent - a label szövege
    */
   constructor(id, labelContent){ // konstruktor, ami létrehozza a FormField objektumot a megadott id és labelContent értékekkel
    this.#id = id; // beállítja az input id-t
    this.#inputitem = document.createElement('input'); // létrehoz egy új input elemet
    this.#inputitem.id = id; // beállítja az input id attribútumát


    this.#labelitem = document.createElement('label'); // létrehoz egy új label elemet
    this.#labelitem.htmlFor = id; // beállítja a label htmlFor attribútumát
    this.#labelitem.textContent = labelContent; // beállítja a label szövegét
   
   
    this.#hibaitem = document.createElement('span'); // létrehoz egy új span elemet, ami a hiba üzenetet tartalmazza
    this.#hibaitem.className = 'error'; // beállítja a span class nevét
   }


   getDiv(){ // getter, ami visszaadja a div elemet
    const MadeFieldDiv = makeDiv('field'); // létrehoz egy új div elemet a 'field' class névvel

    const br1 = document.createElement('br'); // létrehoz egy új br elemet
    const br2 = document.createElement('br'); // létrehoz egy új br elemet

    const elemek = [this.#labelitem, br1, this.#inputitem, br2, this.#hibaitem]; // létrehoz egy tömböt, ami tartalmazza a label, input és hiba elemeket
    for (const elem of elemek) { // végigmegy a tömb elemein
        MadeFieldDiv.appendChild(elem); // a fieldDiv-hez hozzáadja a létrehozott elemet
    }
    return MadeFieldDiv; // visszaadja a létrehozott div elemet
}
}