window.Trellino.Views.CardShow = Backbone.CompositeView.extend({
  tagName: 'li',
  template: JST["cards/show"],
  className: 'card_entry',

  events: {
    "mouseenter li.card_entry": "showDelete",
    "mouseleave li.card_entry": "hideDelete",
    "click .destroy_card": "destroyCard",
    "click .card_title": "beginCardEdit",
    "blur .edit_card_title": "endCardEdit"
  },

  initialize: function(options) {
    this.parent = options.parent
  },

  beginCardEdit: function(event) {
    $(event.currentTarget).toggleClass("hidden")
    $(event.currentTarget).parent().find("form").toggleClass("hidden")
  },

  endCardEdit: function(event) {
    var that = this
    var title = $(event.target)
    this.model.save({ title: $(event.target).val() }, {
      success: function() {
        $(event.target).parent().toggleClass("hidden")
        var new_title = $(event.target).parent().parent().find(".card_title")
        new_title.toggleClass("hidden")
        new_title.html(that.model.escape("title"))
        $('.modal').on('hidden', function () {
          that.parent.render();
        })
      }
    });
  },

  render: function() {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
    var that = this
  },

  destroyCard: function(event) {
    $('.modal').modal('hide')
    this.model.destroy();
  },

  showDelete: function(event) {
    console.log("WHAT")
    $(event.target).find('button').removeClass('hidden')
  },

  hideDelete: function(event) {
    $(event.target).find('button').addClass('hidden')
  }
})