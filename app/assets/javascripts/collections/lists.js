window.Trellino.Collections.Lists = Backbone.Collection.extend({
  model: Trellino.Models.List,

  url: function() {
    return this.board.url() + "/lists";
  },

  comparator: function(list) {
    return list.get("rank")
  },

  initialize: function(models, options) {
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