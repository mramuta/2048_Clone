function strToBoard(str){
  var board = [[],[],[],[]];
  for (var i = 0; i < 4; i++){
    for (var j = 0; j < 4; j++){
      board[i].push(str[j+i*4]);
    }
  }
  return board;
}


function Game(boardStr){
  this.boardStr = boardStr || '0000000000000000';
  this.board = strToBoard(this.boardStr);
  this.over = false;
  this.score = 0;
}

Game.prototype.toString = function() {
  var str = ''
  for(var i in this.board){
    str += _.flatten(this.board[i]).join("") + '\n';
  }
  return str;
}

Game.prototype.emptyCoords = function() {
  var coords = []
  for (var i = 0; i < 4; i++){
    for (var j = 0; j < 4; j++){
      if(this.board[i][j] == '0'){
        coords.push([i,j])
      }
    }
  }
  return coords;
}

Game.prototype.moveChecker = function() {
  var clonedBoard = this.board.slice(0)
  var checkGame = new Game()
  var moves = ['up','down','left','right']
  var movesRemaining = 0;
  for (var i = 0; i < moves.length; i++){
    checkGame = new Game()
    checkGame.board = clonedBoard
    movesRemaining += checkGame.move(moves[i]);
  }
  return movesRemaining;
}

Game.prototype.gameOver = function(){
  if (this.emptyCoords().length == 0 && this.moveChecker() == 0){
    return true;
  } else {
    return false;
  }
}

Game.prototype.addRandom = function(){
   var coord = _.sample(this.emptyCoords(), 1)[0];
   var twoOrFour = (Math.round(Math.random()) + 1) *2;
   this.board[coord[0]][coord[1]] = twoOrFour.toString();
}

Game.prototype.down = function() {
  var upBoard = []
  for(var i in this.board){
    var boardRow = (this.board[i]).slice(0);
    upBoard.push(boardRow.reverse());
  }
  return _.zip.apply(null,upBoard);
}

Game.prototype.up = function() {
  var backwardsUpBoard = _.zip.apply(null,this.board);
  var upBoard = []
  for(var i in backwardsUpBoard){
    var boardRow = (backwardsUpBoard[i]).slice(0);
    upBoard.push(boardRow.reverse());
  }
  return upBoard
}

Game.prototype.left = function() {
  var leftBoard = [];
  for(var i in this.board){
    var boardRow = (this.board[i]).slice(0);
    leftBoard.push(boardRow.reverse());
  }
  return leftBoard;
}

Game.prototype.squish = function(arr){
  arr = this.removeZeros(arr)
  arr = this.prependZeros(arr)
  var board = [[],[],[],[]];
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if (j < 3 && arr[i][j] == arr[i][j + 1] && arr[i][j] != '0'){
        board[i].push(arr[i][j] * 2);
        this.score += arr[i][j] * 2;
        j++;
      } else if(arr[i][j] != '0') {
        board[i].push(arr[i][j]);
      }
    }
  }
  return this.prependZeros(board);
}

Game.prototype.prependZeros = function(arr){
  for(var i = 0; i < 4; i++){
    while (arr[i].length < 4){
      arr[i].unshift('0');
    }
  }
  return arr;
}

Game.prototype.removeZeros = function(arr){
  var board = [[],[],[],[]];
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if (arr[i][j] != '0'){
        board[i].push(arr[i][j]);
      }
    }
  }
  return board;
}


Game.prototype.move = function(dir) {
  switch(dir){
    case 'up':
      this.board = this.squish(this.up())
      this.board = this.down()
      break;
    case 'down':
      this.board = this.squish(this.down())
      this.board = this.up()
      break;
    case 'left':
      this.board = this.squish(this.left())
      this.board = this.left()
      break;
    case 'right':
      this.board = this.squish(this.board)
      break;
  }
  if(this.emptyCoords().length == 0){
    return 0;
  } else{
    this.addRandom();
    return 1;
  }

}










