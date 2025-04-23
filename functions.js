/**
 * Létrehoz egy div elemet a megadott osztálynévvel.
 * @param {string} className - A div elem osztályneve.
 * @returns {HTMLElement} - A létrehozott div elem.
 */
function makeDiv(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
}

/**
 * Inicializálja a `container` elemet, ha nem létezik.
 * @returns {HTMLElement} - A `container` elem.
 */
function initializeContainer() {
    let containerDiv = document.getElementById('container'); // Ellenőrzi, hogy létezik-e a container elem
    if (!containerDiv) {
        // Ha nem létezik, létrehozza
        containerDiv = makeDiv('container');
        containerDiv.id = 'container';
        document.body.appendChild(containerDiv); // Hozzáadja a dokumentum törzséhez
    }
    return containerDiv;
}

/**
 * Létrehozza a táblázatot a megadott konténerben.
 * @param {HTMLElement} container - A konténer elem, amelyhez a táblázatot hozzáadjuk.
 * @param {function(HTMLElement): void} callback - Egy callback függvény, amely a táblázat törzsével dolgozik.
 */
function tablaKrealas(container, callback) {
    const tableDiv = makeDiv('table'); // létrehoz egy új div elemet a 'table' class névvel
    container.appendChild(tableDiv); // a container-hez hozzáadja a tableDiv elemet

    const defaultTable = document.createElement('table'); // létrehoz egy új table elemet
    tableDiv.appendChild(defaultTable); // a tableDiv-hez hozzáadja a létrehozott table elemet

    const tableHeader = document.createElement('thead'); // létrehozza a táblázat fejlécét
    defaultTable.appendChild(tableHeader);

    const fejlecek = ['Szerző', 'Műfaj', 'Cím']; // a táblázat fejlécének nevei
    for (const fejlec of fejlecek) {
        const th = document.createElement('th');
        th.innerText = fejlec;
        tableHeader.appendChild(th);
    }

    const tableBody = document.createElement('tbody'); // létrehozza a táblázat törzsét
    defaultTable.appendChild(tableBody);

    callback(tableBody); // meghívja a callback függvényt a táblázat törzsével
}

/**
 * Létrehoz egy űrlapot a megadott táblázathoz és konténerhez.
 * @param {HTMLElement} tableBody - A táblázat törzse.
 * @param {HTMLElement} container - A konténer elem.
 * @param {array[]} array - A könyvek adatait tartalmazó tömb.
 */
function createForm(tableBody, container, array) {
    const formDiv = makeDiv('form');
    container.appendChild(formDiv);

    const form = document.createElement('form');
    formDiv.appendChild(form);

    const fields = [
        { fieldid: 'szerzo', fieldLabel: 'Szerzo' },
        { fieldid: 'mufaj', fieldLabel: 'Mufaj' },
        { fieldid: 'cim', fieldLabel: 'Cim' }
    ];

    for (const field of fields) {
        const fieldDiv = makeDiv('field');
        form.appendChild(fieldDiv);

        const label = document.createElement('label');
        label.htmlFor = field.fieldid;
        label.textContent = field.fieldLabel;
        fieldDiv.appendChild(label);

        const input = document.createElement('input');
        input.id = field.fieldid;
        fieldDiv.appendChild(input);

        const error = document.createElement('span');
        error.className = 'error';
        fieldDiv.appendChild(error);
    }

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Hozzaadas';
    form.appendChild(submitButton);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const Objectvalue = {};
        let valid = true;

        const inputs = event.target.querySelectorAll('input');
        for (const input of inputs) {
            const error = input.parentElement.querySelector('.error');
            error.textContent = '';

            if (input.value === '') {
                error.textContent = 'Kötelező mező';
                valid = false;
            }
            Objectvalue[input.id] = input.value;
        }

        if (!valid) return;

        array.push(Objectvalue);

        const tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow);

        for (const key of ['szerzo', 'mufaj', 'cim']) {
            const td = document.createElement('td');
            td.innerText = Objectvalue[key];
            tableRow.appendChild(td);
        }
    });
}

/**
 * Létrehoz egy fájlfeltöltő funkciót.
 * @param {HTMLElement} tableBody - A táblázat törzse.
 * @param {HTMLElement} container - A konténer elem.
 * @param {array[]} array - A könyvek adatait tartalmazó tömb.
 */
function createFileUploader(tableBody, container, array) {
    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    container.appendChild(uploadInput);

    uploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const rows = reader.result.split('\n').slice(1);
            for (const row of rows) {
                const [szerzo, mufaj, cim] = row.trim().split(';');
                const rowData = { szerzo, mufaj, cim };
                array.push(rowData);

                const tableRow = document.createElement('tr');
                tableBody.appendChild(tableRow);

                for (const key of ['szerzo', 'mufaj', 'cim']) {
                    const td = document.createElement('td');
                    td.innerText = rowData[key];
                    tableRow.appendChild(td);
                }
            }
        };

        reader.readAsText(file);
    });
}

/**
 * Hozzáad egy fájl letöltési funkciót.
 * @param {HTMLElement} container - A konténer elem.
 * @param {array[]} array - A könyvek adatait tartalmazó tömb.
 */
function fajlLetoltes(container, array) {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Letoltes';
    container.appendChild(downloadButton);

    downloadButton.addEventListener('click', () => {
        const contentTomb = ['szerző;műfaj;cím'];
        for (const row of array) {
            contentTomb.push(`${row.szerzo};${row.mufaj};${row.cim}`);
        }

        const content = contentTomb.join('\n');
        const blob = new Blob([content]);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'letoltes.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    });
}

/**
 * Hozzáad egy sort a táblázat törzséhez.
 * @param {Object} rowData - Az adat, amelyet hozzáadunk a táblázathoz.
 * @param {HTMLElement} tableBody - A táblázat törzse, amelyhez a sort hozzáadjuk.
 */
function addRow(rowData, tableBody) {
    const tableRow = document.createElement('tr'); // Létrehoz egy új tr elemet
    tableBody.appendChild(tableRow); // A táblázat törzséhez hozzáadja a sort

    for (const key of ['szerzo', 'mufaj', 'cim']) { // Végigiterál az adat kulcsain
        const td = document.createElement('td'); // Létrehoz egy új td elemet
        td.innerText = rowData[key]; // Beállítja a td elem szövegét
        tableRow.appendChild(td); // A sorhoz hozzáadja a cellát
    }
}

const szuresSima = (containerDiv, array, tableBody) => {

    const szurtDivForm = makeDiv('szurtDivForForm'); // létrehoz egy új div elemet a 'szurtDivForForm' class névvel
    containerDiv.appendChild(szurtDivForm); // a containerDiv-hez hozzáadja a szurtDivForm elemet

    const szurtForm = document.createElement('form'); // létrehoz egy új form elemet
    szurtDivForm.appendChild(szurtForm); // a szurtDivForm-hoz hozzáadja a szurtForm elemet

    const select = document.createElement('select'); // létrehoz egy új select elemet
    szurtForm.appendChild(select); // a szurtForm-hoz hozzáadja a select elemet

    const options = [
        { value: '', label: 'Üres' },
        { value: 'szerzo', label: 'Szerző' },
        { value: 'mufaj', label: 'Műfaj' },
        { value: 'cim', label: 'Cím' } // a select elemhez hozzáadja az opciókat
    ];

    for (const option of options) { // végigiterál az opciókon
        const opt = document.createElement('option'); // létrehoz egy új option elemet
        opt.value = option.value; // beállítja az option értékét
        opt.textContent = option.label; // beállítja az option szövegét
        select.appendChild(opt); // a select elemhez hozzáadja az option elemet
    }

    const szurtButton = document.createElement('button'); // létrehoz egy új button elemet
    szurtButton.textContent = 'Szűrés'; // beállítja a button szövegét
    szurtForm.appendChild(szurtButton); // a szurtForm-hoz hozzáadja a button elemet

    szurtForm.addEventListener('submit', (event) => { // eseménykezelő a form submit eseményére
        event.preventDefault(); // megakadályozza az alapértelmezett űrlap elküldést
        const selectedValue = select.value; // lekéri a kiválasztott értéket a select elemből

        const orderedArray = [...array]; // lekéri a manager objektumból az adatokat

        if (selectedValue === '') { // ha a kiválasztott érték üres
            tableBody.innerHTML = ''; // törli a táblázat törzsét
            for (const szerzo of orderedArray) { // végigiterál az adatokat tartalmazó tömbön
                addRow(szerzo, tableBody); // hozzáadja az adatokat a táblázathoz
            }
        }else { // ha a kiválasztott érték nem üres
            const order = orderedArray.length; // lekéri a tömb hosszát

            for (let i = 0; i < order; i++) { // végigiterál a tömb elemein
                for (let j = i + 1; j < order; j++) { // végigiterál a tömb elemein
                    if (orderedArray[i][selectedValue] > orderedArray[j][selectedValue]) { // ha az i-edik elem nagyobb mint a j-edik elem
                        const temp = orderedArray[i]; // eltárolja az i-edik elemet egy ideiglenes változóban
                        orderedArray[i] = orderedArray[j]; // az i-edik elemet a j-edik elemre cseréli
                        orderedArray[j] = temp; // a j-edik elemet az ideiglenes változóra cseréli
                    }
                }
            }
            tableBody.innerHTML = ''; // törli a táblázat törzsét
            for (const szerzo of orderedArray) { // végigiterál az adatokat tartalmazó tömbön
                addRow(szerzo, tableBody); // hozzáadja az adatokat a táblázathoz
            }
        }
    })
}




