/**
 * Adat osztály, egy alkotás adatait tárolja.
 */
class Adat {
    /**
     * @param {string} szerzo - Az alkotás szerzője
     * @param {string} mufaj - Az alkotás műfaja
     * @param {string} cim - Az alkotás címe
     */
    constructor(szerzo, mufaj, cim) {
        this.szerzo = szerzo; // szerző neve
        this.mufaj = mufaj;   // műfaj neve
        this.cim = cim;       // cím
    }
}