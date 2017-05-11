//Battlefield Logic
class Battleships {
  
  constructor() {

    console.log("created battleship");
    this.battlefield = ["B", "B", "B", "B", "",
                        "B", "", "", "", "B", 
                        "B", "", "", "", "", 
                        "B", "", "B", "B", "", 
                        "B", "", "", "", ""];

    this.player_guess = 0;
    this.hit = 0;
  };

  create_board() {
    var size = 5;
    console.log("Creating Board");
    var cell = "<td class=cell>Hi</td>";

    console.log(this.battlefield);
    $("#field").append("<tr>")
    for (var i = 0; i < this.battlefield.length; i++) {
      if (i%(size) == 0 && i != 0) {
        $("#field").append("</tr>",
                            "<tr>")
      }
      $("#field").append("<td><a href=\"#\" class=cell data-id=\"" + i + "\"></a></td>");
    };
  };

  checkWin() {
    var battlefield = this.battlefield;
    var guesses = this.player_guess
    console.log(battlefield);
    console.log("checking win");
    for (var i = 0; i < battlefield.length; i++) {
      if (battlefield[i] == "B") {
        return false;
      };
    };

    $(".win").addClass("active");
    $("#guesses").html(guesses)
    console.log("Win!");
    return true;
  };

  clickHandler(id) {
    var battlefield = this.battlefield;
    var checkWin = this.checkWin;
    //console.log(battlefield);
    //console.log(id);
    if (battlefield[id] != "") {
      battlefield[id] = "X";
      console.log("true");
      return true   
    } else {
      return false
    }
  };
};

//Event Handler
$(document).ready(function() {

  console.log("running main");
  var battleship = new Battleships();
  console.log(battleship);
  battleship.create_board();
  updateScore();
  
  function updateScore() {
    var accuracy 
    if (battleship.player_guess == 0) {
      accuracy = 0;
    } else {
      accuracy = ((battleship.hit/battleship.player_guess)*100).toFixed(2);
    }
    console.log("Updateing Score");
    $("#hits").html(battleship.hit);
    $("#cur_guess").html(battleship.player_guess);
    $("#accuracy").html(accuracy + "%");
  };

  //onclick
  $('.cell').click(function() {
    var id = $(this).data("id");
    if (battleship.clickHandler(id)) {
      battleship.player_guess += 1;
      battleship.hit += 1;
      console.log(battleship.player_guess);
      battleship.checkWin();
      $(this).addClass("hit");
    } else {
      battleship.player_guess += 1;
      $(this).addClass("miss");
    };
    updateScore();
  });

  $('#playagain').click(function() {
    //generate board function
    battleship.battlefield = ["", "B", "B", "B", ""];
    battleship.player_guess = 0;
    battleship.hit = 0;
    console.log(battleship.battlefield);
    //remove hit and miss class
    $(".cell").removeClass("hit miss");
    //hide win window
    $(".win").removeClass("active");
    updateScore();
    //resetScore

  });
});

