window.Trellino.Views.BoardIndexView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "sync remove save", this.render)
  },

  events: {
    "click .destroy-board": "destroy"
  },

  template: JST["boards/index"],

  render: function() {
    var content = this.template({ boards: this.collection });

    this.$el.html(content);

    return this;
  },

  destroy: function(event) {
    var $target = $(event.target);
    var board = this.collection.get($target.attr("data-id"));

    board.destroy();
  }
});