window.Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function() {
   return "boards/" + this.get("board_id") + "/lists"
  },

  cards: function() {
    if (!this._cards) {
      this._cards = new Trellino.Collections.Cards([], {
        list: this
      });
    }

    return this._cards;
  },

  parse: function(jsonResp) {
    if(jsonResp.cards) {
      this.cards().set(jsonResp.cards);
      delete jsonResp.cards
    }

    return jsonResp;
  },

  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);
    delete json.id;
    delete json.created_at;
    delete json.updated_at;

    return json
  }
});