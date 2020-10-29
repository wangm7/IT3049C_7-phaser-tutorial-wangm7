


//window.onload = Player;
let player;
let cursors;

let stars;
let score = 0;
let scoreText;
let bombs;
let gameOver = false;
let text;
let Restart;
//check for an overlap between the player and any star in the stars Group. 
//If found then they are passed to the 'collectStar' function.
/**/

function collectStar (player, star){
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


function hitBomb (player, bomb){
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;

    if(gameOver){
        this.tittle_text = this.add.text(this.scale.width/2, this.scale.height/2, 'Game Over!', { fontSize: '40px', fill: '#000' });
        this.tittle_text.setOrigin(0.5);
        //this.sound = this.sound.add('themMusic');
        //Restart.setText("Restart");
        this.restartGameButton = new UiButton(
            this, 
            this.scale.width / 2, 
            this.scale.height * 0.65, 
            'btn_play_down', 
            'btn_play_over', 
            'Restart', 
            startScene.bind(this, 'GameScene')
        );
        
        
        /*
        this.input.once('pointerup', function (event) {
            //this.scene.start('game');
            location.reload();
        }, this);
        */
    }

}

function startScene(targetScene) {
    this.scene.start(targetScene);
}


class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }
    init(){
        this.scene.launch('UiScene');
    }
    create(){
        //background 
        let bg = this.add.image(0, 0, 'sky');
        bg.setOrigin(0, 0);
        //sound 
        let ding = this.sound.add('ding');
    ////////////////////////////////////
        //floor
        let platforms;
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
    ////////////////////////////////////
    
    ////////////////////////////////////
    //player
    player = new Player (this, 100, 450, 'dude',0);
    cursors = this.input.keyboard.createCursorKeys();
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

        ding.play();

    
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

        //cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        }

        update(){
           /* this.player.update(this.cursors);*/
            
            
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
        
}