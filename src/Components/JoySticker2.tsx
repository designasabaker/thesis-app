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
        // 在组件挂载时绑定事件处理程序
        window.addEventListener('mouseup', joystickControllerObj.handleMouseUpLeave);
        window.addEventListener('mouseup', leaveFn);

        // 在组件卸载时解除绑定
        return () => {
            window.removeEventListener('mouseup', joystickControllerObj.handleMouseUpLeave);
        };
    }, []); // 注意这个空数组，它确保了回调函数只在组件挂载和卸载时运行
    return (
        // base
        <div
            style={{
                position:'fixed',
                bottom: 100,
                left: '50vw',
                transform: 'translateX(-50%)',
                width: `${joystickControllerObj.baseWidth}px`,
                height: `${joystickControllerObj.baseWidth}px`,
                background: `url(${joystickControllerObj.backgroundImage})`,
                // background:'red',
                backgroundSize: 'contain',
                zIndex: 100,
            }}
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
                    background: `url(${joystickControllerObj.stickerImage})`,
                    backgroundSize: 'contain',
                    cursor: 'pointer',
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