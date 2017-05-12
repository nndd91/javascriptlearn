//Battlefield Logic
class Battleships {

  constructor() {
    console.log("created battleship");
  };

  create_board() {
    //Create array and some variables
    this.battlefield = ["", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", ""
    ];
    this.player_guess = 0;
    this.hit = 0;
    this.shipcount;
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
  
  resetBoard() {
    this.battlefield = ["", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", ""
    ];
    this.player_guess = 0;
    this.hit = 0;
    this.deploy();
  }

  deploy() {
    let battleship = [5, "B"];
    let destroyer = [4, "D"];  
    let corvette = [3, "C"];
    let frigate = [2, "F"];
    let submarine = [1, "S"];

    let ships = [battleship, destroyer, corvette, submarine];
    let battlefield = this.battlefield;
    let fieldsize = this.size;

    console.log("Placing Ships");
    console.log(ships.length);
    ships.splice(0, 1);
    console.log(ships.length);
    console.log(ships);

    //Function to search for possible move then place a ship
    function placeShip(ship) {
      let symbol = ship[1];
      let shipsize = ship[0];
      let cur_cell, all_empty;
      let possible_hor_moves = [];
      let possible_ver_moves = [];
      let rand;
      
      console.log("Shipsize is " + shipsize);
      console.log("Field size is " + fieldsize);

      //Search for horizontal placement
      for (let i = 0; i <= fieldsize - shipsize; i++) {
        for (let j = 0; j < fieldsize; j++) {
          cur_cell = (j*fieldsize)+i;
          if (battlefield[cur_cell] == "") {
            //console.log("Empty!");
            //if size 2, check next square
            all_empty = true;
            for (let k = 0; k < shipsize - 1; k++) {
              if (battlefield[cur_cell + k] != "") {
                all_empty = false;
                break;
              };
            };
            //If all empty, add to array of possiblemove
            if (all_empty == true) {
              possible_hor_moves.push(cur_cell);
            };
          };
        };
      };

      //Search for vertical placement
      for (let i = 0; i <= fieldsize - shipsize; i++) {
        for (let j = 0; j < fieldsize; j++) {
          cur_cell = (j+(i*fieldsize));
          if (battlefield[cur_cell] == "") {
            //console.log("Empty!");
            //if size 2, check next square
            all_empty = true;
            for (let k = 0; k < shipsize - 1; k++) {
              if (battlefield[cur_cell + (k*fieldsize)] != "") {
                all_empty = false;
                break;
              };
            };
            //If all empty, add to array of possiblemove
            if (all_empty == true) {
              possible_ver_moves.push(cur_cell);
            };
          };
        };
      };
      console.log("Possible Moves are");
      console.log(possible_hor_moves);
      console.log(possible_ver_moves);
      //Place Ship
      let ver_or_hor = (Math.floor(Math.random() * 6) + 1  );
      console.log("Ver or hor is " + ver_or_hor);

      //If any of the list of move is empty, just use the other list.
      if (possible_hor_moves.length == 0) {
        console.log("No moves available for horizontal, ver_or_hor should be 1");
        ver_or_hor = 1;
        console.log(ver_or_hor);
      } else if (possible_ver_moves.length == 0) {
        console.log("No moves available for vertical, ver_or_hor should be 2");
        ver_or_hor = 2;
        console.log(ver_or_hor);
      };

      if (ver_or_hor%2 == 0) {
        //Place Horizontally
        rand = (Math.floor(Math.random() * (possible_hor_moves.length-1)));
        let first_cell = possible_hor_moves[rand];

        console.log("Placing Horizontally at " + first_cell);

        battlefield[first_cell] = symbol;
        for (let i = 0; i <= shipsize - 1; i++) {
            battlefield[first_cell+i] = symbol;
        };
      } else {
        //Place Vertically
        rand = (Math.floor(Math.random() * (possible_ver_moves.length-1)));
        let first_cell = possible_ver_moves[rand];
        console.log("Placing Vertically at " + first_cell);
        battlefield[first_cell] = symbol;
        for (let i = 0; i <= shipsize - 1; i++) {
            battlefield[first_cell+(i*fieldsize)] = symbol;
        };
      }

      possible_hor_moves = [];
      possible_ver_moves = [];
    }
    //Place Ships
    placeShip(battleship);
    placeShip(destroyer);
    placeShip(corvette);
    placeShip(frigate);
    placeShip(submarine);

    console.log(battlefield);
    this.countShips();
  }

  countShips() {
    let shipcount = 0;
    console.log("Starting shipcount");
    console.log(this.battlefield);
    for (var i = 0; i < this.battlefield.length; i++) {
      if (this.battlefield[i] != "") {
        shipcount += 1;
      };
    }
    console.log("Shipcount is  " + shipcount);
    this.shipcount = shipcount;

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
    $("#shipsleft").html(battleship.shipcount);
  };

  //onclick
  $('.cell').click(function() {
    let id = $(this).data("id");
    if (battleship.clickHandler(id)) {
      battleship.player_guess += 1;
      battleship.hit += 1;
      battleship.shipcount -= 1;
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
    battleship.resetBoard();
    console.log(battleship.battlefield);
    //remove hit and miss class
    $(".cell").removeClass("hit miss");
    //hide win window
    $(".win").removeClass("active");
    updateScore();
    //resetScore

  });
});