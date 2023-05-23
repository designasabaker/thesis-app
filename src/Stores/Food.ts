import {makeAutoObservable} from "mobx";

export class Food {
    fid = 1;
    name = '';
    posX = 0;
    posY = 0;
    image = '';
    isDisplay = true;

    constructor(fid: number, name: string, posX: number, posY: number, image: string) {
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
}

export default Food;