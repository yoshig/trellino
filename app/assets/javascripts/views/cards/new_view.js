window.Trellino.Views.CardNewView = Backbone.View.extend({
  template: JST["cards/new"],

  initialize: function(options) {
    this.list = options.list;
  },

  events: {
    'click .new_card': "createCard"
  },

  render: function() {
    var content = this.template({ card: this.model });

    this.$el.html(content);

    return this;
  },

  createCard: function() {
    that = this
    var attrs = { title: "New Card",
                  description: "",
                  rank: this.list.cards().length + 1,
                  list_id: this.list.id }
    var newCard = new Trellino.Models.Card();
    this.list.cards().create(attrs);
  }
})