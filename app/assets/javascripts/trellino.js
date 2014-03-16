window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    Trellino.boards = new Trellino.Collections.Boards();
    Trellino.boards.fetch({
      success: function() {
        new Trellino.Routers.AppRouter({"$rootEl": $("#content")});
        Backbone.history.start();
      }
    });
  }
};

// Backbone.CompositeView = Backbone.View.extend({
//
// });

$(document).ready(function(){
  Trellino.initialize();
});