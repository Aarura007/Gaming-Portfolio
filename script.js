
 let fantasyMusic = new Audio("fantasy-music.mp3");

 fantasyMusic.loop = true;
 fantasyMusic.volume = 0.08;

 let coinSound = new Audio("coin-sound.mp3");
 let winSound = new Audio("win-sound.mp3");

 coinSound.volume = 0.30;
 winSound.volume = 0.25;

 const player = document.getElementById("player");

 let x = 100;
 let y = 0;

 let velocityY = 0;

 let moveLeft = false;
 let moveRight = false;
 
 let jumping = false;

 let score = 0;

 let gameCompleted = false;

 let lastSpaceTime = 0;
 const DOUBLE_PRESS_DELAY = 300; //ms

/* START GAME */

function startGame(){
    fantasyMusic.play().catch(err => console.log(err));
  document.getElementById('start').style.display = "none";
  }

/* FORM */

function submitForm() {

    alert('🚀 MESSAGE SENT SUCCESSFULLY!🚀');

}  

/* KEYBOARD */

 document.addEventListener('keydown', e => {

    if (e.key === 'ArrowRight') moveRight = true;

    if (e.key === 'ArrowLeft') moveLeft = true;

    if ((e.key === 'ArrowUp' || e.key === ' ') && !jumping) {

        velocityY = -24;

        jumping = true;

    }

    if (e.key == " ") {
        const now = Date.now();

        if (now - lastSpaceTime < DOUBLE_PRESS_DELAY) {
            velocityY = -24;

            jumping = true;

        }

        lastSpaceTime = now;
  }

});

let code = "";

 document.addEventListener("keydown", e => {
   code += e.key;

    if (code.includes("godmode")) {
      score += 10;
      document.getElementById('coins').innerText = score;

      alert("🔥 GOD MODE ACTIVATED!🔥");
      code = "";
   }
   
});

 document.addEventListener('keyup', e=> {

   if (e.key === 'ArrowRight') moveRight = false;

   if (e.key === 'ArrowLeft') moveLeft = false;

 }); 

/* PARTICLES */

 function createParticles(x, y) {

    for (let i = 0; i < 10; i++) {

        let p = document.createElement('div');

        p.classList.add('particle');

        p.style.left = x + 'px';

        p.style.top = y + 'px';

        document.body.appendChild(p);

        setTimeout(() => {

            p.remove();

        }, 1000);

   }

 }

/* GAME LOOP */
  
 function gameLoop() {

    if (!gameCompleted) {

      /* MOVE */

      if (moveRight) {

         x += 7;
         // x = x+7;

         player.style.transform = 'scaleX(1)';

         player.classList.add('walk');

      }

      if (moveLeft) {

         x -= 7;

         player.style.transform = 'scaleX(-1)';

         player.classList.add('walk');

      }

      if (!moveLeft && !moveRight) {

         player.classList.remove('walk');
      }

      if (x < 0) x = 100;

      /* GRAVITY */

      velocityY += 1.2;

      y += velocityY;

      if (y > 0) {

         y = 0;

         velocityY = 0;

         jumping = false;

      }

      player.style.left = x + 'px';

      player.style.top =
         (window.innerHeight - 220 + y) + 'px';

      /* CAMERA */

      window.scrollTo(x - 300, 0);

      /* COINS */

      document.querySelectorAll('.coin').forEach(coin => {

        if (coin.style.display !== 'none') {

            let cx = coin.offsetLeft;

            let cy = coin.offsetTop;

            if (
               x + 60 > cx &&
               x < cx + 35 &&
               player.offsetTop < cy + 35 &&
               player.offsetTop + 90 > cy
            ) {

              coin.style.display = 'none';

              score++;

              document.getElementById('coins').innerText = score;

              createParticles(cx, cy);

            }

         }

      });

      /* ENEMIES */

      document.querySelectorAll('.enemy').forEach(enemy => {
 
         let ex = enemy.offsetLeft;

         if (
            x + 60 > ex &&
            x < ex + 60 &&
            y > -50
         ) {

            gameCompleted = true;

         
         alert('💀 GAME OVER');
 
          location.reload();

         }

      });

   /* FLAG WIN */

     const flag = document.getElementById('flag');

     const flagPosition = flag.offsetLeft;

      if (
        x >= flagPosition - 100 &&
        score >= 5 &&
        !gameCompleted
        ) {

       gameCompleted = true;

       moveLeft = false;
       moveRight = false;
           
       document.body.style.transition = "all 1s";
       document.body.style.filter = "brightness(1.5)";
          
       document.getElementById("end-screen").style.display = "flex";
          
        /* SHOW PORTAL */

         const portal = document.getElementById("endingScreen");
         portal.style.display = "flex";
         portal.style.opacity = "1";
         portal.style.pointerEvents = "all";


        /* MUSIC */

        fantasyMusic.pause();
        winSound.currentTime = 0;
        winSound.play();
      
        /* AUTO FOCUS INPUT */

    setTimeout(() => {

        const input = document.querySelector(".portal-box input");

        if(input){

            input.focus();

        }

    }, 200);
} 
      
      }
   
   
   requestAnimationFrame(gameLoop);

}

gameLoop();