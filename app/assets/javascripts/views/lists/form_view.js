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
    var that = this;
    var lastList = this.board.lists().last()
    var maxRank =  lastList ? lastList.get("rank") : 1
    var attrs = { title: "New List",
                  board_id: this.board.id,
                  rank: Math.ceil(maxRank) }
    var newList = new Trellino.Models.List();
    this.board.lists().create(attrs);
  }
})