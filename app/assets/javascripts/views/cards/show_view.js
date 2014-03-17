window.Trellino.Views.CardShow = Backbone.View.extend({
  tagName: 'li',
  template: JST["cards/show"],
  className: 'card_entry',

  events: {
    "mouseenter li.card_entry": "showDelete",
    "mouseleave li.card_entry": "hideDelete",
    "click .destroy_card": "destroyCard"
  },

  render: function() {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },

  destroyCard: function(event) {
    this.model.destroy();
  },

  showDelete: function(event) {
    $(event.target).find('button').removeClass('hidden')
  },

  hideDelete: function(event) {
    $(event.target).find('button').addClass('hidden')
  }
})