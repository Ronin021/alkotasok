const sep = document.createElement('hr'); // létrehoz egy új hr elemet
document.body.appendChild(sep); // a body-hoz hozzáadja a létrehozott hr elemet

const ListaOOP = [ // a lista elemei, amik a form elemeket tartalmazzák
    {fieldid: 'szerzo', fieldLabel: 'Szerzo' }, // a lista elemei, amik a form elemeket tartalmazzák
    {fieldid: 'mufaj', fieldLabel: 'Mufaj' }, // a lista elemei, amik a form elemeket tartalmazzák
    {fieldid: 'cim', fieldLabel: 'Cim' } // a lista elemei, amik a form elemeket tartalmazzák
];

const manager = new Manager(); // létrehoz egy új Manager objektumot
const table = new Table('table', manager); // átadja a manager objektumot a Table konstruktorának
const oopForm = new Form('form', ListaOOP, manager); // átadja a manager objektumot a Form konstruktorának
const Uploader = new Uploader('uploader', manager); // átadja a manager objektumot az Uploader konstruktorának