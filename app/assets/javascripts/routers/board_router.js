window.Trellino.Routers.AppRouter = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id/edit": "boardsEdit",
    "boards/:id": "boardsShow",
    "boards/:board_id/new": "listNew",
    "boards/:board_id/lists/:id": "listShow",
  },

  boardsEdit: function(id) {
    var boardFormView = new Trellino.Views.BoardFormView({
      model: Trellino.boards.getOrFetch(id)
    })

    this._swapView(boardFormView);
  },

  boardsIndex: function() {
    var IndexView = new Trellino.Views.BoardIndexView({
      collection: Trellino.boards
    });

    this._swapView(IndexView);
  },

  boardsNew: function() {
    var boardNewView = new Trellino.Views.BoardFormView({
      collection: Trellino.boards,
      model: new Trellino.Models.Board()
    });

    this._swapView(boardNewView);
  },

  boardsShow: function(id) {
    var board = Trellino.boards.getOrFetch(id);
    board.lists().fetch();

    var boardShowView = new Trellino.Views.BoardShowView({
      model: board
    });

    this._swapView(boardShowView);
  },

  listNew: function(board_id) {
    debugger
    var listNewView = new Trellino.Views.ListFormView({
      collection: new Trellino.Collections.Lists({
        board: Trellino.boards.get(board_id)
      }),
      model: new Trellino.Models.List()
    });

    this._swapView(listNewView);
  },

  // listShow: function(board_id, id) {
  //   debugger
  //   var lists = new Trellino.Collections.Lists(
  //     [], { board: Trellino.boards.get(board_id) });
  //   lists.fetch();
  //
  //   var listShowView = new Trellino.Views.ListFormView({
  //     model: lists.get({id: id})
  //   });
  //
  //   this._swapView(listShowView);
  // },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});