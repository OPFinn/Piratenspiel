let frame = 0;
let state = 'IDLE';
let left = 100;
let leftArrow = false;
let rightArrow = false;
let attacking = false; // Gibt an, ob der Angriff gerade stattfindet

const enemies = []; //Array
const enemyCount = 3; // Anzahl der enemies

setInterval(moveCharacterAndEnemies, 75); //Alle 75 Millisek. wiederholen
setInterval(updateGame, 13);
document.onkeydown = checkKey; // Wenn gedrückt 
document.onkeyup = unCheckKey; // Wenn losgelassen
createEnemies();

function checkKey(e) {

   e = e || window.event;

   if (e.keyCode == '37') {
      // left arrow
      setState('WALK');
      /* Wenn left arrow gedrückt, dann setState('WALK') */
      leftArrow = true; // Und left Aroow auf true
   }
   else if (e.keyCode == '39') {
      // right arrow
      setState('WALK');
      /* Wenn right arrow gedrückt, dann setState('WALK') */
      rightArrow = true; // Und right Aroow auf true
   }
   else if (e.keyCode == '70') { // 'F' Taste
      startAttack();
   }
}


function startAttack() {
   attacking = true;
 const bullet = document.createElement('img'); // <img>
      bullet.classList.add('bullet'); // <img class="bullet">
      bullet.src = 'img/bullet.png'; /*
      <img class="bullet" src="img/bullet.png"> */
      document.body.appendChild(bullet); // Wird in den body geaddet

}

function unCheckKey(e) {
   e = e || window.event;

   if (e.keyCode == '37') {
      leftArrow = false;
   }
   else if (e.keyCode == '39') {
      rightArrow = false;
   }
}

function updateGame() {
   currentBackground.style.left = `${-left}px`;
   currentBackground2.style.left = `${-(left - 1684)}px`; // Hintendran gesetzt
   currentBackground3.style.left = `${-(left - 1684 * 2)}px`; // Das gleiche wieder

   // Update enemy positions to stay fixed on background
   enemies.forEach(enemy => {
      enemy.initialX -= 0.5; // The enemies move now
      enemy.element.style.left = `${enemy.initialX - left}px`;
      frame: 0
   });

   if (leftArrow && left > 0) {
      left -= 5; // Wenn leftArrow gedrückt, dann left -5
   }
   if (rightArrow && left < 3175) {
      left += 5; // Wenn rightArrow gedrückt, dann left + 5
   }
   if (attacking) {
      setState('ATTACK') // Wenn man angreift, dann setState auf Angriff setzen
   }
   else if (leftArrow || rightArrow)
      setState('WALK'); /* Wenn nicht und right oder left Arrow gedrückt wird, 
   dann setState(Animation) auf WALK setzen */
   else {
      setState('IDLE'); // Sonst setState auf IDLE setzen
   }
}

function moveCharacterAndEnemies() {

   enemies.forEach(enemy => {
      if (enemy.frame < 10) {
         enemy.element.src = `img/Gegner/Minotaur_01/Walking/Minotaur_01_Walking_00${enemy.frame}.png`;
      }
      /* Geht alle Gegner durch und changed den Frame für jeden */
      else {
         enemy.element.src = `img/Gegner/Minotaur_01/Walking/Minotaur_01_Walking_0${enemy.frame}.png`;
      }
      enemy.frame++;
      if (enemy.frame == 17) {
         enemy.frame = 0;
      }
   });

   pirate.src = `img/2/2_entity_000_${state}_00${frame}.png`;
   /* ruft das Image auf mit der Variable state und setzt die
   Bilder Nummer auf frame */
   frame++; // frame + 1
   if (leftArrow) {
      pirate.style.transform = "scalex(-1)"; // Wenn left dann pirate spiegeln
   }
   if (rightArrow) {
      pirate.style.transform = "scalex(1)"; // Wenn dann pirate in normale position
   }
   if (frame === 7) {
      attacking = false; // Wenn alle Frames durchgelaufen sind wird attacking zurückgesetzt
      frame = 0; // wenn frame = 7, wird es wieder auf 0 gesetzt
   }
}

function createEnemies() {
   for (let i = 0; i < enemyCount; i++) // Wird so oft ausgeführt wie enemyCount groß ist
   {
      const enemy = document.createElement('img'); // <img>
      enemy.classList.add('enemy'); // <img class="enemy">
      enemy.src = 'img/Gegner/Minotaur_01/Walking/Minotaur_01_Walking_000.png'; /*
      <img class="enemy" src="img/Gegner/Minotaur_01/Walking/Minotaur_01_Walking_000.png"> */
      document.getElementById('enemiesContainer').appendChild(enemy); // Wird in den Container geaddet

      // Store enemy's position
      enemies.push({
         element: enemy,
         initialX: 500 + i * 300,
         frame: i
      });
   }
}

function setState(newState)/* Der Parameter, also newState bekommt den Wert der
dafür festgelegt wird z.b. in if Anweisungen*/ {
   if (state !== newState) /* Nur ein neuer State wenn er nicht der gleiche ist */
      frame = 0;
   state = newState; /* Dann wird state zu newState also zum 
   Wert vom newState */
}

