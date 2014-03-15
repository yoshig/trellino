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
    var attrs = $(event.target.form).serializeJSON();
    var success = function() {
      Backbone.history.navigate("", {trigger: true })
    };

    if (this.model.isNew()) {
      this.collection.create(attrs, {
        success: success
      })
    } else {
      this.model.save(attrs, {
        success: success
      });
    }
  }
});