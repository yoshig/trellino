window.Trellino.Collections.Lists = Backbone.Collection.extend({
  model: Trellino.Models.List,

  url: function() {
    return this.board.url() + "/lists";
  },

  initialize: function(options) {
    this.board = options.board
  },

  getOrFetch: function(id) {
    var list;
    var lists = this;

    if (list = this.get(id)) {
      list.fetch();
      return list;
    } else {
      list = new Trellino.Models.List({ id: id })
      list.fetch({
        success: function() { lists.add(list) }
      });
      return list;
    }
  }
});