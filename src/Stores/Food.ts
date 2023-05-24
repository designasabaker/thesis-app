import {makeAutoObservable} from "mobx";

export class Food {
    fid:string;
    name = '';
    posX = 0;
    posY = 0;
    image = '';
    isDisplay = true;
    justRestored = false;

    constructor(fid: string, name: string, posX: number, posY: number, image: string) {
        makeAutoObservable(this);
        this.fid = fid;
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.image = image;
        this.isDisplay = true;
        this.justRestored = false;
    }

    setPos = (x: number, y: number) => {
        this.posX = x;
        this.posY = y;
    }

    setDisplay = (isDisplay: boolean) => {
        this.isDisplay = isDisplay;
    }

    preventReAdding = () => {
        this.justRestored = true;
        setTimeout(()=>{
            this.justRestored = false;
        }, 2000);
    }
}

export default Food;