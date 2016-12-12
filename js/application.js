$(document).ready(function() {

  $('#newgame').on("click",function(e){
    e.preventDefault();
    g = new Game()
    localStorage.setItem("gameboard", null);
  })

var g = new Game()
if (localStorage.getItem("gameboard")){
  console.log('ayy')
  g.boardSingleArr(localStorage.getItem("gameboard").split(' '));
}
if (!localStorage.getItem("gameboard") || g.gameOver()){
  console.log('bbb')
  g = new Game()
}
console.log(localStorage.getItem("gameboard"))
var canvas = document.getElementById("canvasView");
canvas.width = 800;
canvas.height = 800;
var ctx = canvas.getContext("2d");

Mousetrap.bind('up', function(e) {
  g.move('up');
});

Mousetrap.bind('down', function(e) {
  g.move('down');
});

Mousetrap.bind('left', function(e) {
  g.move('left');
});

Mousetrap.bind('right', function(e) {
  g.move('right');
});

function drawBoard() {
  for(var i=0; i< g.board.length; i++){
    for(var j=0; j< g.board[i].length; j++){
      ctx.beginPath();
      ctx.rect(canvas.width/4 * j,  canvas.height/4 * i, canvas.width/4, canvas.height/4);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
      if(g.board[i][j]!='0'){
        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(g.board[i][j], canvas.width/4 * j + canvas.width/8 - 12.5,canvas.height/4 * i + canvas.height/8 + 20);
      }
    }
  }
}

function drawGrid() {
  for(var i=0; i<g.board.length; i++){
    ctx.beginPath();
    ctx.rect(canvas.width/4 * i - 1,  0, 2, canvas.height);
    ctx.rect(0, canvas.height/4 * i - 1, canvas.width, 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
}

function drawScore() {
  ctx.font = "22px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: "+ g.score.toString(), canvas.width/2,canvas.height);
}

function drawGameOver() {
  ctx.font = "20px Impact";
  ctx.fillStyle = "white";
  ctx.fillText("Game OVER", 40,canvas.height/2);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawGrid();
    drawScore();
    if (g.gameOver() == true){
      drawGameOver();
    }
    requestAnimationFrame(draw);
  }
  draw();
});
