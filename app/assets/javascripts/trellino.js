window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    Trellino.boards = new Trellino.Collections.Boards();
    Trellino.boards.fetch();

    new Trellino.Routers.AppRouter({"$rootEl": $(".container")});

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellino.initialize();
});
