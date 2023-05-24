import {makeAutoObservable} from "mobx";

export class Food {
    fid:string;
    name = '';
    posX = 0;
    posY = 0;
    image = '';
    isDisplay = true;

    constructor(fid: string, name: string, posX: number, posY: number, image: string) {
        makeAutoObservable(this);
        this.fid = fid;
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.image = image;
        this.isDisplay = true;
    }

    setPos = (x: number, y: number) => {
        this.posX = x;
        this.posY = y;
    }

    setDisplay = (isDisplay: boolean) => {
        this.isDisplay = isDisplay;
    }
}

export default Food;