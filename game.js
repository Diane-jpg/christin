const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = 600;
canvas.height = 800;

// Variables for the car and obstacles
let car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 90,
    speed: 5,
    moveLeft: false,
    moveRight: false
};

let obstacles = [];
let obstacleSpeed = 3;
let gameOver = false;
let score = 0;

// Draw the car
function drawCar() {
    ctx.fillStyle = 'red';
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Draw the obstacles
function drawObstacles() {
    ctx.fillStyle = 'black';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Create new obstacles
function createObstacle() {
    let width = Math.random() * (canvas.width - 50) + 50; // Random width for obstacles
    let height = 20; // Fixed height
    obstacles.push({
        x: width,
        y: -height,
        width: 50,
        height: height
    });
}

// Move the obstacles down
function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacleSpeed;
    });

    // Remove obstacles that are off-screen
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

// Check for collisions
function checkCollisions() {
    for (let obstacle of obstacles) {
        if (
            car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y
        ) {
            gameOver = true;
            return;
        }
    }
}

// Update the game elements
function update() {
    if (gameOver) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the car
    if (car.moveLeft && car.x > 0) {
        car.x -= car.speed;
    }
    if (car.moveRight && car.x + car.width < canvas.width) {
        car.x += car.speed;
    }

    // Draw the car and obstacles
    drawCar();
    drawObstacles();

    // Move obstacles and create new ones
    moveObstacles();

    // Create a new obstacle every 2 seconds
    if (Math.random() < 0.02) {
        createObstacle();
        score++;
    }

    // Check for collisions
    checkCollisions();

    // Request the next frame
    if (!gameOver) {
        requestAnimationFrame(update);
    }
}

// Listen for key events to move the car
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        car.moveLeft = true;
    }
    if (e.key === 'ArrowRight') {
        car.moveRight = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        car.moveLeft = false;
    }
    if (e.key === 'ArrowRight') {
        car.moveRight = false;
    }
});

// Start the game loop
update();