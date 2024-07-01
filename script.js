const game = document.getElementById('game');
const ball = document.getElementById('ball');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');

let ballX = 290;
let ballY = 190;
let gameInterval;
let obstacles = [];
let score = 0;

const ballSpeed = 5;
const obstacleSpeed = 2;
const obstacleInterval = 2000; // New obstacle every 2 seconds

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && ballY > 0) ballY -= ballSpeed;
    if (event.key === 'ArrowDown' && ballY < game.clientHeight - ball.clientHeight) ballY += ballSpeed;
    if (event.key === 'ArrowLeft' && ballX > 0) ballX -= ballSpeed;
    if (event.key === 'ArrowRight' && ballX < game.clientWidth - ball.clientWidth) ballX += ballSpeed;
    updateBallPosition();
});

startButton.addEventListener('click', startGame);

function startGame() {
    resetGame();
    gameInterval = setInterval(gameLoop, 20);
    setInterval(createObstacle, obstacleInterval);
}

function resetGame() {
    clearInterval(gameInterval);
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];
    score = 0;
    updateScore();
    ballX = 290;
    ballY = 190;
    updateBallPosition();
}

function updateBallPosition() {
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.top = `${Math.random() * (game.clientHeight - 20)}px`;
    obstacle.style.left = `${game.clientWidth}px`;
    game.appendChild(obstacle);
    obstacles.push(obstacle);
}

function updateObstacles() {
    obstacles.forEach((obstacle, index) => {
        const obstacleX = parseInt(obstacle.style.left);
        if (obstacleX < -20) {
            obstacle.remove();
            obstacles.splice(index, 1);
            score++;
            updateScore();
        } else {
            obstacle.style.left = `${obstacleX - obstacleSpeed}px`;
            if (isColliding(ball, obstacle)) {
                endGame();
            }
        }
    });
}

function isColliding(rect1, rect2) {
    const rect1X = rect1.offsetLeft;
    const rect1Y = rect1.offsetTop;
    const rect1W = rect1.clientWidth;
    const rect1H = rect1.clientHeight;

    const rect2X = rect2.offsetLeft;
    const rect2Y = rect2.offsetTop;
    const rect2W = rect2.clientWidth;
    const rect2H = rect2.clientHeight;

    return !(rect2X > rect1X + rect1W ||
             rect2X + rect2W < rect1X ||
             rect2Y > rect1Y + rect1H ||
             rect2Y + rect2H < rect1Y);
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function endGame() {
    clearInterval(gameInterval);
    alert(`Game Over! Your score: ${score}`);
}

function gameLoop() {
    updateObstacles();
}
