window.Trellino.Routers.AppRouter = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id/edit": "boardsEdit",
    "boards/:id": "boardsShow",
    "boards/:board_id/newlist": "listNew",
  },

  boardsEdit: function(id) {
    var boardFormView = new Trellino.Views.BoardFormView({
      model: Trellino.boards.get(id)
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
    var boardShowView = new Trellino.Views.BoardShowView({
      model: Trellino.boards.getOrFetch(id)
    });

    this._swapView(boardShowView);
  },

  listNew: function(board_id) {
    var listNewView = new Trellino.Views.ListFormView({
      collection: new Trellino.Collections.Lists({
        board: Trellino.boards.get(board_id)
      }),
      model: new Trellino.Models.List()
    });
    debugger

    this._swapView(listNewView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});