//Battlefield Script
class Battleships {

  constructor() {

    console.log("created battleship");
    this.battlefield = ["", "B", "B", "B", ""];

    var player_guess;
    var guesses;
    var win = false;
  };

  create_board() {
    console.log("Creating Board");
    var cell = "<td class=cell>Hi</td>";
    /*
    for (var i = 0; i < battlefield.length; i++) {
      for (var j = 0; j < battlefield[i].length; j++) {
        $("#battlefield").append("<td class=cell id=\"cell" + i+j + "\">Hi</td>");
      }
    }
    */
    console.log(this.battlefield);
    for (var i = 0; i < this.battlefield.length; i++) {

      $("#field").append("<td><a href=\"#\" class=cell data-id=\"" + i + "\">Hi</a></td>");
    };
  };

  checkWin() {
    var battlefield = this.battlefield;
    console.log("checking win");
    for (var i = 0; i < battlefield.length; i++) {
      if (battlefield[i] == "B") {
        return false;
      };
    };
    $(".win").addClass("active");
    console.log("Win!");
    return true;
  };

  clickHandler() {
    var battlefield = this.battlefield;
    var checkWin = this.checkWin;

    $('.cell').click(function() {
      var id = $(this).data("id");
      console.log(battlefield);
      console.log(id);
      if (battlefield[id] != "") {
        battlefield[id] = "X";
        $(this).addClass("hit");
      } else {
        $(this).addClass("miss");
      }
      checkWin;
    });
  };

};

function main() {
  console.log("running main");
  var battleship = new Battleships();
  console.log(battleship);
  battleship.create_board();
  battleship.clickHandler();
};

main();