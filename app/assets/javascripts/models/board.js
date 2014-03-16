window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: "/boards",

  lists: function() {
    if (!this._lists) {
      this._lists = new Trellino.Collections.Lists([], {
        board: this
      });
    }

    // this._lists.fetch();
    return this._lists
  }
});