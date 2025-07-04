/**
 * @callback renderTableCallback
 * @param {Adat[]} 
 * @returns {void}
 */
/**
 * @callback addSzerzoCallback
 * @param {Adat} 
 * @returns {void}
 */
/**
 * @callback sorrend
 * @param {Adat} adat1 
 * @param {Adat} adat2
 * @returns {boolean}
 */
class Manager { // A Manager osztály az adatokat kezeli

    /**
     * @type {Adat[]} 
     * Egy privát tömb, amely az Adat típusú objektumokat tárolja
     */
    #array;

    /**
     * @type {addSzerzoCallback} 
     * Egy privát callback függvény, amelyet új adat hozzáadásakor hívunk meg
     */
    #addSzerzoCallback;

    /**
     * @type {renderTableCallback}
     * Egy privát callback függvény, amelyet a táblázat újrarenderelésére használunk
     */
    #renderTableCallback; // Egy privát callback függvény, amelyet a táblázat újrarenderelésére használunk

    /**
     * Konstruktor, amely inicializálja a Manager osztályt
     * A privát tömböt üresen inicializálja
     */
    constructor() {
        this.#array = []; // Inicializáljuk a privát tömböt üresen
    }

    /**
     * Beállítja a callback függvényt, amelyet kívülről adunk meg
     * @param {addSzerzoCallback} callback - A callback függvény, amelyet új adat hozzáadásakor hívunk meg
     */
    setaddSzerzoCallback(callback) {
        this.#addSzerzoCallback = callback; // Eltároljuk a megadott callback függvényt a privát változóban
    }


    /**
     * 
     * @param {renderTableCallback} callback - A callback függvény, amelyet a táblázat újrarenderelésére használunk 
     */
    setRenderTableCallback(callback) {
        this.#renderTableCallback = callback; // Eltároljuk a megadott callback függvényt a privát változóban
    }

    /**
     * Új adatot ad a privát tömbhöz, majd meghívja a callback függvényt
     * @param {Adat} szerzo - Az új adat, amelyet hozzáadunk a listához
     */
    addSzerzo(szerzo) {
        this.#array.push(szerzo); // Hozzáadjuk az új adatot a privát tömbhöz
        this.#addSzerzoCallback(szerzo); // Meghívjuk a callback függvényt az új adattal
    }

    /**
     * 
     * @returns {string} - Visszaadja a privát tömb elemeit egy string formájában, amelyet a fájl letöltésére használunk
     * A fájl tartalmazza a fejlécet és az adatokat, amelyeket pontosvesszővel választunk el
     */
    generateOutputStringForDownloader() {
        const contentTombManager = ['Szerző', 'Műfaj', 'Cím']; // A fejléc elemei

        for(const szerzo of this.#array) { // Végigiterálunk a privát tömb elemein
            contentTombManager.push(`${szerzo.szerzo};${szerzo.mufaj};${szerzo.cim}`); // Hozzáadjuk a szerző nevét a fejléc tömbhöz
                }
                return contentTombManager.join('\n'); // Visszaadjuk a fejléc tömböt, amelyet új sorral választunk el
            }
    

    /**
     * @param {sorrend} sorrend - A callback függvény, amelyet a szűréshez használunk
     * @returns {Adat[]} - Visszaadja a szűrt tömböt, amely az Adat típusú objektumokat tartalmazza
     */
    Order(sorrend) { // Szűrjük a privát tömböt a megadott callback függvény alapján
        const ordered = [] // Létrehozunk egy új tömböt a szűrt elemek tárolására
        for (const i of this.#array) { // Végigiterálunk a privát tömb elemein
            ordered.push(i); // Hozzáadjuk az elemet a szűrt tömbhöz
        }
      for (let i = 0; i < ordered.length; i++) { // Végigiterálunk a szűrt tömb elemein
        for (let j =0; j < ordered.length- i - 1; j++) { // Végigiterálunk a szűrt tömb elemein
            if (sorrend(ordered[j], ordered[j+1])) { // Ha a callback függvény igazat ad vissza az adott elemre
                const temp = ordered[j]; // Létrehozunk egy ideiglenes változót
                ordered[j] = ordered[j+1]; // Kicseréljük az elemeket
                ordered[j+1] = temp; // Kicseréljük az elemeket
            }
        }
    }
    this.#renderTableCallback(ordered); // Meghívjuk a renderelő callback függvényt a szűrt tömbbel
    }

    /**
     * @returns {void} - Visszaadja a privát tömböt
     */
    renderBasic(){ // Újrarendereli a táblázatot a privát tömb adataival
        this.#renderTableCallback(this.#array); // Meghívjuk a renderelő callback függvényt a privát tömbbel
    }
}