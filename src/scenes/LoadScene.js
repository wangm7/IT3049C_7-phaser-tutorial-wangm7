
import {CST} from "../CST";

export class LoadScene extends Phaser.Secne{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    
    init(){

    }

    preload(){

    }

    create(){
        this.scene.start(CST.SCENES.MENU, "Hello from load scene");
    }

    update(){

    }
}