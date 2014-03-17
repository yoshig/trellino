window.Trellino.Collections.TodoItems = Backbone.Collection.extend({
  model: Trellino.Models.TodoItem,

  initialize: function(models, options) {
    this.card = options.card
  },

  url: function() {
    return this.card.url() + "/todo_items";
  }
});