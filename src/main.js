

let config = {
    type: Phaser.AUTO, //WebGl
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
    scene: [
        BootScene,
        TittleScene,
        GameScene,
        UiScene
    ],
    scale:{
        zoom:2,
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    }

};


let game = new Phaser.Game(config);

