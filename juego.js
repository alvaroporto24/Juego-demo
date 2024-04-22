const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const buttonUp = document.querySelector('#up');
const buttonLeft = document.querySelector('#left');
const buttonRight = document.querySelector('#right');
const buttonDown = document.querySelector('#down');
const livesIndicator = document.querySelector('.livesIndicator')
const timeIndicator = document.querySelector('.timeIndicator')
const recordIndicator = document.querySelector('.recordIndicator')
const pResult = document.querySelector('#result')


const playerPosition = {
    x : undefined,
    y : undefined,
}
const giftPosition = {
    x : undefined,
    y : undefined,
}
let enemyPositions = [];

let canvasSize;
let elementSize; 
let level = 0;
let lives = 2;

let timeStart = undefined;
let timeInterval;

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)


function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.7
    }
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)


    elementSize = (canvasSize / 10) -1

    startGame()
}

function startGame() {
    game.font = elementSize + 'px verdana';
    game.textAlign = 'right';

    // version 2
    const map = maps[level]
    if (!map) {
        gameWin();
        return;
    }
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    modifyLives();

    if (!timeStart) {
        timeIndicator.textContent = '0';
        showRecord()
    }

    game.clearRect(0,0,canvasSize,canvasSize);
    enemyPositions = [];

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX = elementSize * (colIndex + 1)
            const posY = elementSize * (rowIndex + 1)

            switch (col) {
                case 'O':
                    if (!playerPosition.x && !playerPosition.y) {
                        playerPosition.x = posX;
                        playerPosition.y = posY;
                    }
                    break;
                case 'I':
                    giftPosition.x = posX;
                    giftPosition.y = posY
                    break;
                case 'X':
                    enemyPositions.push({
                        x: posX,
                        y: posY,
                    })
                default:
                    break;
            }

            game.fillText(emoji, posX, posY)
        })
    });

    movePlayer();
    // Version 1
    // let map = maps[2].replace(/\s/g, '')
    
    // for (let row = 0; row < 10; row++) {
    //     for (let col = 0; col < 10; col++) {
    //     let index = row * 10 + col
    //     let emoji = emojis[map[index]]
    //     game.fillText(emoji, elementSize * (col + 1), elementSize * (row + 1))    
    //     }
    // }
}

function movePlayer() {
    playerCollision()
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}
function playerCollision() { 
    //version 2
    if (playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1) && playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1)) {
        level ++;
        startGame()
    }
    const enemyCollision = enemyPositions.find(enemy => {
            const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
            const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
            return enemyCollisionX && enemyCollisionY;
    })

    // version 1
        //const threshold = 0.01;
        // if (Math.abs(playerPosition.x - giftPosition.x) < threshold &&
        //     Math.abs(playerPosition.y - giftPosition.y) < threshold) {
        //     level++;
        //     startGame();
        // }
        // const enemyCollision = enemyPositions.find(enemy => {
        //     const enemyCollisionX = (enemy.x - playerPosition.x) < threshold;
        //     const enemyCollisionY = (enemy.y - playerPosition.y) < threshold;
        //     return enemyCollisionX && enemyCollisionY;
        // })

    if (enemyCollision) {
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        if (lives < 1){
            gameOver();
        }
        lives--;
        startGame()
        }
}
function modifyLives() {
    // Se cuentan las vidas y se añaden corazones a un array para luego mostrarlo
    let j = [];
    for (let i = 0; i < (lives + 1); i++) {
        j.push('♥️');   
    }  
    livesIndicator.textContent = j.join(' ');
}
function showTime() {
    // muestra el temporizador con el tiempo actual.
    const playerTime = Date.now() - timeStart;
    timeIndicator.textContent = playerTime;
}
function showRecord() {
    recordIndicator.textContent = localStorage.getItem('record_time');
}

function gameOver() {
    level = 0;
    lives = 3;
    timeStart = undefined;
    startGame();
}
function gameWin() {
    console.log('has ganado')
    clearInterval(timeInterval)
// control de record para mostrarlo y superarlo.
    const recordTime = localStorage.getItem('record_time');
    const recordPlayer = Date.now() - timeStart;

    if (recordTime) {
        if(recordTime >= recordPlayer) {
            localStorage.setItem('record_time', recordPlayer);
            pResult.textContent = 'GENIAL !!! Has superado el record!!!';
        } else{
            pResult.textContent = 'FALLASTE !!! No has superado el record';
        } 
    } else{
        pResult.textContent = 'Primera vez que superaste el juego. ¿Podras superar tu record?'
        localStorage.setItem('record_time', recordPlayer)
    }
}
// Movimientos con teclado y botones 
window.addEventListener('keydown', moveKey)
buttonUp.addEventListener('click', moveUp);
buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);
buttonDown.addEventListener('click', moveDown);

function moveKey() {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break;
        case 'ArrowLeft':
            moveLeft()
            break;
        case 'ArrowRight':
            moveRight()
            break;
        case 'ArrowDown':
            moveDown()
            break;
        default:
            break;
    }
    
}
function moveUp() {
    // Comienzas a jugar e inicias el contador
    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
    }

    if (playerPosition.y - elementSize > (elementSize / 2)) {  
        playerPosition.y -= elementSize;
        startGame();
    }
}
function moveLeft() {
    if (playerPosition.x - elementSize > (elementSize / 2)) {    
        playerPosition.x -= elementSize;
        startGame();
    }
}
function moveRight() {
    if (playerPosition.x + elementSize < canvasSize) {     
        playerPosition.x += elementSize;
        startGame();
    }
}
function moveDown() {
    if (playerPosition.y + elementSize < canvasSize) {
        playerPosition.y += elementSize;
        startGame();
    }
}