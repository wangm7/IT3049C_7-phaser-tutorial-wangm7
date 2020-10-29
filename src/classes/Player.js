class Player extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene, x, y, frame) {
        super(scene, x, y, frame);
        this.scene = scene;
        this.x = x;
        this.y = y;
        //this.frame = frame;
        //enable phsuscs scene.physics.world.enable() 
        this.scene.physics.world.enable(this);
        //set immovable if another object collides with out player
        this.setImmovable(false);
        scene.add.existing(this);
        scene.events.on('update', this.update, this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.body.setGravityY(300);
        this.body.setBounce(0.2);
        
      }
       /*
      createAnimations() {
          //turn
          scene.anims.create({
              key: 'turn',
              frames: [ { key: 'dude', frame: 4 } ],
              frameRate: 20,
            })
            //left
            scene.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            }) 
            //left
            scene.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            })
            this.anims.play('turn')
        }
      
        createKey(cursors){
            //CREATE KEY CURSORS 
            scene.cursors = scene.input.keyboard.createCursorKeys()
            scene.keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
            scene.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
            scene.keyZ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
            scene.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)

            scene.events.on(Phaser.Scenes.Events.UPDATE, this.handleMovement, this)
        }
        


        handleMovement(){
            let speedX = 260;
        
            if (this.scene.cursors.left.isDown || this.scene.keyQ.isDown) {
                this.setVelocityX(-speedX)
                this.play('left', true)
            }
            else if (this.scene.cursors.right.isDown || this.scene.keyD.isDown) {
                this.setVelocityX(speedX);

                this.play('right', true)
            } else
            {
                this.body.setVelocityX(0);
                this.anims.play('turn');
            }

            if (cursors.up.isDown && this.body.touching.down)
            {
                this.body.setVelocityY(-450);
            }
        }


      update(cursors) {
        this.cursors = scene.cursors;
        createKey(this.cursors);
        
    }
       */
}
