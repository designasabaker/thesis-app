import {makeAutoObservable} from "mobx";

export class Food {
    fid:string;
    name = '';
    posX = 0;
    posY = 0;
    image = '';
    isDisplay = true;
    justRestored = false;
    numOrdered = 0;
    showInfo = false;
    info = 'info';

    constructor(fid: string, name: string, posX: number, posY: number, image: string) {
        makeAutoObservable(this);
        this.fid = fid;
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.image = image;
        this.isDisplay = true;
        this.justRestored = false;
        this.numOrdered = 0;
        this.showInfo = false;
        this.info = 'info';
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

    setNumOrdered = (numOrdered: number) => {
        this.numOrdered = numOrdered;
    }

    setShowInfo = (showInfo: boolean) => {
        console.log('setShowInfo', this, showInfo);
        this.showInfo = showInfo;
    }
}

export default Food;