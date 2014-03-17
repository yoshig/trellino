window.Trellino.Collections.Cards = Backbone.Collection.extend({
  model: Trellino.Models.Card,

  url: "/cards",

  initialize: function(model, options) {
    this.list = options.list
  },

  comparator: function(card) {
    return card.get("rank")
  },

  getOrFetch: function(id) {
    var card;
    var cards = this;

    if (card = this.get(id)) {
      card.fetch();
      return card;
    } else {
      card = new Trellino.Models.Card({ id: id })
      card.fetch({
        success: function() { cards.add(card) }
      });
      return card
    }
  }
});