//Declaring a function

function sayHello() {
  document.write('Hello!');
}

//Calling a function

sayHello();

//Function with variables

function getArea(width, height) {
  return width * height
}

//Function expression(Annoynomous Function) - Not processed until the interpreter has discovered it

var area = function(width, height) {
  return width * height;
};

var size = area(3, 4);

//Immediately invoked function expressions (IIFE)
//The last parenthesis tells javascript that this is IIFE

var area = (function() {
  var width = 3;
  var height = 2;
  return width * height;
}());

//Variables Scope

function getArea(width, height) {
  var area = width * height;       //Local variable is defined inside function
  return area;
}

var wallSize = getArea(3, 2);
document.write(wallSize)           //Global Variable is defined outside function

//Creating an Object

var hotel = {
  name: 'Quay',                       //Properties
  rooms: 40,
  booked: 25,

  checkAvailability: function() {      //Method
    return this.rooms - this.booked;
  }
}

//Accessing Object
var hotelName = hotel.name;
var hotelName = hotel['name'];
var roomsFree = hotel.checkAvailability;
var roomsFree = hotel['checkAvailability']();

var elName = document.getElementById('rooms');
elName.textContent = hotel.name

//Creating object: Constructor Notation

var hotel = new Object();

hotel.name = 'Quay';
hotel.rooms = 40;
hotels.booked = 25;

hotel.checkAvailability = function() {
  return this.rooms - this.booked;
};

//Deleting properties
delete hotel.name;

//Creating Many Objects
function Hotel(name, rooms, booked) {
  this.name = name; //Properties
  this.rooms = room;
  this.booked = booked;
  this.checkAvailability = function() { //Method
    return this.rooms - this.booked;
  };
}

var quayHotel = new Hotel('Quay', 40, 25);
