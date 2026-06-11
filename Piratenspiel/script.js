let frame = 0;
let state = 'IDLE';

setInterval(moveCharacter, 100); //Alle 100 Millisek. wiederholen

function moveCharacter() {
    pirate.src = `img/2/2_entity_000_${state}_00${frame}.png`;
    /* ruft das Image auf mit der Variable state und setzt die
    Bilder Nummer auf frame */
    frame++; // frame + 1
 if(frame === 7) {
    frame = 0; // wenn frame = 7, wird es wieder auf 0 gesetzt
 }
}

function setState(newState)/* Der Parameter, also newState bekommt den Wert der
dafuer festgelegt wird z.b. bei onclick*/ {
   frame = 0;
   state = newState; /* Dann wird state zu newState also zum 
   Wert vom newState */
}