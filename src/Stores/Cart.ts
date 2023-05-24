import {makeAutoObservable} from "mobx";
import {Food} from "./Food";
import {throttle} from "../utils/throttle";

export class Cart {
    cid = 1;
    posX = 0;
    posY = 0;
    image = '';
    inCartFood:Food[] = [];
    moveIntervalId:any;

    constructor(cid: number, posX: number, posY: number, image: string) {
        makeAutoObservable(this);
        this.cid = cid;
        this.posX = posX;
        this.posY = posY;
        this.image = image;
        this.inCartFood = [];
        this.moveIntervalId = 0;
    }

    setPos = (x: number, y: number) => {
        this.posX = x;
        this.posY = y;
    }

    addFood = (food:Food) => {
        this.inCartFood.push(food);
    }

    removeFood = (food:Food) => {
        this.inCartFood = this.inCartFood.filter((f) => {
            return f.fid !== food.fid;
        })
    }

    addMovement =throttle( (x:number, y:number) => {
        clearInterval(this.moveIntervalId);
        const scale = 10;
        this.moveIntervalId = setInterval(()=>{
            this.setPos(this.posX + x / scale, this.posY + y / scale);
        }, 15);
        setTimeout(()=>{
            clearInterval(this.moveIntervalId);
        }, 10000);
    }, 100)

    clearMovement = () => {
        clearInterval(this.moveIntervalId);
    }
}

export default Cart;