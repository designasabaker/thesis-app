import { JoyStickerController2 as JoystickerControllerClass} from "../Stores/JoySticker2";
import baseImg from '../assets/joystick-base.png';
import redStickImg from '../assets/joystick-red.png';
import {observer} from "mobx-react";
import {useEffect} from "react";

const joystickControllerObj:JoystickerControllerClass = new JoystickerControllerClass('stick1',baseImg,redStickImg);
const JoySticker2 = (props:any) => {
    const movementFn = props.movementFn;
    const leaveFn = props.leaveFn;

    useEffect(() => {
        window.addEventListener('mouseup', joystickControllerObj.handleMouseUpLeave);
        window.addEventListener('mouseup', leaveFn);

        return () => {
            window.removeEventListener('mouseup', joystickControllerObj.handleMouseUpLeave);
        };
    }, []);
    return (
        // base
        <div
            style={{
                width: `${joystickControllerObj.baseWidth}px`,
                height: `${joystickControllerObj.baseWidth}px`,
                // background: `url(${joystickControllerObj.backgroundImage})`,
                // background:'red',
                //backgroundSize: 'contain',
                zIndex: 100,
            }}
            className={"border border-white rounded-full shadow-white shadow-inner"}
            // onMouseUp={() => {joystickControllerObj.handleMouseUpLeave()}} // mouse up
            // onMouseLeave={() => {joystickControllerObj.handleMouseUpLeave()}} // mouse leave
        >
            {/*sticker*/}
            <div
                style={{
                    position: 'absolute',
                    top: joystickControllerObj.position.y,
                    left: joystickControllerObj.position.x,
                    width: `${joystickControllerObj.stickerWidth}px`,
                    height: `${joystickControllerObj.stickerWidth}px`,
                    //background: `url(${joystickControllerObj.stickerImage})`,
                    //backgroundSize: 'contain',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 65% 15%, white 3px, white 30%, gray 60%, aqua 100%)'
                }}
                onMouseDown={(e) => {joystickControllerObj.handleMouseDown(e)}} // mouse down
                onMouseMove={(e) =>
                {
                    joystickControllerObj.handleMouseMove(e);
                    movementFn(joystickControllerObj.deltaPosition.x, joystickControllerObj.deltaPosition.y)
                }} // mouse move
                // onMouseUp={() => {joystickControllerObj.handleMouseUpLeave()}} // mouse up
                // onMouseLeave={() => {joystickControllerObj.handleMouseUpLeave()}} // mouse leave
            >
            </div>
        </div>
    )
}

export default observer(JoySticker2) ;