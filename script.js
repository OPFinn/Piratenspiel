let frame = 0;
let state = 'IDLE';
let left = 100;
let leftArrow = false;
let rightArrow = false;
let attacking = false; // Gibt an, ob der Angriff gerade stattfindet

const enemies = []; //Array 
const enemyCount = 10; // Anzahl der enemies
const bullets = []; //Array 

setInterval(moveCharacterAndEnemies, 75); //Alle 75 Millisek. wiederholen
setInterval(updateGame, 13);
setInterval(checkCollisions, 13);
setInterval(checkCharacterCollision, 13);
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
      rightArrow = true; // Und right Arrow auf true
   }
   else if (e.keyCode == '70') { // 'F' Taste
      startAttack();
   }
}


function startAttack() {
   attacking = true;

   setTimeout(function () {
      const bullet = document.createElement('img'); // <img>
      bullet.classList.add('bullet'); // <img class="bullet">
      bullet.src = 'img/bullet.png'; /*
      <img class="bullet" src="img/bullet.png"> */
      document.body.appendChild(bullet); // Wird in den body geaddet

      bullets.push({
         element: bullet,
         initialX: 370
      });
   }, 220)

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
   if (state !== 'DIE') {
      currentBackground.style.left = `${-left}px`;
      currentBackground2.style.left = `${-(left - 1684)}px`; // Hintendran gesetzt
      currentBackground3.style.left = `${-(left - 1684 * 2)}px`; // Das gleiche wieder

      // Update the enemy positions 
      enemies.forEach(enemy => {
         if (!enemy.hit) { // Wenn nicht getroffen dann
            enemy.initialX -= 0.5; // The enemies move now
         }
         enemy.element.style.left = `${enemy.initialX - left}px`;
         frame: 0
      });

      // Update the bullet positions 
      bullets.forEach(bullet => {
         bullet.initialX += 15; // The bullets move now
         bullet.element.style.left = `${bullet.initialX}px`;
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
}

function moveCharacterAndEnemies() {
   if (state !== 'DIE') {
      updateEnemies();
   }

   if (state === 'DIE' && frame < 7) { // Führe die Sterbeanimation einmal aus
      pirate.src = `img/2/2_entity_000_DIE_00${frame}.png`;
      frame++;
   } else if (state !== 'DIE') { // Andere Zustände
      pirate.src = `img/2/2_entity_000_${state}_00${frame}.png`;
      frame++;
      if (leftArrow) {
         pirate.style.transform = "scaleX(-1)";
      }

      if (rightArrow) {
         pirate.style.transform = "scaleX(1)";
      }

      if (frame == 7) {
         attacking = false;
         frame = 0;
      }
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
         initialX: 1000 + i * 300,
         frame: i
      });
   }
}

function checkCollisions() {
   enemies.forEach(enemy => {
      if (!enemy.hit) { // Nur ungetroffene Gegner prüfen
         bullets.forEach((bullet, bulletIndex) => {
            const bulletRect = bullet.element.getBoundingClientRect();
            const enemyRect = enemy.element.getBoundingClientRect();

            // Kollision überprüfen
            if (
               bulletRect.left < enemyRect.right &&
               bulletRect.right > enemyRect.left &&
               bulletRect.top < enemyRect.bottom &&
               bulletRect.bottom > enemyRect.top
            ) {
               // Treffer
               enemy.hit = true; // Gegner als getroffen markieren
               enemy.frame = 5; // Animation von vorne beginnen 

               // Kugel entfernen
               bullet.element.remove(); // Entferne das Kugel-Element aus dem DOM
               bullets.splice(bulletIndex, 1); // Entferne die Kugel aus dem Array
            }
         });
      }
   });
}

function updateEnemies() {
   enemies.forEach(enemy => {
      if (enemy.hit) {
         // Dying Animation
         if (enemy.frame < 10) {
            enemy.element.src = `img/Gegner/Minotaur_01/Dying/Minotaur_01_Dying_00${enemy.frame}.png`;
         } else {
            enemy.element.src = `img/Gegner/Minotaur_01/Dying/Minotaur_01_Dying_0${enemy.frame}.png`;
         }
         enemy.frame++;
         // Dying Animation endet bei Frame 14
         if (enemy.frame > 14) {
            enemy.frame = 14; // Bleibt auf dem letzten Bild stehen
         }
      } else {
         // Walking Animation
         if (enemy.frame < 10) {
            enemy.element.src = `img/Gegner/Minotaur_01/Walking/Minotaur_01_Walking_00${enemy.frame}.png`;
         } else {
            enemy.element.src = `img/Gegner/Minotaur_01/Walking/Minotaur_01_Walking_0${enemy.frame}.png`;
         }
         enemy.frame++;
         if (enemy.frame == 17) {
            enemy.frame = 0;
         }
      }
   });
}


function setState(newState) {/* Der Parameter, also newState bekommt den Wert der
dafür festgelegt wird z.b. in if Anweisungen*/
   if (state !== newState) { /* Nur ein neuer State wenn er nicht der gleiche ist */
      frame = 0;
      state = newState;
   } /* Dann wird state zu newState also zum 
   Wert vom newState */
}

function checkCharacterCollision() {
   if (state !== 'DIE') {
      const pirateRect = pirate.getBoundingClientRect();

      enemies.forEach(enemy => {
         const enemyRect = enemy.element.getBoundingClientRect();

         // Kollision zwischen Charakter und Gegner überprüfen
         if (
            pirateRect.left < enemyRect.right &&
            pirateRect.right > enemyRect.left &&
            pirateRect.top < enemyRect.bottom &&
            pirateRect.bottom > enemyRect.top &&
            !enemy.hit
         ) {
            // Kollision erkannt
            setState('DIE'); // Setze den Zustand des Charakters auf 'DIE'

            // Bewegung des Charakters und der Gegner stoppen
            leftArrow = false;
            rightArrow = false;

            // Gegnerbewegung stoppen
            enemies.forEach(enemy => {
               enemy.movable = false; // Füge eine Eigenschaft hinzu, um die Bewegung zu kontrollieren
            });
         }
      });
   }
}