window.Trellino.Views.ListShow = Backbone.CompositeView.extend({
  tagName: 'li',
  template: JST["lists/show"],
  className: 'board_entry',
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);

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
    "blur .edit_list_title": "saveEdit",
    "dropCard": "setCardOrder"
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

    $('#sortable.cards').sortable({
      placeholder: "card_holder",
      connectWith: "#sortable.cards",
      stop: function(event, ui) {
        ui.item.trigger('dropCard', ui)
      }
    });

    return this;
  },

  setCardOrder: function(event, ui) {
      var $list = $(ui.item)
      var prevRank = $list.prev().find("div").data("rank")
      var nextRank = $list.next().find("div").data("rank")
      var listId = $list.find("span").data("list")
      var list = this.model.lists().get({ id: listId })
      var newRank = list.get("rank");
      if (prevRank && nextRank) {
        newRank = (nextRank + prevRank) / 2;
        list.save( { rank: newRank } );
      } else if (prevRank) {
        newRank = (prevRank + (Math.ceil(prevRank))) / 2;
        list.save( { rank: newRank } );
      } else if (nextRank) {
        newRank = nextRank / 2;
        list.save( { rank: newRank } );
      }
      $list.find("div").data("rank", newRank);
  }
});