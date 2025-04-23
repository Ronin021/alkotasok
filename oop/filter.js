class Filter extends Area {
    constructor(Cssclass, manager) {
        super(Cssclass, manager); // A szülő osztály konstruktorának meghívása

        const FilteredForm = document.createElement('form'); // Létrehoz egy új form elemet
        this.div.appendChild(FilteredForm); // Hozzáadja a form elemet a div-hez

        const select = document.createElement('select'); // Létrehoz egy új select elemet
        FilteredForm.appendChild(select); // Hozzáadja a select elemet a form-hoz

        const options = [ // Létrehoz egy új options tömböt
            { value: '', label: 'Üres' }, // Az első opció a szerző
            { value: 'szerzo', label: 'Szerző' }, // Az első opció a szerző
            { value: 'mufaj', label: 'Műfaj' }, // A második opció a műfaj
            { value: 'cim', label: 'Cím' } // A harmadik opció a cím
        ];

        for (const option of options) { // Végigiterálunk az options tömb elemein
            const opt = document.createElement('option'); // Létrehoz egy új option elemet
            opt.value = option.value; // Beállítja az option értékét
            opt.textContent = option.label; // Beállítja az option szövegét
            select.appendChild(opt); // Hozzáadja az option elemet a select-hez
        }
        const button = document.createElement('button'); // Létrehoz egy új button elemet
        button.textContent = 'Szűrés'; // Beállítja a button szövegét
        FilteredForm.appendChild(button); // Hozzáadja a button elemet a form-hoz

        FilteredForm.addEventListener('submit', (event) => { // Hozzáad egy eseményfigyelőt a form-hoz
            event.preventDefault(); // Megakadályozza az alapértelmezett űrlap elküldést

            const selectedValue = select.value; // Lekéri a kiválasztott értéket

            if (selectedValue === '') { // Ha az érték üres
                this.manager.renderBasic(); // Meghívja a renderBasic függvényt
            } else { // Ha az érték nem üres
                this.manager.Order((adat1, adat2) => { // Meghívja az Order függvényt
                    if (adat1[selectedValue].toLowerCase() > adat2[selectedValue].toLowerCase()) { // Ha az adat1 kisebb mint az adat2
                        return true; // Visszaadja az igaz értéket
                    }
                    return false; // Visszaadja a hamis értéket
                });
            }
        });
    }
}


