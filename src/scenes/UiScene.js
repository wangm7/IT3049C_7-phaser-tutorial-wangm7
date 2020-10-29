class UiScene extends Phaser.Scene{
    constructor(){
        super('UiScene');
    }
    init() {
        // grab a reference to the game scene
        this.gameScene = this.scene.get('GameScene');
      }
    
      create() {
        //this.setupUiElements();
      }
    
      setupUiElements() {
              ////////////////////////////////////////
        //The scoreText is set-up
        ////////////////////////////////////
        // create the score text game object
        this.scoreText = this.add.text(35, 8, 'Score: 0', { fontSize: '16px', fill: '#fff' });
        // creaet coin icon
        this.scoreIcon = this.add.image(16, 16, 'star', );
      }
    
}