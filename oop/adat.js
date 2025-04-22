class Adat { // Egy Adat nevű osztályt definiálunk, amely egy adatbejegyzést reprezentál

    /**
     * @type {string}
     * Privát változó, amely a szerző nevét tárolja
     */
    #szerzo;

    /**
     * @type {string}
     * Privát változó, amely a műfajt tárolja
     */
    #mufaj;

    /**
     * @type {string}
     * Privát változó, amely a címet tárolja
     */
    #cim;

    /**
     * Getter a szerző mezőhöz
     * @returns {string} - A szerző neve
     */
    get szerzo() { 
        return this.#szerzo; // Visszaadja a privát szerző értékét
    }

    /**
     * Getter a műfaj mezőhöz
     * @returns {string} - A műfaj
     */
    get mufaj() { 
        return this.#mufaj; // Visszaadja a privát műfaj értékét
    }

    /**
     * Getter a cím mezőhöz
     * @returns {string} - A cím
     */
    get cim() { 
        return this.#cim; // Visszaadja a privát cím értékét
    }

    /**
     * Konstruktor, amely inicializálja az Adat osztályt
     * @param {string} szerzo - A szerző neve
     * @param {string} mufaj - A műfaj
     * @param {string} cim - A cím
     */
    constructor(szerzo, mufaj, cim) { 
        this.#szerzo = szerzo; // Beállítja a privát szerző értékét
        this.#mufaj = mufaj; // Beállítja a privát műfaj értékét
        this.#cim = cim; // Beállítja a privát cím értékét
    }
}