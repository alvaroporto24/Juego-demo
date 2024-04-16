const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const buttonUp = document.querySelector('#up');
const buttonLeft = document.querySelector('#left');
const buttonRight = document.querySelector('#right');
const buttonDown = document.querySelector('#down');


let canvasSize;
let elementSize; 
let level = 0;



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
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX = elementSize * (colIndex + 1)
            const posY = elementSize * (rowIndex + 1)

            game.fillText(emoji, posX, posY)
        })
    });


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

window.addEventListener('keydown', moveKey)
buttonUp.addEventListener('click', moveUp);
buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);
buttonDown.addEventListener('click', moveDown);

function moveKey(event) {

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
    
}
function moveLeft() {
    
}
function moveRight() {
    
}
function moveDown() {
    
}