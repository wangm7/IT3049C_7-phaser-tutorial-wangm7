import {CST} from "../CST";
export class MenuScene extends Phaser.Secne{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data){
        console.log(data);
        console.log("igotit");
    }

    preload(){

    }
    create(){
    }
    update(){
        
    }

}