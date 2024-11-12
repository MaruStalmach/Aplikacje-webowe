const canvas = document.getElementById('gameCanvas');
const c = canvas.getContext('2d');

const fullHeart = new Image();
fullHeart.src = "full_heart.png";

const emptyHeart = new Image();
emptyHeart.src = "empty_heart.png";

const zombieImage = new Image();
zombieImage.src = "walkingdead.png";

const crosshair = document.getElementById('crosshair');

canvas.width = window.innerWidth; //window width is canvas height
canvas.height = window.innerHeight; //window height is canvas height

//frame args for animation
const spriteWidth = 200; 
const spriteHeight = 312; 
const totalFrames = 10; 

let zombies = []; //stores zombies that were created
let lives = 3;
let isPaused = false;
let playerScore = 0;

c.font = '50px Arial'; 
c.fillStyle = 'white'; 

//func for displaying player's score
function scoreCounter() { 
    c.fillText(`${playerScore}`, canvas.width - 200, 50);
}

//func for drawing the hearts accordingly to lives
function lifeCount() {
    for (let i = 0; i < 3; i++) {
        if (i < lives) {
            c.drawImage(fullHeart, 10 + (i * 60), 10, 50, 50);
        } else {
            c.drawImage(emptyHeart, 10 + (i * 60), 10, 50, 50);
        }
    }
}

//func for ending the game and displaying the popup
function endGame() {
    isPaused = true; 
    alert("YOU LOST! TRY AGAIN!"); 
    resetGame(); 
}

//func for resetting the game after player lost
function resetGame() {
    lives = 3; 
    playerScore = 0; 
    zombies = []; 
    spawnZombies(2); 
    isPaused = false; 
    requestAnimationFrame(animate); //restart the animation
}

//func for creating the zombies 
function createZombie() {
    const randomScale = Math.random() * (1.5 - 0.25) + 0.25; //random scale between 0.25 and 1.5 to randomise the siz
    const scaledWidth = spriteWidth * randomScale;
    const scaledHeight = spriteHeight * randomScale;

    return {
        x: canvas.width + scaledWidth, //start off-screen 
        y: canvas.height - scaledHeight,
        frame: 0,
        speed: Math.random() * 10 + 1, //randomise speed by randomising
        lastFrameTime: 0,
        scaledWidth,
        scaledHeight
    };
}

//func for spawning the zombies
function spawnZombies(numZombies = 2) {
    for (let i = 0; i < numZombies; i++) {
        zombies.push(createZombie()); //add created zombie to the array
    }
}

//start the animation after zombie img has been loaded
zombieImage.onload = () => {
    spawnZombies(2); 
    setInterval(() => spawnZombies(1), 1000); 
    requestAnimationFrame(animate);
};

//main animation
function animate(timestamp) {
    if (isPaused) return; //stop is game is paused

    c.clearRect(0, 0, canvas.width, canvas.height); //cleare and prepare canvas
    lifeCount();
    scoreCounter();

    zombies.forEach((zombie, index) => {
        if (timestamp - zombie.lastFrameTime > 150) {
            zombie.lastFrameTime = timestamp;
            zombie.frame = (zombie.frame + 1) % totalFrames; 
        }

        zombie.x -= zombie.speed; //animation moves left

        if (zombie.x > -zombie.scaledWidth) { 
            c.drawImage(zombieImage, zombie.frame * spriteWidth, 0, spriteWidth, spriteHeight, zombie.x, zombie.y, zombie.scaledWidth, zombie.scaledHeight);
        } else {
            lives -= 1; //if zombie walks past the screen, deduct a life
            zombies.splice(index, 1); 
            if (lives <= 0) endGame(); //end game if there are no lives left
        }
    });

    requestAnimationFrame(animate);
}

//click and shoot zombies
canvas.addEventListener('click', (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;
    let zombieHit = false; //a flag defining whether a zombie has been hit

    zombies.forEach((zombie, index) => {
        const zombieLeft = zombie.x;
        const zombieRight = zombie.x + zombie.scaledWidth;
        const zombieTop = zombie.y;
        const zombieBottom = zombie.y + zombie.scaledHeight;

        //if the zombie is within boulds
        if (
            clickX >= zombieLeft && clickX <= zombieRight &&
            clickY >= zombieTop && clickY <= zombieBottom
        ) {
            zombies.splice(index, 1); //remove hit zombie
            playerScore += 20; //add points
            zombieHit = true; //mark as hit
        }
    });

    if (!zombieHit) {
        playerScore -= 5; //deduct points if player shoots anywhere else
    }
});

//update crosshair
document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;

    //crosshair follows the cursor
    crosshair.style.left = `${clientX}px`;
    crosshair.style.top = `${clientY}px`;
});
