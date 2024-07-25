const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playButton = document.getElementById('playButton');
const scoreField = document.getElementById('score');
const gameOverMessage = document.getElementById('gameOver');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;
let score = 0;

class Snake {
  constructor() {
    this.body = [{x: 5, y: 5}];
    this.direction = {x: 1, y: 0};
  }

  draw() {
    this.body.forEach((part, index) => {
      ctx.fillStyle = index === 0 ? 'yellow' : 'green';
      ctx.fillRect(part.x * scale, part.y * scale, scale, scale);
    });
  }

  update() {
    const head = {x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y};
    this.body.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreField.innerText = score;
      placeFood();
    } else {
      this.body.pop();
    }

    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        gameOver();
      }
    }

    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
      gameOver();
    }
  }

  changeDirection(direction) {
    switch (direction) {
      case 'ArrowUp':
        if (this.direction.y === 0) this.direction = {x: 0, y: -1};
        break;
      case 'ArrowDown':
        if (this.direction.y === 0) this.direction = {x: 0, y: 1};
        break;
      case 'ArrowLeft':
        if (this.direction.x === 0) this.direction = {x: -1, y: 0};
        break;
      case 'ArrowRight':
        if (this.direction.x === 0) this.direction = {x: 1, y: 0};
        break;
    }
  }
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * columns),
    y: Math.floor(Math.random() * rows)
  };
}

function gameOver() {
  clearInterval(gameLoop);
  gameOverMessage.style.display = 'block';
}

function init() {
  snake = new Snake();
  placeFood();
  score = 0;
  scoreField.innerText = score;
  gameOverMessage.style.display = 'none';
  gameLoop = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    snake.draw();
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
  }, 100);
}

document.addEventListener('keydown', e => {
  snake.changeDirection(e.key);
});

playButton.addEventListener('click', init);
