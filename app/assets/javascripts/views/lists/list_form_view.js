window.Trellino.Views.ListFormView = Backbone.View.extend({
  template: JST["lists/form"],

  tagName: "li",

  className: "board_entry",

  events: {
    'click input[type="submit"]': "submit"
  },

  render: function() {
    var content = this.template({
      list: this.model,
      board: this.collection
    });

    this.$el.html(content);

    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = $(event.target.form).serializeJSON();
    var success = function() {
      Backbone.history.navigate("", {trigger: true})
    };

    if (this.model.isNew()) {
      this.collection.create(attrs, {
        succes: success
      })
    } else {
      this.model.save(attrs, {
        success: success
      });
    }
  }
})