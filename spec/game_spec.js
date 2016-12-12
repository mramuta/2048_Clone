describe("game", function() {
  var game;

  beforeEach(function() {
    game = new Game('2200202000002000')
  });

  it("has a board", function() {
    expect(game.board).toEqual([ [ '2', '2', '0', '0' ], [ '2', '0', '2', '0' ], [ '0', '0', '0', '0' ], [ '2', '0', '0', '0' ] ]);
  });

  it("prints its board and formats it", function() {
    expect(game.toString()).toEqual("2200\n2020\n0000\n2000\n");
  });

  it("removes zeros", function() {
    expect(game.removeZeros(game.board)).toEqual([ [ '2', '2' ], [ '2', '2' ], [  ], [ '2' ] ]);
  });

  it("prepend zeros", function() {
    expect(game.prependZeros(game.removeZeros(game.board))).toEqual([ [ '0', '0', '2', '2' ], [ '0', '0', '2', '2' ], [ '0', '0', '0', '0' ], [ '0', '0', '0', '2' ] ]);
  });

  it("prepend zeros", function() {
    expect(game.prependZeros(game.removeZeros(game.board))).toEqual([ [ '0', '0', '2', '2' ], [ '0', '0', '2', '2' ], [ '0', '0', '0', '0' ], [ '0', '0', '0', '2' ] ]);
  });

});

