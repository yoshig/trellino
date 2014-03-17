window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  initialize: function() {
    var that = this;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "remove", this.removeList);

    this.model.lists().fetch( {
      success: function() {
        that.model.lists().sort();
        that.model.lists().each(that.addList.bind(that));
        that.listenTo(that.model.lists(), "add", that.addList);
      }
    })

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
    "dropList": "setListOrder"
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

    $('#sortable.lists').sortable({
      placeholder: "list_holder",
      stop: function(event, ui) {
        ui.item.trigger('dropList', ui)
      }
    });

    return this;
  },

  setListOrder: function(event, ui) {
      var $list = $(ui.item)
      var prevRank = $list.prev().find("div").data("rank")
      var nextRank = $list.next().find("div").data("rank")
      var listId = $list.find("span").data("list")
      var list = this.model.lists().get({ id: listId })
      var newRank = list.get("rank");
      if (prevRank && nextRank) {
        newRank = (nextRank + prevRank) / 2;
        list.save( { rank: newRank } );
      } else if (prevRank) {
        newRank = (prevRank + (Math.ceil(prevRank))) / 2;
        list.save( { rank: newRank } );
      } else if (nextRank) {
        newRank = nextRank / 2;
        list.save( { rank: newRank } );
      }
      $list.find("div").data("rank", newRank);
  },

  showHideEdits: function() {
    this.$(".current_title").toggleClass("hidden")
    this.$(".edit_board_title").toggleClass("hidden")
  },
});