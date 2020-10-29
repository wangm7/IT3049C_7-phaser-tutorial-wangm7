
class BootScene extends Phaser.Scene{
    
    constructor(){
        super('BootScene');
    }
    preload(){
        //fonts
        //this.load.font('pixel', 'assets/fonts/KenneyPixelSquare');
        this.loadImage();
        this.loadspritesheet();
        this.loadAudio();
    }

    loadImage(){
        //GameScene
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('ground', 'assets/images/platform.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        //btn
        this.load.image('btn', 'assets/btn/red_button10.png');
        this.load.image('btn_play_down', 'assets/btn/red_button00.png');
        this.load.image('btn_play_out', 'assets/btn/red_button01.png');
        this.load.image('btn_play_over', 'assets/btn/red_button02.png');
        //TittleScene
        this.load.image('tittle_image', 'assets/images/tittlescene.png');
    }

    loadspritesheet(){
        this.load.spritesheet('dude', 'assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    loadAudio(){
        //audio
        this.load.audio('themMusic', 'assets/audio/them.ogg');  
        this.load.audio('ding', 'assets/audio/click1.ogg')
    }

    create(){
        console.log('starting game')
        this.scene.start('TittleScene');
    }

}