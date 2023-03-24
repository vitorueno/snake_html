// ===================== constantes ===================== 

const gameBoard = document.querySelector('#gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "black";
const snakeColor = "orange";
const snakeBorder = "white"; 
const foodColor = "red";
const gameOverColor = "white";
const gameOverFont = "50px MV Boli";
const unitSize = 25;


// ===================== variáveis =====================

let running = false; 
let xVelocity = unitSize; 
let yVelocity = 0;
let foodX; 
let foodY; 
let score = 0;

let snake = [
    { x : unitSize * 4,  y : 0 },
    { x : unitSize * 3,  y : 0 },
    { x : unitSize * 2,  y : 0 },
    { x : unitSize,  y : 0 },
    { x : 0,  y : 0 },
];


// ===================== tratando eventos =====================

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

// iniciando o jogo
gameStart();

// ===================== funções =====================


function gameStart() {
    running = true; 
    scoreText.textContent = score; 
    createFood();
    drawFood();
    nexTick();
}

function nexTick(){
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nexTick();
        }, 75);
    } else {
        displayGameOver();
    }
}

function clearBoard() {
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
    // gerar posição do grid aleatório, divisível por unitsize e entre min e max
    const randomFood = (min, max) => { 
        const randomNumber = (Math.random() * (max - min) + min) ;
        const gridPosition = Math.round(randomNumber / unitSize) * unitSize; 
        return gridPosition; 
    }

    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
}

function drawFood() {
    context.fillStyle = foodColor; 
    context.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
    const head = { x: snake[0].x + xVelocity,
                   y: snake[0].y + yVelocity
                };

    snake.unshift(head);

    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score; 
        createFood();
    } 
    else {
        snake.pop();
    } 

} 

function drawSnake() {
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;

    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    });
} 

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
    // const keyPressed = event.key;
    
    // const upKey = ('w' || 'W' || 'ArrowUp');
    // const downKey = ('s' || 'S' || 'ArrowDown');
    // const rightKey = ('d' || 'D' || 'ArrowRight');
    // const leftKey = ('a' || 'A' || 'ArrowLeft');
    
    // const goingUp = (yVelocity == -unitSize);
    // const goingDown = (yVelocity == unitSize);
    // const goingRight = (xVelocity == unitSize);
    // const goingLeft = (xVelocity == -unitSize);


    // switch (true) {
    //     case(keyPressed == leftKey && !goingRight): 
    //         console.log('esquerda');
    //         xVelocity = -unitSize;
    //         yVelocity = 0;
    //         break; 
    //     case(keyPressed == upKey && !goingDown): 
    //         console.log('cima');
    //         xVelocity = 0;
    //         yVelocity = -unitSize;
    //         break; 
    //     case(keyPressed == rightKey && !goingLeft): 
    //         console.log('direita');    
    //         xVelocity = unitSize;
    //         yVelocity = 0;
    //         break; 
    //     case(keyPressed == downKey && !goingUp): 
    //         console.log('baixo');
    //         xVelocity = 0;
    //         yVelocity = unitSize;
    //         break; 
    // }

} 

function checkGameOver() {
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
                running = false;
                break;
    }
    
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}

function displayGameOver() {
    context.font = gameOverFont;
    context.fillStyle = gameOverColor;
    context.textAlign = "center";
    context.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
    running = false;
} 

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;

    snake = [
        { x : unitSize * 4,  y : 0 },
        { x : unitSize * 3,  y : 0 },
        { x : unitSize * 2,  y : 0 },
        { x : unitSize,  y : 0 },
        { x : 0,  y : 0 },
    ];
    
    gameStart();
}