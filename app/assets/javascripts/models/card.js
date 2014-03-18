window.Trellino.Models.Card = Backbone.Model.extend({
  urlRoot: "/cards",

  todoItems: function() {
    if (!this._todoItems) {
      this._todoItems = new Trellino.Collections.TodoItems([], {
        card: this
      });
    }

    return this._todoItems;
  }
});