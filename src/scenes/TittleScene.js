class TittleScene extends Phaser.Scene{
    constructor (){
        super('TittleScene');
    }
    preload(){

        
    }
    create(){
        //image bg
        let background = this.add.sprite(0, 0, 'tittle_image').setOrigin(0,0);
        
        //text tittle
        const text = 'IT3049C002 the Week 1 tutorial';
        const text2 = 'is just a step-by-step recreate project';
        const text3 = 'with music, title and button (play & restar). ';
        const text4 = 'by Mian Wang (wangm7)';
        const text5 = 'I am working on the Final Project!';
        this.tittle_text = this.add.text(400, 100, text, { fontSize: '30px', fill: '#000' });
        this.tittle_text.setOrigin(0.5);
        this.tittle_text = this.add.text(400, 150, text2, { fontSize: '30px', fill: '#000' });
        this.tittle_text.setOrigin(0.5);
        this.tittle_text = this.add.text(400, 200, text3, { fontSize: '25px', fill: '#000' });
        this.tittle_text.setOrigin(0.5);
        this.tittle_text = this.add.text(550, 250, text4, { fontSize: '25px', fill: '#000' });
        this.tittle_text.setOrigin(0.5);
        this.tittle_text = this.add.text(400, 300, text5, { fontSize: '30px', fill: '#000' });
        this.tittle_text.setOrigin(0.5);


        this.sound = this.sound.add('themMusic').play();

        //create paly_btn
        this.startGameButton = new UiButton(
            this, 
            this.scale.width / 2, 
            this.scale.height * 0.65, 
            'btn_play_down', 
            'btn_play_over', 
            'Play', 
            this.startScene.bind(this, 'GameScene')
        );


    }
    startScene(targetScene) {
        this.scene.start(targetScene);
      }
}
