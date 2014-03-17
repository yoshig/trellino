window.Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCards);

    this.model.cards().each(this.addCard.bind(this));

    var cardNewView = new Trellino.Views.CardNewView({
      list: this.model,
      model: new Trellino.Models.Card({ list: this.model })
    });
    this.addSubview(".new_card", cardNewView);
  },

  events: {
    "click .destroy_list": "destroyList",
    "dblclick span.title": "editTitle",
    "blur .edit_list_title": "saveEdit"
  },

  destroyList: function() {
    this.model.destroy();
  },

  addCard: function(card) {
    var cardShowView = new Trellino.Views.CardShow({
      model: card
    });
    this.addSubview(".cards", cardShowView);
    cardShowView.render();
  },

  removeCard: function(card) {
    var cardShowView =
      _(this.subviews()[".cards"]).find(function (subview) {
        return subview.model == card;
      });

    this.removeSubview(".cards", cardShowView);
  },

  editTitle: function() {
    var $title = this.$(event.target);
    var id = $title.data("list");
    this.$("form[data-list="+ id +"]").toggleClass("hidden")
    $title.toggleClass("hidden")

    this.listenTo(this.model, "change", this.render);
  },

  saveEdit: function(event) {
    event.preventDefault();
    $title = this.$(event.target);
    this.model.save({ title: $title.val() });

    this.showHideEdits();
  },

  render: function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.renderSubviews();
    return this;
  }
});