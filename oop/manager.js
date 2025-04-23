class Manager { // A Manager osztály az adatokat kezeli

    /**
     * @type {Adat[]} 
     * Egy privát tömb, amely az Adat típusú objektumokat tárolja
     */
    #array;

    /**
     * @type {Function} 
     * Egy privát callback függvény, amelyet új adat hozzáadásakor hívunk meg
     */
    #addSzerzoCallback;

    /**
     * Konstruktor, amely inicializálja a Manager osztályt
     * A privát tömböt üresen inicializálja
     */
    constructor() {
        this.#array = []; // Inicializáljuk a privát tömböt üresen
    }

    /**
     * Beállítja a callback függvényt, amelyet kívülről adunk meg
     * @param {Function} callback - A callback függvény, amelyet új adat hozzáadásakor hívunk meg
     */
    setaddSzerzoCallback(callback) {
        this.#addSzerzoCallback = callback; // Eltároljuk a megadott callback függvényt a privát változóban
    }

    /**
     * Új adatot ad a privát tömbhöz, majd meghívja a callback függvényt
     * @param {Adat} szerzo - Az új adat, amelyet hozzáadunk a listához
     */
    addSzerzo(szerzo) {
        this.#array.push(szerzo); // Hozzáadjuk az új adatot a privát tömbhöz
        this.#addSzerzoCallback(szerzo); // Meghívjuk a callback függvényt az új adattal
    }

    generateOutputStringForDownloader() {
        const contentTombManager = ['Szerző', 'Műfaj', 'Cím']; // A fejléc elemei

        for(const szerzo of this.#array) { // Végigiterálunk a privát tömb elemein
            contentTombManager.push(`${szerzo.szerzo};${szerzo.mufaj};${szerzo.cim}`); // Hozzáadjuk a szerző nevét a fejléc tömbhöz
                }
                return contentTombManager.join('\n'); // Visszaadjuk a fejléc tömböt, amelyet új sorral választunk el
            }
    }