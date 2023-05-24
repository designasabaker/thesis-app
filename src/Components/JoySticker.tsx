import { JoystickController as JoystickControllerClass} from "../Stores/JoySticker";
import baseImg from '../assets/joystick-base.png';
import redStickImg from '../assets/joystick-red.png';
import {observer} from "mobx-react";

const joystickControllerObj = new JoystickControllerClass('stick1',100,10);
export const JoySticker = () => {

    return (
        <div
            style={{
                position:'fixed',
                bottom: 10,
                left: '50vw',
                transform: 'translateX(-50%)',
                width: '128px',
                height: '128px',
            }}
            onMouseDown={(e) => {joystickControllerObj.handleDown(e)}}
            onMouseMove={(e) => {joystickControllerObj.handleMove(e)}}
            onMouseUp={(e) => {joystickControllerObj.handleUp(e)}}
            onMouseLeave={(e) => {joystickControllerObj.handleUp(e)}}
        >
            {/*base image*/}
            <img src={baseImg} alt={"joystick base image"} />
            <p
                style={{
                    color:'white',
                    }}
            >
                x:{joystickControllerObj.value.x}
                y:{joystickControllerObj.value.y}
            </p>
            <div
                id="stick1"
                style={{
                    position: 'absolute',
                    left:32,
                    top:32,}}
            >
                <img src={redStickImg} alt={'red joystick'}/>
            </div>
        </div>
    )
}

export default observer(JoySticker) ;