var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var length = 1;
var cellheight = 20;
var cellwidth = 10;
var snakelength = 1;
var snake = [];
var dx = 1;
var dy = 0;
var foodX = 0;
var foodY = 0;
var foodstatus = false;
var time = 400;
var score = 0;
var pause = false;
var fps = 5;
function setInitials() {
  for (let i = 0; i < 50; i++) {
    snake[i] = { x: 0, y: 0 };
  }
  dx = 1;
  dy = 0;
  foodX = 0;
  foodY = 0;
  foodstatus = false;
  score = 0;
  snakelength = 1;
}
setInitials();
document.addEventListener("keydown", setdxdy, false);

function drawscore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + (score - 1), 8, 20);
}
function newfood() {
  foodstatus = true;
  foodX = Math.floor(Math.random() * 30) * (cellwidth + 2);
  foodY = Math.floor(Math.random() * 30) * (cellwidth + 2);
  console.log(foodX, foodY);
}
function drawfood() {
  ctx.beginPath();
  ctx.rect(foodX, foodY, cellwidth, cellwidth);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}
function checkcollision() {
  if (
    snake[0].x > canvas.width ||
    snake[0].x < 0 ||
    snake[0].y > canvas.height ||
    snake[0].y < 0
  ) {
    alert("game over!");
    setInitials();
  }
}
function checksuicide() {
  for (let i = 1; i < snakelength; i++)
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      alert("game over!");
      setInitials();
    }
}
function setdxdy(e) {
  let k = e.which;
  if (k == 37 && !dx) {
    dx = -1;
    dy = 0;
    pause = false;
  }
  if (k == 38 && !dy) {
    dx = 0;
    dy = -1;
    pause = false;
  }
  if (k == 39 && !dx) {
    dx = 1;
    dy = 0;
    pause = false;
  }
  if (k == 40 && !dy) {
    dy = 1;
    dx = 0;
    pause = false;
  }
  if (k == 32) pause = !pause;
}
function checkfood() {
  if (
    snake[0].x >= foodX &&
    snake[0].x <= foodX + cellwidth &&
    snake[0].y >= foodY &&
    snake[0].y <= foodY + cellwidth
  ) {
    foodstatus = false;
    snakelength++;
    score++;
  }
}
function makesnake() {
  var obj = {
    x: snake[0].x + dx * (cellwidth + 2),
    y: snake[0].y + dy * (cellwidth + 2)
  };
  snake.unshift(obj);
  snake.pop();
  for (let i = 0; i < snakelength; i++) {
    ctx.beginPath();
    ctx.rect(snake[i].x, snake[i].y, cellwidth, cellwidth);
    if (i == 0) ctx.fillStyle = "rgb(0, 0, 116)";
    else ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}
function draw() {
  setTimeout(function() {
    if (!pause) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      checkcollision();
      checksuicide();
      checkfood();
      if (!foodstatus) newfood();
      drawfood();
      makesnake();
      drawscore();
    }
    requestAnimationFrame(draw);
  }, 1000 / fps);
}
draw();
