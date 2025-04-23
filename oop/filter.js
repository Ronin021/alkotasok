/**
 * Filter osztály, szűrési lehetőséget ad az OOP táblázathoz.
 * @extends Area
 */
class Filter extends Area {
    /**
     * Filter konstruktor.
     * @param {string} Cssclass - class név, amit a filter elemhez szeretnénk rendelni
     * @param {Manager} manager - a manager objektum, ami kezeli az adatokat
     */
    constructor(Cssclass, manager) {
        super(Cssclass, manager);

        const FilteredForm = document.createElement('form');
        this.div.appendChild(FilteredForm);

        const select = document.createElement('select');
        FilteredForm.appendChild(select);

        const options = [
            { value: '', label: 'Üres' },
            { value: 'szerzo', label: 'Szerző' },
            { value: 'mufaj', label: 'Műfaj' },
            { value: 'cim', label: 'Cím' }
        ];

        for (const option of options) {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            select.appendChild(opt);
        }

        const button = document.createElement('button');
        button.textContent = 'Szűrés';
        FilteredForm.appendChild(button);

        FilteredForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const selectedValue = select.value;
            if (selectedValue === '') {
                this.manager.renderBasic();
            } else {
                this.manager.Order((adat1, adat2) => {
                    if (
                        adat1[selectedValue] &&
                        adat2[selectedValue] &&
                        adat1[selectedValue].toLowerCase() > adat2[selectedValue].toLowerCase()
                    ) {
                        return true;
                    }
                    return false;
                });
            }
        });
    }
}


