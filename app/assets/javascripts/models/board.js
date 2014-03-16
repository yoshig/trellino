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
  },

  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);
    delete json.id;
    delete json.created_at;
    delete json.updated_at;

    return json
  }
});