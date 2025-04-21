class Area{ 
constructor(ClassName){ // konstruktor, ami létrehozza az Area objektumot a megadott class névvel

    if(!containsDiv){ // ha a body nem tartalmaz div elemet
        const containerDiv = document.createElement('div'); // létrehoz egy új div elemet
        containerDiv.className = 'oopcontainer'; // beállítja a class nevét
        document.body.appendChild(containerDiv); // a body-hoz hozzáadja a létrehozott div elemet
    }

    const div = document.createElement('div'); // létrehoz egy új div elemet
    div.className = ClassName; // beállítja a class nevét
    containerDiv.appendChild(div); // a containerDiv-hez hozzáadja a létrehozott div elemet
}
}