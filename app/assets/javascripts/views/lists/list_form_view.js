window.Trellino.Views.ListFormView = Backbone.View.extend({
  template: JST["lists/form"],

  initialize: function(options) {
    this.board = options.board;
  },

  className: "board_entry",

  events: {
    'click .new_list': "createList"
  },

  render: function() {
    var content = this.template({
      list: this.model,
      board: this.board
    });

    this.$el.html(content);

    return this;
  },

  createList: function() {
    that = this
    var attrs = { title: "New List",
                  board_id: this.board.id,
                  rank: this.board.lists().length + 1 }
    var newList = new Trellino.Models.List();
    this.board.lists().create(attrs);
  }
})