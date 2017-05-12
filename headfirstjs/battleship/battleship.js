//Battlefield Logic
class Battleships {

  constructor() {
    console.log("created battleship");
  };

  create_board() {
    //Create array and some variables
    this.battlefield = ["", "", "", "", "",
      "", "", "B", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", ""
    ];
    this.player_guess = 0;
    this.hit = 0;
    this.size = 5;
    console.log("Creating Board");
    let cell = "<td class=cell>Hi</td>";

    console.log(this.battlefield);

    //For each element in array, append a cell.
    $("#field").append("<tr>")
    for (var i = 0; i < this.battlefield.length; i++) {
      if (i % (this.size) == 0 && i != 0) {
        $("#field").append("</tr>",
          "<tr>")
      };
      $("#field").append("<td><a href=\"#\" class=cell data-id=\"" + i + "\"></a></td>");
    };
  };

  deploy() {
    let destroyer = [4, "D"];
    let submarine = [1, "S"];
    let battleship = [5, "B"];
    let corvette = [2, "C"];

    let ships = [battleship, destroyer, corvette, submarine];

    console.log("Placing Ships");
    console.log(ships.length);
    ships.splice(0, 1);
    console.log(ships.length);
    console.log(ships);



    let rand = ((Math.random()*(this.battlefield.length-1)).toFixed(0));
    console.log(rand);

    //Search for horizontal placement
    function placeShip(ship) {
      let symbol = ship[1];
      let size = ship[0];

      let possible_moves = [];

      for (let i = 0; i <= this.size - size; i++) {
        for (let j = 0; j < this.size; j++) {
          cur_cell = (j*5)+i;
          if (this.battlefield[cur_cell] == "") {
            console.log("Empty!");
            //if size 2, check next square
            all_empty = true;
            for (let k = 0; k < size - 1; k++) {
              if (this.battlefield[cur_cell + k] != "") {
                all_empty = false;
                break;
              }
            };
            if (all_empty == true) {
              possible_moves.push(cur_cell);
            }

            // if (size > 1 && this.battlefield[cur_cell+1] == "") {
            //   if (size > 2 && this.battlefield[cur_cell+2] == "") {
            //     if (size > 3 && this.battlefield[cur_cell+3] == "") {
            //       if (size > 4 && this.battlefield[cur_cell+5] == "") {
                    

            //       };
            //     };
            //   };
            // };
          };
          //end of first if
        };
      };
      console.log("Possible Moves are");
      console.log(possible_moves);
    }
    //Search for vertical placement
    placeShip(battleship);

    //while (ships.length > 0) {

    //}

  }

  checkWin() {
    let battlefield = this.battlefield;
    let guesses = this.player_guess;
    let accuracy = ((this.hit/guesses)*100).toFixed(2);
    console.log("Final accuracy is " + accuracy);
    console.log(battlefield);
    console.log("checking win");
    for (var i = 0; i < battlefield.length; i++) {
      if (battlefield[i] != "X" && battlefield[i] != "") {
        return false;
      };
    };

    $(".win").addClass("active");
    $("#guesses").html(guesses)
    $("#accuracyfinal").html(accuracy)
    console.log("Win!");
    return true;
  };

  clickHandler(id) {
    let battlefield = this.battlefield;
    let checkWin = this.checkWin;
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
  let battleship = new Battleships();
  console.log(battleship);
  battleship.create_board();
  battleship.deploy();
  updateScore();

  function updateScore() {
    let accuracy
    if (battleship.player_guess == 0) {
      accuracy = 0;
    } else {
      accuracy = ((battleship.hit / battleship.player_guess) * 100).toFixed(2);
    }
    console.log("Updateing Score");
    $("#hits").html(battleship.hit);
    $("#cur_guess").html(battleship.player_guess);
    $("#accuracy").html(accuracy + "%");
  };

  //onclick
  $('.cell').click(function() {
    let id = $(this).data("id");
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