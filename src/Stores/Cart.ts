import {makeAutoObservable} from "mobx";
import {Food} from "./Food";

export class Cart {
    cid = 1;
    posX = 0;
    posY = 0;
    image = '';
    inCartFood:Food[] = [];

    constructor(cid: number, posX: number, posY: number, image: string) {
        makeAutoObservable(this);
        this.cid = cid;
        this.posX = posX;
        this.posY = posY;
        this.image = image;
        this.inCartFood = [];
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
}

export default Cart;