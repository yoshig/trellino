window.Trellino.Views.BoardFormView = Backbone.View.extend ({
  events: {
    'click input[type="submit"]': "submit"
  },

  template: JST["boards/form"],

  render: function() {
    var content = this.template({ board: this.model });

    this.$el.html(content);

    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var that = this;
    var attrs = $(event.target.form).serializeJSON()["board"];

    this.collection.create(attrs, {
      success: function() {
        Backbone.history.navigate("boards/" +
          that.collection.last().id, {trigger: true })
      }
    })
  }
});