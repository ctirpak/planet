/*
 * 		Front End Web Developer
 *		Project 3
 *			Video Game
 *		Chris Tirpak
 */
/**
 * fileOverview test file to understand how objects and inheritance works
 */

/**
 * class car
 * description Generic Car class
 * param {string} n Name of car
 * property {string} name Location of car
 * property {number} loc Location of car
 * returns {car}
 */
var car = function (n) {
	/**
	 * memberOf car
	 */
	this.name = n;
	this.loc = 0;
	console.log('constructor: ' + this.name);
};
/**
 * Increments location by 1
 */
car.prototype.move = function () {
	/**
	 * memberOf car
	 */
	this.loc += 1;
	console.log(this.name + '.move: ' + this.loc);
};

/**
 * class truck
 * description extends car class. trucks move at the same speed as cars.
 * augments car
 * param {string} n Name of truck
 * returns {truck}
 */
var truck = function (n) {
	/**
	 * memberOf truck
	 */
	car.call(this, n);
};
/**
 * memberOf truck
 */
truck.prototype = Object.create(car.prototype);
/**
 * memberOf truck
 */
truck.constructor = truck;

/**
 * class van
 * description Extends car class. Vans move at the speed of a car, plus an additional 2.
 * augments car
 * param {string} n Name of van
 * returns {van}
 */
var van = function (n) {
	/**
	 * memberOf van
	 */
	car.call(this, n);
};
/**
 * memberOf van
 */
van.prototype = Object.create(car.prototype);
/**
 * memberOf van
 */
van.constructor = van;
/**
 * Van increments loc by 2
 */
van.prototype.move = function () {
	/**
	 * memberOf van
	 */
	car.prototype.move.call(this);
	this.loc += 2;
	console.log(this.name + '.move: ' + this.loc);
};

var c = new car('car1');
var t = new truck('truck1');
var v = new van('van1');

c.move();
t.move();
v.move();
v.move();
t.move();
c.move();
