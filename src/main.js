/** @type {import("../typings/phaser")} */
/*
window.onload = function(){
}

import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";

    //scene:[LoadScene, MenuScene]

*/
let config = {
    type: Phaser.AUTO,
    width:800,
    height:600,
    //backgroundColor: 0x000000,    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
            
        }
    },
    scene: {
        init:init,
        preload: preload,
        create: create,
        update: update
    },
    scale:{
        zoom:2,
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    }

};


function init(){

}

function preload(){
    //this.load.image('delga', 'assets/images/delga.jpg');
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.spritesheet('dude', 'assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });

}

let platforms;
let player;
let cursors;
let stars;
let score = 0;
let scoreText;
let bombs;
let gameOver = false;
let text;
let Restart;

function create(){

    //background
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    
////////////////////////////////////
    //floor
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
////////////////////////////////////


////////////////////////////////////
    //player
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);
    //player anime
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    //make collider effect with floor
    this.physics.add.collider(player, platforms);
    //cursors
    cursors = this.input.keyboard.createCursorKeys();
////////////////////////////////////


////////////////////////////////////////
    //starts
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //collision against the platforms.
    this.physics.add.collider(stars, platforms);
    //player overlaps with a star or not
    this.physics.add.overlap(player, stars, collectStar, null, this);
////////////////////////////////////

////////////////////////////////////////
    //The scoreText is set-up
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
////////////////////////////////////

////////////////////////////////////
    //bombs
    bombs = this.physics.add.group();
    //collision against the platforms.
    this.physics.add.collider(bombs, platforms);
    //player overlaps with a star or not
    this.physics.add.collider(player, bombs, hitBomb, null, this);
////////////////////////////////////

////////////////////////////////////
    //Using the Scene Data Plugin stores data on a Scene level
    text = this.add.text(200, 250, '', { font: '64px Courier', fill: '#0xff0000' });
    Restart = this.add.text(300, 300, '', { fontSize: '32px', fill: '#000' });
////////////////////////////////////

}

function update(){
    if (cursors.left.isDown)
    {
        player.setVelocityX(-260);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(260);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-450);
    }
}

//check for an overlap between the player and any star in the stars Group. 
//If found then they are passed to the 'collectStar' function.
function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}


//The bombs will of course bounce off the platforms, 
//and if the player hits them we'll call the hitBomb function. 
//All that will do is stop the game and turn the player red

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
    if(gameOver){
        text.setText("Game Over");
        Restart.setText("Restart");
        
        this.input.once('pointerup', function (event) {
            //this.scene.start('game');
            location.reload();
        }, this);
        
    }
}

/*
let MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'mainmenu' });
        window.MENU = this;
    },

    create: function ()
    {
        console.log('%c MainMenu ', 'background: green; color: white; display: block;');

        let bg = this.add.text(250, 300, 'Restart', { fontSize: '32px', fill: '#000' });
        //let text = this.add.image(0, 0, 'buttonText');

        let container = this.add.container(400, 300, [ bg, text ]);

        bg.setInteractive();

        bg.once('pointerup', function () {

            this.scene.start('game');

        }, this);
    }

});
*/




let game = new Phaser.Game(config);

