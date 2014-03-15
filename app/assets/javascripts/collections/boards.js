window.Trellino.Collections.Boards = Backbone.Collection.extend({
  url: "/boards",
  model: Trellino.Models.Board,

  getOrFetch: function(id) {
    var board;
    var boards = this;

    if (board = this.get(id)) {
      board.fetch();
      return board;
    } else {
      board = new Trellino.Models.Board({ id: id })
      board.fetch({
        success: function() { boards.add(board) }
      });
      return board;
    }
  }
});