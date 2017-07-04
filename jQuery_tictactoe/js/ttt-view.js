class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();

  }
  bindEvents() {
    const $onclick = $("li").on("click", event => {
      event.preventDefault();
      const $clickedLineItem = $(event.currentTarget);
      this.makeMove($clickedLineItem);
    });
  }

  makeMove($square) {
    $square.addClass("clicked");

    try {
      this.game.playMove($square.data("pos"));
    }
    catch (err) {
      alert("That is not an empty square") ;
    }

    $square.text(`${this.game.currentPlayer}`);


    if (this.game.isOver()) {
      if (this.game.winner()) {
        $("p").text(`Congratulations ${this.game.currentPlayer.toUpperCase()}. You win!`);
      } else {
        $("p").text("Cat's game!");
      }

    }
  }


  setupBoard() {
    const $ul = $("<ul>");

    for (let i = 0; i < 3; i ++) {
      // let $eachLine = $ul.append($("<ul>"));
        for (let j = 0; j < 3; j ++) {
          let $li = $("<li>");
          $li.data("pos", [i, j]);
          $li.text("");
          $ul.append($li);

        }
    }
    this.$el.append($ul);
  }
}



module.exports = View;
