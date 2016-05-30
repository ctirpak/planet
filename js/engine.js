/*
 * 		Front End Web Developer
 *		Project 3
 *			Video Game
 *		Chris Tirpak
 */

/**
 * @fileOverview Engine.js: This file provides the game loop functionality
 * (update entities and render), draws the initial game board on the screen,
 * and then calls the update and render methods on your player and enemy
 * objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
            win = global.window,
            canvas = doc.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            lastTime;

    canvas.width = CANVASWIDTH;
    canvas.height = CANVASHEIGHT;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        // run loop only if game is not paused

        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
                dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        if (resetKeyPressed) {
            reset();
        }
        if (!gamePaused) {
            update(dt);
        }
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        //reset();
        //alert("Press 'R' to start the game. Use arrow keys or W A S D to move your character. 'P' will pause the game.")
        //msg.showText("GAME OVER 'R' to Play");
        gameOver = false;
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update(dt);
        item.update(dt);
        msg.update(dt);
    }
    /**
     * Checks to see if the player and object are in the same tile
     * 
     * @returns {undefined}
     */
    function checkCollisions() {
        // check to see if player got an item
        if (item.visible) {
            if (player.tile === item.tile &&
                    player.tile !== -1) {
                //alert('You got a ' + item.sprite + playerRight + ', ' + playerBottom + ', ' + playerRight + ', ' + playerBottom + '; ' + item.x + ', ' + item.y + ', ' + itemRight + ', ' + itemBottom)
                switch (item.itemNum) {
                    case 0:
                        player.blueGems += 1;
                        player.score += BLUEGEMSCORE + Math.floor(item.timeLeft * TIMEBONUSFACTOR);
                        item.visible = false;
                        break;
                    case 1:
                        player.greenGems += 1;
                        player.score += GREENGEMSCORE + Math.floor(item.timeLeft * TIMEBONUSFACTOR);
                        item.visible = false;
                        break;
                    case 2:
                        player.orangeGems += 1;
                        player.score += ORANGEGEMSCORE + Math.floor(item.timeLeft * TIMEBONUSFACTOR);
                        item.visible = false;
                        break;
                    case 3:
                        player.keys += 1;
                        player.score += KEYSCORE + Math.floor(item.timeLeft * TIMEBONUSFACTOR);
                        item.visible = false;
                        break;
                    case 4:
                        player.hearts += 1;
                        player.score += HEARTSCORE + Math.floor(item.timeLeft * TIMEBONUSFACTOR);
                        item.visible = false;
                        break;
                    case 5:
                        player.stars += 1;
                        player.score += STARSCORE + Math.floor(item.timeLeft * TIMEBONUSFACTOR);
                        item.visible = false;
                        break;
                    case 6:
                        player.stones += 1;
                        player.score += STONESCORE + Math.floor(item.timeLeft * TIMEBONUSFACTOR);
                        item.visible = false;
                        break;
                }


                msg.showText('You got a ' + ITEMNAMES[item.itemNum] + '! +' + Math.floor(item.timeLeft * TIMEBONUSFACTOR));
            }
        }
        // check to see if player made it to the top
        if ((player.tile < COLUMNS) &&
                (player.tile >= 0)) {
            player.y = PLAYERSTARTY * YSPACING;
            player.x = PLAYERSTARTX * XSPACING;
            player.score += FINISHSCORE;
            player.cross += 1;
            gameLevel += GAMELEVELFACTORINCR;
            player.inPlay = false;
            var timeBonus = Math.floor((new Date() - player.timeInPlay) / 100);
            msg.showText('You made it!! +' + timeBonus);
            player.score += timeBonus;
        }
        // check to see if a player got hit by a bug
        if ((player.visible === true) &&
                player.tile !== -1) {
            allEnemies.forEach(function (enemy) {
                if (enemy.tile === player.tile) {
                    msg.showText('OUCH! -100');
                    player.y = PLAYERSTARTY * YSPACING;
                    player.x = PLAYERSTARTX * XSPACING;
                    player.inPlay = false;
                    if (player.hearts > 1) {
                        player.hearts -= HEARTLOSS;
                        player.score -= SCORELOSS;
                    } else {
                        // game over
                        player.hearts -= HEARTLOSS;
                        player.score -= SCORELOSS;
                        msg.showText("GAME OVER - 'R' to Play");
                        gameOver = true;
                    }
                    return true;
                }
            });
        }
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var ROWIMAGES = [
            'images/Water Block.png', // Top row is water
            'images/Stone Block.png', // Row 1 of 3 of stone
            'images/Stone Block.png', // Row 2 of 3 of stone
            'images/Stone Block.png', // Row 3 of 3 of stone
            'images/Stone Block.png', // Row 3 of 3 of stone
            'images/Stone Block.png', // Row 3 of 3 of stone
            'images/Grass Block.png', // Row 1 of 2 of grass
            'images/Grass Block.png', // Row 1 of 2 of grass
            'images/Grass Block.png', // Row 2 of 2 of grass
            'images/grass-block-2.png'    // instructions row
        ],
                NUMROWS = ROWS,
                NUMCOLS = COLUMNS,
                row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the ROWIMAGES array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < NUMROWS; row++) {
            for (col = 0; col < NUMCOLS; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(ROWIMAGES[row]), col * XSPACING, row * YSPACING);
            }
        }


        renderScore();
        renderEntities();
        renderInstructions();

        // add visual effect to canvas if the game is over
        if (gameOver) {
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var pixels = imageData.data;
            for (var i = 0; i < pixels.length; i += 4) {
                pixels[i] = 255 - pixels[i];   // red
                pixels[i + 1] = 255 - pixels[i + 1]; // green
                pixels[i + 2] = 255 - pixels[i + 2]; // blue
                // i+3 is alpha (the fourth element)
            }

            // overwrite original image
            ctx.putImageData(imageData, 0, 0);
        }

    }
    function renderScore() {
        var i; // index number of ITEMS
        var y = (YSPACING * ROWS * TILEMULTIPLIER); // y location of score
        var x = 0; // x location of score
        var XGAP = 53; // gap between score items
        var TEXTGAP = 25; // gap between item and text
        // Score
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.font = '13px Helvetica';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        // draw ITEMS
        for (var i in ITEMS) {
            ctx.drawImage(Resources.get(ITEMS[i]), x, y, YSPACING / 4, XSPACING / 4);
            x += XGAP;
        }
        // draw scores
        x = 0;
        y += 8; // tweak y to show in the correct place
        x += TEXTGAP;
        ctx.fillText(player.blueGems, x, y);
        x += XGAP;
        ctx.fillText(player.greenGems, x, y);
        x += XGAP;
        ctx.fillText(player.orangeGems, x, y);
        x += XGAP;
        ctx.fillText(player.keys, x, y);
        x += XGAP;
        ctx.fillText(player.hearts, x, y);
        x += XGAP;
        ctx.fillText(player.stars, x, y);
        x += XGAP;
        ctx.fillText(player.stones, x, y);
        x = 0;
        y -= 20;
        ctx.fillText('SCORE: ' + player.score, x, y);
        x += XGAP * 2;
        //ctx.fillText('Trips made: ' + player.cross + '  Level: ' + Math.floor(gameLevel), x, y);
        ctx.fillText('Level: ' + Math.floor(gameLevel), x, y);


        /**
         'images/Gem Green.png',
         'images/Gem Orange.png',
         'images/Key.png',
         'images/Heart.png',
         'images/Star.png',
         */
    }
    /**
     * 
     * @returns {undefined}
     * @description adds instructions to canvas
     */
    function renderInstructions() {
        var y = (YSPACING * ROWS * TILEMULTIPLIER); // y locatino of directions
        var x = 10; // x location
        var YGAP = 15; // gap between rows
        // Score
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.font = 'bold 13px Helvetica';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        // draw instructions
        y += 20;
        ctx.fillText('How to play:', x, y);
        y += YGAP;
        ctx.fillText('Move your player to the water without getting hit. Collect the items. You will get', x, y);
        y += YGAP;
        ctx.fillText('an extra bonus the quicker you collect the items and the longer you stay alive!', x, y);
        y += YGAP;
        ctx.fillText('Arrow keys or WASD to move', x, y);
        y += YGAP;
        ctx.fillText('P to pause the game, number 1 through 5 to change your character', x, y);
        y += YGAP;
        ctx.fillText('R to start a new game after your game is over', x, y);
    }
    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });

        player.render();
        item.render();
        msg.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // reset game data to start new game
        player.hearts = HEARTSTARTCOUNT;
        player.keys = 0;
        player.blueGems = 0;
        player.greenGems = 0;
        player.orangeGems = 0;
        player.stars = 0;
        player.stones = 0;
        player.score = 0;
        player.cross = 0;
        player.x = PLAYERSTARTX * XSPACING;
        player.y = PLAYERSTARTY * YSPACING;
        msg.showText('Welcome!');
        gameOver = false;
        resetKeyPressed = false;
        gameLevel = STARTGAMELEVEL;

    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/Brown Block.png',
        'images/Character Boy.png',
        'images/Character Cat Girl.png',
        'images/Character Horn Girl.png',
        'images/Character Pink Girl.png',
        'images/Character Princess Girl.png',
        'images/Chest Closed.png',
        'images/Chest Lid.png',
        'images/Chest Open.png',
        'images/Dirt Block.png',
        'images/Door Tall Closed.png',
        'images/Door Tall Open.png',
        'images/Enemy Bug.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Grass Block.png',
        'images/grass-block-2.png',
        'images/Heart.png',
        'images/Key.png',
        'images/Plain Block.png',
        'images/Ramp East.png',
        'images/Ramp North.png',
        'images/Ramp South.png',
        'images/Ramp West.png',
        'images/Rock.png',
        'images/Roof East.png',
        'images/Roof North East.png',
        'images/Roof North West.png',
        'images/Roof North.png',
        'images/Roof South East.png',
        'images/Roof South West.png',
        'images/Roof South.png',
        'images/Roof West.png',
        'images/Selector.png',
        'images/Shadow East.png',
        'images/Shadow North East.png',
        'images/Shadow North West.png',
        'images/Shadow North.png',
        'images/Shadow Side West.png',
        'images/Shadow South East.png',
        'images/Shadow South West.png',
        'images/Shadow South.png',
        'images/Shadow West.png',
        'images/SpeechBubble.png',
        'images/Star.png',
        'images/Stone Block Tall.png',
        'images/Stone Block.png',
        'images/Tree Short.png',
        'images/Tree Tall.png',
        'images/Tree Ugly.png',
        'images/Wall Block Tall.png',
        'images/Wall Block.png',
        'images/Water Block.png',
        'images/Window Tall.png',
        'images/Wood Block.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
    global.canvas = canvas;
})(this);
