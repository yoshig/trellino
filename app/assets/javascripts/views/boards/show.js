window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "remove", this.removeList);

    this.model.lists().each(this.addList.bind(this));

    var listNewView = new Trellino.Views.ListFormView({
      board: this.model,
      model: new Trellino.Models.List({ board: this.model })
    });
    this.addSubview(".new_list", listNewView);
  },

  events: {
    "dblclick div.board_title": "beginBoardEdit",
    "blur .edit_board_title": "endBoardEdit",
    "draggable li.board_entry": "moveList",
    "drop": "setListOrder"
  },

  moveList: function() {
    console.log("moving")
  },

  beginBoardEdit: function() {
    var $title = this.$(".board_title");
    this.showHideEdits();

    this.listenTo(this.model, "change", this.render);
  },

  endBoardEdit: function(event) {
    event.preventDefault();
    $title = this.$(event.target);
    this.model.save({ title: $title.val() });

    this.showHideEdits();
  },

  addList: function(list) {
    var listsShowView = new Trellino.Views.ListShow({
      model: list
    });
    this.addSubview(".lists", listsShowView);
    listsShowView.render();
  },

  removeList: function(list) {
    var listShowView =
      _(this.subviews()[".lists"]).find(function (subview) {
        return subview.model == list;
      });

    this.removeSubview(".lists", listShowView);
  },

  render: function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.renderSubviews();

    $('ul').sortable({
      axis: 'x',
      stop: function(event, ui) {
        ui.item.trigger('drop',
                        [ui.item.index(),
                        $(ui.item.children()[0]).data("rank")])
      }
    });

    return this;
  },

  setListOrder: function(event, index, rank) {
    debugger
    var movedList = this.model.lists().get(rank)
    movedList.save({ rank: index })
    if (index > rank ){
      for (var i = rank + 1; i <= index; i++) {
        var list = this.model.lists().get(i)
        list.save({ rank: i - 1 })
      }
    } else {
      for (var i = index; i <= rank - 1; i++) {
        var list = this.model.lists().get(i)
        list.save({ rank: i + 1 })
      }
    }
  },

  showHideEdits: function() {
    this.$(".current_title").toggleClass("hidden")
    this.$(".edit_board_title").toggleClass("hidden")
  },
});