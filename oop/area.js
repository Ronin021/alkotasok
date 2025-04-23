/**
 * Area osztály, minden OOP-s komponens alapja.
 */
class Area {
    /**
     * @type {HTMLDivElement}
     * Privát változó, ami tárolja a div elemet.
     */
    #div;

    /**
     * @type {Manager}
     * Privát változó, ami tárolja a manager objektumot.
     */
    #manager;

    /**
     * Visszaadja a div elemet.
     * @returns {HTMLDivElement}
     */
    get div() {
        return this.#div;
    }

    /**
     * Visszaadja a manager objektumot.
     * @returns {Manager}
     */
    get manager() {
        return this.#manager;
    }

    /**
     * Area konstruktor.
     * @param {string} ClassName - class név, amit a div elemhez szeretnénk rendelni
     * @param {Manager} manager - a manager objektum, ami kezeli az adatokat
     */
    constructor(ClassName, manager) {
        this.#manager = manager; // beállítja a manager objektumot
        const container = this.#getContainerDiv(); // lekéri vagy létrehozza a fő container divet
        this.#div = document.createElement('div'); // létrehoz egy új div elemet
        this.#div.className = ClassName; // beállítja a class nevét
        container.appendChild(this.#div); // a containerDiv-hez hozzáadja a létrehozott div elemet
    }

    /**
     * Visszaadja vagy létrehozza a fő OOP container divet.
     * @returns {HTMLElement}
     */
    #getContainerDiv() {
        let containsDiv = document.querySelector('.oopcontainer'); // ellenőrzi, hogy létezik-e már ilyen div
        if (!containsDiv) { // ha nem létezik, létrehozza
            const containerDiv = document.createElement('div');
            containerDiv.className = 'oopcontainer';
            document.body.appendChild(containerDiv);
            containsDiv = containerDiv;
        }
        return containsDiv;
    }
}

/**
 * Table osztály, ami egy OOP-s táblázatot jelenít meg.
 * @extends Area
 */
class Table extends Area {
    /**
     * Table konstruktor.
     * @param {string} CssClass - class név, amit a table elemhez szeretnénk rendelni
     * @param {Manager} manager - a manager objektum, ami kezeli az adatokat
     */
    constructor(CssClass, manager) {
        super(CssClass, manager); // meghívja az Area osztály konstruktorát

        const tabla = this.#makeTable(); // létrehozza a táblázatot (tbody-t ad vissza)

        // Új adat hozzáadásakor csak egy sort ad hozzá
        this.manager.setaddSzerzoCallback(
            /**
             * @param {Adat} adatok - új adat
             */
            (adatok) => {
                this.#createRows(tabla, adatok);
            }
        );

        // Teljes táblázat újrarajzolása (pl. szűrés/rendezés)
        this.manager.setRenderTableCallback(
            /**
             * @param {Adat[]} adatokTomb - az összes adat
             */
            (adatokTomb) => {
                tabla.innerHTML = ''; // törli a táblázatot
                for (const adatok of adatokTomb) {
                    this.#createRows(tabla, adatok); // minden adathoz sort ad
                }
            }
        );
    }

    /**
     * Létrehoz egy sort a táblázatban.
     * @param {HTMLElement} tabla - a táblázat (tbody)
     * @param {Adat} adatok - az adat objektum
     */
    #createRows(tabla, adatok) {
        const row = document.createElement('tr'); // új sor
        tabla.appendChild(row);

        const cell1 = document.createElement('td');
        cell1.innerText = adatok.szerzo;
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.innerText = adatok.mufaj;
        row.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.innerText = adatok.cim;
        row.appendChild(cell3);
    }

    /**
     * Létrehozza a táblázatot, fejlécet és törzset.
     * @returns {HTMLElement} - a táblázat törzse (tbody)
     */
    #makeTable() {
        const table = document.createElement('table'); // új table
        this.div.appendChild(table);

        const tableHeader = document.createElement('thead');
        table.appendChild(tableHeader);

        const tableHeaderRow = document.createElement('tr');
        tableHeader.appendChild(tableHeaderRow);

        const fejlecekneve = ['Szerző', 'Műfaj', 'Cím'];
        for (const fejlec of fejlecekneve) {
            const th = document.createElement('th');
            th.innerText = fejlec;
            tableHeaderRow.appendChild(th);
        }
        const tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
        return tableBody;
    }
}

/**
 * Form osztály, ami egy OOP-s űrlapot jelenít meg.
 * @extends Area
 */
class Form extends Area {
    /**
     * @type {FormField[]}
     * Privát tömb, ami a form mezőket tárolja.
     */
    #tombInput;

    /**
     * Form konstruktor.
     * @param {string} CssClass - class név, amit a form elemhez szeretnénk rendelni
     * @param {{fieldid: string, fieldLabel: string}[]} ListaOOP - a form mezők leírása
     * @param {Manager} manager - a manager objektum, ami kezeli az adatokat
     */
    constructor(CssClass, ListaOOP, manager) {
        super(CssClass, manager);

        this.#tombInput = [];

        const form = document.createElement('form');
        this.div.appendChild(form);

        for (const field of ListaOOP) {
            const formField = new FormField(field.fieldid, field.fieldLabel);
            this.#tombInput.push(formField);
            form.appendChild(formField.getDiv());
        }

        const button = document.createElement('button');
        button.textContent = 'Hozzáadás';
        form.appendChild(button);

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const ObjectvalueOOP = {};
            let validOOP = true;

            for (const errorfield of this.#tombInput) {
                errorfield.error = '';
                if (errorfield.value === '') {
                    errorfield.error = 'Kötelező mező!';
                    validOOP = false;
                }
                ObjectvalueOOP[errorfield.id] = errorfield.value;
            }

            if (validOOP) {
                const oopadat = new Adat(ObjectvalueOOP.szerzo, ObjectvalueOOP.mufaj, ObjectvalueOOP.cim);
                this.manager.addSzerzo(oopadat);
            }
        });
    }
}

/**
 * UploaderAndDownloader osztály, fájl feltöltés és letöltés.
 * @extends Area
 */
class UploaderAndDownloader extends Area {
    /**
     * Konstruktor.
     * @param {string} CssClass - class név, amit a div elemhez szeretnénk rendelni
     * @param {Manager} manager - a manager objektum, ami kezeli az adatokat
     */
    constructor(CssClass, manager) {
        super(CssClass, manager);

        const uploader = document.createElement('input');
        uploader.id = 'uploader';
        uploader.type = 'file';
        this.div.appendChild(uploader);

        uploader.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const fileContent = reader.result.split('\n');
                const withoutheader = fileContent.slice(1);
                for (const sor of withoutheader) {
                    const cleansor = sor.trim();
                    if (!cleansor) continue;
                    const soradat = cleansor.split(';');
                    const adat = new Adat(soradat[0], soradat[1], soradat[2]);
                    this.manager.addSzerzo(adat);
                }
            }
            reader.readAsText(file);
        });

        const downloader = document.createElement('button');
        downloader.textContent = 'Letöltés';
        this.div.appendChild(downloader);

        downloader.addEventListener('click', () => {
            const link = document.createElement('a');
            const fileContent = this.manager.generateOutputStringForDownloader();
            const blob = new Blob([fileContent]);
            link.href = URL.createObjectURL(blob);
            link.download = 'adatok.csv';
            link.click();
            URL.revokeObjectURL(link.href);
        });
    }
}

/**
 * FormField osztály, egyetlen űrlapmező reprezentációja.
 */
class FormField {
    /**
     * @type {string}
     * Privát változó, ami tárolja az input id-t.
     */
    #id;

    /**
     * @type {HTMLElement}
     * Privát változó, ami tárolja az input elemet.
     */
    #inputitem;

    /**
     * @type {HTMLElement}
     * Privát változó, ami tárolja a label elemet.
     */
    #labelitem;

    /**
     * @type {HTMLElement}
     * Privát változó, ami tárolja a hiba üzenetet.
     */
    #hibaitem;

    /**
     * Visszaadja az input id-t.
     * @returns {string}
     */
    get id() {
        return this.#id;
    }

    /**
     * Visszaadja az input értékét.
     * @returns {string}
     */
    get value() {
        return this.#inputitem.value;
    }

    /**
     * Beállítja a hibaüzenetet.
     * @param {string} value - hibaüzenet
     */
    set error(value) {
        this.#hibaitem.textContent = value;
    }

    /**
     * FormField konstruktor.
     * @param {string} id - az input id-ja
     * @param {string} labelContent - a label szövege
     */
    constructor(id, labelContent) {
        this.#id = id;
        this.#inputitem = document.createElement('input');
        this.#inputitem.id = id;

        this.#labelitem = document.createElement('label');
        this.#labelitem.htmlFor = id;
        this.#labelitem.textContent = labelContent;

        this.#hibaitem = document.createElement('span');
        this.#hibaitem.className = 'error';
    }

    /**
     * Visszaadja a mezőhöz tartozó div elemet.
     * @returns {HTMLElement}
     */
    getDiv() {
        const MadeFieldDiv = makeDiv('field');
        const br1 = document.createElement('br');
        const br2 = document.createElement('br');
        const elemek = [this.#labelitem, br1, this.#inputitem, br2, this.#hibaitem];
        for (const elem of elemek) {
            MadeFieldDiv.appendChild(elem);
        }
        return MadeFieldDiv;
    }
}