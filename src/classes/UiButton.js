class UiButton extends Phaser.GameObjects.Container{
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
      super(scene, x, y);
      this.debug = false;

      this.scene = scene;// the scene this container will be added to
      this.x = x; //x postion of container
      this.y = y; // y postion of container 
      this.key = key; // bcakground image of button
      this.hoverKey = hoverKey;//btn image
      this.text = text;// btn text
      this.targetCallback = targetCallback; // call back 

      //create Ui button
      this.createButton();
      //add this container to Phaser Scene
      this.scene.add.existing(this);
      }
    
      createButton() {
        // create play game button
        this.button = this.scene.add.image(0, 0, 'btn_play_out');
        // make button interactive
        this.button.setInteractive();
        // scale the button
        this.button.setScale(1.4);
    
        // create the button text
        this.buttonText = this.scene.add.text(0, 0, this.text, { fontSize: '26px', fill: '#fff' });
        // center the button text inside the Ui button
        Phaser.Display.Align.In.Center(this.buttonText, this.button);
    
        // add the two game objects to our container
        this.add(this.button);
        this.add(this.buttonText);
    
        // listen for events
        this.button.on('pointerdown', () => {
          this.targetCallback();
        });
    
        this.button.on('pointerover', () => {
          this.button.setTexture(this.hoverKey);
        });
    
        this.button.on('pointerout', () => {
          this.button.setTexture(this.key);
        });
      }
    
}


