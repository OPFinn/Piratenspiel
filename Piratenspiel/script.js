let frame = 0;
let state = 'IDLE';
let left = 100;

setInterval(moveCharacter, 75); //Alle 75 Millisek. wiederholen
setInterval(updateBackground, 13); 
document.onkeydown = checkKey;

function checkKey(e) {

   e = e || window.event;

   if (e.keyCode == '37') {
      // left arrow
      setState('WALK');
      /* Wenn left arrow gedrückt, dann setState('WALK') */
      left -= 5; // setz left 5 px niedriger
   }
   else if (e.keyCode == '39') {
      // right arrow
      setState('WALK');
      /* Wenn right arrow gedrückt, dann setState('WALK') */
      left += 5; // setzt left 5 px höher
   }
}

function updateBackground() {
   currentBackground.style.objectPosition = `${-left}px`; /* lässt den Hintergrund
   mit left verschieben */
}

function moveCharacter() {
   pirate.src = `img/2/2_entity_000_${state}_00${frame}.png`;
   /* ruft das Image auf mit der Variable state und setzt die
   Bilder Nummer auf frame */
   frame++; // frame + 1
   if (frame === 7) {
      frame = 0; // wenn frame = 7, wird es wieder auf 0 gesetzt
   }
}

function setState(newState)/* Der Parameter, also newState bekommt den Wert der
dafuer festgelegt wird z.b. bei onclick*/ {
   if (state !== newState) /* Nur ein neuer State wenn er nicht der gleiche ist */
      frame = 0;
   state = newState; /* Dann wird state zu newState also zum 
   Wert vom newState */
}

