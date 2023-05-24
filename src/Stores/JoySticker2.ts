import {makeAutoObservable} from "mobx";
import React from "react";
import {throttle} from "../utils/throttle";

const BASE_WIDTH = 128;
const STICKER_WIDTH = 64;
const INITIAL_POSITION_1D = (BASE_WIDTH - STICKER_WIDTH) / 2;

export class JoyStickerController2{
    id:string;
    initialPosition: {x:number, y:number};
    position: {x:number, y:number}; // related to the base, not on the screen
    // drag: {x:number, y:number};
    isDragging:boolean;
    origin: {x:number, y:number};
    deltaPosition: {x:number, y:number};
    baseWidth:number;
    stickerWidth:number;
    backgroundImage:string;
    stickerImage:string;
    maxDistance:number;
    minDistance:number;

    constructor(id:string, backgroundImage:string, stickerImage:string){
        makeAutoObservable(this);
        this.id = id;
        this.initialPosition = {x:INITIAL_POSITION_1D,y:INITIAL_POSITION_1D}; // initial position of the joystick
        this.position = {x:INITIAL_POSITION_1D, y:INITIAL_POSITION_1D};
        // this.drag= {x:0, y:0};
        this.deltaPosition = {x:0, y:0};
        this.isDragging = false;
        this.origin = {x:0, y:0};
        this.backgroundImage = backgroundImage;
        this.stickerImage = stickerImage;
        this.maxDistance= 100;
        this.minDistance= 10;
        this.baseWidth = BASE_WIDTH;
        this.stickerWidth = STICKER_WIDTH;
    }

    isClickInside = (e:any) => {
        const baseX = e.currentTarget.parentNode.offsetLeft;
        const baseY = e.currentTarget.parentNode.offsetTop;
        console.log("baseX: ", baseX, "baseY: ", baseY)
        console.log("this.position.x: ", this.position.x, "this.position.y: ", this.position.y)
        console.log("e.clientX: ", e.clientX, "e.clientY: ", e.clientY)
        console.log("e.clientX - baseX: ", e.clientX - baseX, "e.clientY - baseY: ", e.clientY - baseY)
        return e.clientX - baseX >= this.position.x
            && e.clientX - baseX <= this.position.x + this.baseWidth
            && e.clientY - baseY >= this.position.y
            && e.clientY - baseY <= this.position.y + this.baseWidth;
    }

    handleMouseDown = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        // if(!this.isClickInside(e)) {
        //     console.log("click outside");
        //     return
        // }
        if(this.isDragging) return;
        this.isDragging = true;
        console.log("drag true")
        // Snapshot the first click position
        this.origin = {
            x: e.clientX,
            y: e.clientY
        }
    }

    handleMouseMove = throttle((e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if(!this.isDragging) {
            return
        }
        console.log("dragging")
        // get MOUSE relative position to the origin
        const delta_x = e.clientX - this.origin.x;
        const delta_y = e.clientY - this.origin.y;
        this.deltaPosition = {x:delta_x, y:delta_y};
        const distance = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
        // if the distance is larger than the max distance, then set the position to the max distance
        if(distance > this.maxDistance || distance < this.minDistance) return;
        // this.drag = {x, y};
        // update the position BASED ON THE DRAG AND INITIAL POSITION
        this.position.x = this.initialPosition.x + delta_x;
        this.position.y = this.initialPosition.y + delta_y;
    }, 12)

    handleMouseUpLeave = throttle(() => {
        this.isDragging = false;
        this.origin = {x:0, y:0};
        //this.drag = {x:0, y:0};
        this.position = {x:INITIAL_POSITION_1D,y:INITIAL_POSITION_1D};
        this.deltaPosition = {x:0, y:0};
    }, 100)
}

export default JoyStickerController2;
