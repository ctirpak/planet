/**
 * 
 * @type Number
 * @description Width (spacing) between each background tile
 */
var XSPACING = 101;
/**
 * 
 * @type Number
 * @description Height (spacing) between each background tile
 */
var YSPACING = 83;
/**
 * 
 * @type Number
 * @description Number of columns in playfield
 */
var COLUMNS = 10;
/**
 * 
 * @type Number
 * @description Number of rows in playfield
 */
var ROWS = 10;
/**
 * 
 * @type Number
 * @description Number of tiles the player can access in playfield
 */
var PLAYABLETILES = (ROWS - 1) * COLUMNS;	//tiles that the player can access
var DANGERTILES = (ROWS - 2) * COLUMNS;	//tiles that aren't 'safe'

var STARTGAMELEVEL = 1;
var ENEMYROWS = 7;
var PLAYERSTARTY = 8;
var PLAYERSTARTX = 2;

var MINSPEEDFACTOR = 50;
var LEVELSPEEDFACTOR = 20;

var MSGDISPLENFACTOR = 3;
var ITEMDISPLENFACTOR = 3;
var ITEMNODISPLENFACTOR = 10;
var ITEMNODISPLENFACTORINITIAL = 5;
var ITEMROWS = 2;		//used to figure out row to display item on. always starts on row 1 and ends on ITEMROWS + 1

var CANVASWIDTH = 1010;
var CANVASHEIGHT = (ROWS * 100) + ROWS;

var SCORELOSS = 100;
var HEARTLOSS = 1;

var GAMELEVELFACTORINCR = .6;

var TIMEBONUSFACTOR = 1.5;
var BLUEGEMSCORE = 25;
var GREENGEMSCORE = 25;
var ORANGEGEMSCORE = 25;
var KEYSCORE = 75;
var HEARTSCORE = 100;
var STARSCORE = 125;
var STONESCORE = 125;
var FINISHSCORE = 100;

var HEARTSTARTCOUNT = 5;

var TILEMULTIPLIER = 0.957142857142857;  //multiply times number of rows to get position of score


/** List of ITEMS that can be displayed */
var ITEMS = [
	'images/Gem Blue.png',
	'images/Gem Green.png',
	'images/Gem Orange.png',
	'images/Key.png',
	'images/Heart.png',
	'images/Star.png',
	'images/Rock.png'
];
/** Name of ITEMS */
var ITEMNAMES = [
	'Blue Gem',
	'Green Gem',
	'Gold Gem',
	'Key',
	'Heart',
	'Star',
	'Rock'
];
