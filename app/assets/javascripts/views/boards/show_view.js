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
    "click .current_title": "beginBoardEdit",
    "blur .edit_board_title": "endBoardEdit",
    "draggable li.board_entry": "moveList",
    "dropList": "setListOrder",
    "mouseenter li.board_entry": "showDropdown",
    "mouseleave li.board_entry": "hideDropdown",
  },

  // Have two separate events in case mouse enter leave is unsynced
  showDropdown: function(event) {
    $(event.target).find('.dropdown').removeClass('hidden');
  },

  hideDropdown: function(event) {
    $(event.target).find('.dropdown').addClass('hidden');
  },

  moveList: function() {
    console.log("moving")
  },

  beginBoardEdit: function() {
    var $title = this.$(".board_title");
    this.showHideEdits();
    this.$(".edit_board_title input").focus()

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
      start: function(event, ui) {
        ui.item.toggleClass('tilted');
      },
      stop: function(event, ui) {
        ui.item.toggleClass('tilted');
        ui.item.trigger('dropList', ui);
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
      } else if (prevRank) {
        newRank = (prevRank + (Math.ceil(prevRank))) / 2;
      } else if (nextRank) {
        newRank = nextRank / 2;
      }
      list.save( { rank: newRank } );
      $list.find("div").data("rank", newRank);
  },

  showHideEdits: function() {
    this.$(".current_title").toggleClass("hidden")
    this.$(".edit_board_title").toggleClass("hidden")
  },
});