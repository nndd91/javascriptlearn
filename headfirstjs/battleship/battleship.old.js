//Battlefield Script
var battleship = {

  battlefield: ["", "B", "B", "B", ""],
  player_guess: 0,
  guesses: 0,
  win: false,

  create_board: function() {
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
  },

  checkWin: function(battlefield) {

    console.log("checking win");
    for (var i = 0; i < battlefield.length; i++) {
      if (battlefield[i] == "B") {
        return false;
      };
    };
    $(".win").addClass("active");
    console.log("Win!");
    return true;
  },

  clickHandler: function() {
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
      checkWin(battlefield);
    });

    $('#playagain').click(function() {
      //generate board function
      battlefield = ["", "B", "B", "B", ""];
      console.log(battlefield);
      //remove hit and miss class
      $(".cell").removeClass("hit miss");
      //hide win window
      $(".win").removeClass("active");
    });

  }
};

function main() {
  console.log("running main");
  console.log(battleship);
  battleship.create_board();
  battleship.clickHandler();
};

main();