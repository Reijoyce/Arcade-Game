// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(enemyX, enemyY) {
        this.enemyX = enemyX;
        this.enemyY = enemyY;
        this.speed = speed;
        this.sprite = 'src/images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        this.enemyX += this.speed * dt;
        // which will ensure the game runs at the same speed for
        // all computers.
        //reset position of enemy to move across again.
        if (this.enemyX > 500) {
            this.enemyX = -50;
            this.speed = ((Math.random()) * 240 + speed);
        };
        //colision
        if ((image.imageX < this.enemyX + 90) && (image.imageX + 75 > this.enemyX) && (image.imageY < this.enemyY + 60) &&
            (60 + image.imageY > this.enemyY)) {
            speed = 100;
            currentLevel = 1;
            image.characterReset();
            updateLevel();
            swal({
                title: 'Ops!!! Try again!!!',
                confirmButtonColor: '#da00df'
            })
        };
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.enemyX, this.enemyY);
    }
}
// Now write your own image class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(imageX, imageY) {
        this.imageX = imageX;
        this.imageY = imageY;
        this.image = 'src/images/char-horn-girl.png';
    }
    update(dt) {
    }
    render() {
        ctx.drawImage(Resources.get(this.image), this.imageX, this.imageY);
    }
    //moviments inside the canvas
    handleInput(keyPress) {
        if (keyPress == 'left' && this.imageX > 0) {
            this.imageX -= 100;
        };
        if (keyPress == 'right' && this.imageX < 400) {
            this.imageX += 100;
        };
        if (keyPress == 'up' && this.imageY > 0) {
            this.imageY -= 80;
        };
        if (keyPress == 'down' && this.imageY < 400) {
            this.imageY += 70;
        };
        if (this.imageY < 0) {
            swal({
                title: 'Good job!',
                title: 'Next Level',
                confirmButtonColor: '#da00df'
            })
            this.nextLevel();
            updateLevel();
        }
    }
    //palyer initial position 
    characterReset() {
        this.imageX = 200;
        this.imageY = 350;
    }
    //Increase speed  and level.
    //Compare and keep highest level.
    nextLevel() {
        updateLevel();
        speed += 30;
        currentLevel++;
        if (currentLevel > highestLevel) {
            highestLevel = currentLevel;
        }
        this.characterReset();
    }
}

//variables for initial speed, current level and score.
let speed = 100;
let currentLevel = 1;
let highestLevel = 0;

//Update panel
function updateLevel() {
    document.getElementById("level").innerText = "Level " + currentLevel;
    document.getElementById("high-level").innerText = "Highest Level  " + highestLevel;
}

// Place the image object in a variable called image
let image = new Player(200, 350);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    image.handleInput(allowedKeys[e.keyCode]);
});

// Place all enemy objects in an array called allEnemies       
allEnemies = [];
allEnemies.push(new Enemy(0, 65));
allEnemies.push(new Enemy(0, 145));
allEnemies.push(new Enemy(0, 210));