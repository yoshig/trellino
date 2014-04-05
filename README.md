# Trello project!

### Phase I: Board Index

* To start I created a `BoardsIndex` view class. Its `render` function put an unordered list of our boards on the page.
* My Backbone router maps "/" to the `BoardsIndex` class.
* Then I created a new board view class, `BoardShow` so that I can create boards. On the index page, every board has a link to its show page.
* Boards have many lists, which is the next step...

### Phase II: Board Show and Lists

* From the board show page, you can see all of the lists that a particular board has. To start, I just displayed a list's name, given that at the moment it has no other content.
* One of thet tricky parts was making sure that the lists are always displayed in the correct order. I overwrote the `comparator` method of the `lists` collection so that they are shown by their rank. By default, a new list is added to the end, but other a user has the ability to move lists around as they see fit via drag and drop (Using JQueryUI's sortable function).
* When the user creates a board, it redirects them to the board's show page using the router's `navigate` method for this.

### Phase III: Cards

* I made the board show page also show the cards for each list. Again, I overwrote the the default comparator method to sort cards by `rank`. It was a little tricky to move cards from one list to another, since the rank of one list is different from another list. I changed the algorithm for sorting, so that a card's rank is equal to the average of the card above it and the card below it. If a card is at the beginning, it's rank is equal to the rank below it (the second card) divided by 2. If the card is the last card, I just added 1 to the rank above it (the second to last card).


There is a lot of CSS, HTML and JQuery work that needs to (and is in the process of) being done, such as dragging cards adds a tilt when they are moved, and making the board in general prettier. Hovering over elements that can be changed should let the user know that it can be changed by highlighting the element. The functionality of the cards and lists is what was really interesting to me, since deep nesting of boards and lists and cards is something I had not tried much of before this project.o do, then do them and add them to these instructions.
