window.Trellino.Views.CardShow = Backbone.CompositeView.extend({
  tagName: 'li',
  template: JST["cards/show"],
  className: 'card_entry',

  events: {
    "mouseenter li.card_entry": "showDelete",
    "mouseleave li.card_entry": "hideDelete",
    "click .destroy_card": "destroyCard",
    "dblclick .modal-title": "beginCardEdit",
    "blur .edit_card_title": "endCardEdit"
  },

  beginCardEdit: function(event) {
    $(event.currentTarget).find(".card_title").toggleClass("hidden")
    $(event.currentTarget).find("form").toggleClass("hidden")
  },

  endCardEdit: function(event) {
    debugger
    event.preventDefault();
    $title = this.$(event.target);
    this.model.save({ title: $title.val() });
    $(event.currentTarget).toggleClass("hidden")
    $(event.currentTarget).parent().find(".card_title").toggleClass("hidden")
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