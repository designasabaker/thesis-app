import {makeAutoObservable} from "mobx";

interface position{
    x:number;
    y:number;
}

export class JoystickController
{
    id:string;
    dragStart:position = { x: 0, y: 0 };
    touchId:number|null = null;
    active = false;
    value = { x: 0, y: 0 };
    maxDistance:number;
    deadzone:number;

    // stickID: ID of HTML element (representing joystick) that will be dragged
    // maxDistance: maximum amount joystick can move in any direction
    // deadzone: joystick must move at least this amount from origin to register value change

    constructor( stickID:string, maxDistance:number, deadzone:number){
        makeAutoObservable(this);
        this.id = stickID;
        // location from which drag begins, used to calculate offsets
        this.dragStart = { x: 0, y: 0 };

        // track touch identifier in case multiple joysticks present
        this.touchId = null;

        this.active = false;
        this.value = {x: 0, y: 0};
        this.maxDistance = maxDistance;
        this.deadzone = deadzone;
    }

    setValue = (x:number, y:number) => {
        this.value = {x:x, y:y};
    }

     handleDown = (event:any) => {
        this.active = true;
        // all drag movements are instantaneous
        const stick = document.getElementById(this.id);
        if(stick) {
            stick.style.transition = '0s'
        }
        // touch event fired before mouse event; prevent redundant mouse event from firing
        event.preventDefault();

        if (event.changedTouches)
            this.dragStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
        else
            this.dragStart = { x: event.clientX, y: event.clientY };

        // if this is a touch event, keep track of which one
        if (event.changedTouches)
            this.touchId = event.changedTouches[0].identifier;
    }

     handleMove = (event:any) => {
        if ( !this.active ) return;
        // if this is a touch event, make sure it is the right one
        // also handle multiple simultaneous touchmove events
        let touchmoveId = null;
        if (event.changedTouches)
        {
            for (let i = 0; i < event.changedTouches.length; i++)
            {
                if (this.touchId == event.changedTouches[i].identifier)
                {
                    touchmoveId = i;
                    event.clientX = event.changedTouches[i].clientX;
                    event.clientY = event.changedTouches[i].clientY;
                }
            }

            if (touchmoveId == null) return;
        }

        const xDiff = event.clientX - this.dragStart.x;
        const yDiff = event.clientY - this.dragStart.y;
        const angle = Math.atan2(yDiff, xDiff);
        const distance = Math.min(this.maxDistance, Math.hypot(xDiff, yDiff));
        const xPosition = distance * Math.cos(angle);
        const yPosition = distance * Math.sin(angle);

        // move stick image to new position
        const stick = document.getElementById(this.id);
        if(stick){
            stick.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0px)`;
            console.log(xPosition, yPosition);
            this.setValue(xPosition, yPosition);
        }

        // deadzone adjustment
        const distance2 = (distance < this.deadzone) ? 0 : this.maxDistance / (this.maxDistance - this.deadzone) * (distance - this.deadzone);
        const xPosition2 = distance2 * Math.cos(angle);
        const yPosition2 = distance2 * Math.sin(angle);
        const xPercent = parseFloat((xPosition2 / this.maxDistance).toFixed(4));
        const yPercent = parseFloat((yPosition2 / this.maxDistance).toFixed(4));

        this.value = { x: xPercent, y: yPercent };
    }

    handleUp = (event:any) => {
        if ( !this.active ) return;

        // if this is a touch event, make sure it is the right one
        if (event.changedTouches && this.touchId != event.changedTouches[0].identifier) return;

        // transition the joystick position back to center
        const stick = document.getElementById(this.id);
        if(stick){
            stick.style.transition = '.2s';
            stick.style.transform = `translate3d(0px, 0px, 0px)`;
        }

        // reset everything
        this.value = { x: 0, y: 0 };
        this.touchId = null;
        this.active = false;
    }

    init = () =>
    {
        const stick = document.getElementById(this.id);
        if(stick){
            stick.addEventListener('mousedown', this.handleDown);
            stick.addEventListener('touchstart', this.handleDown);
        }
        document.addEventListener('mousemove', this.handleMove, {passive: false});
        document.addEventListener('touchmove', this.handleMove, {passive: false});
        document.addEventListener('mouseup', this.handleUp);
        document.addEventListener('touchend', this.handleUp);
    }
}

export default JoystickController;
