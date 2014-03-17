window.Trellino.Models.TodoItem = Backbone.Model.extend({
  urlRoot: function() {
   return "cards/" + this.get("card_id") + "/todo_items"
  }
});