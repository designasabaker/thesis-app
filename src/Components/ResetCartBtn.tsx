import {Cart as CartClass} from '../Stores/Cart';
import {useEffect} from "react";

let windowWidth:number = window.innerWidth;
let windowHeight:number = window.innerHeight;

export const ResetCartBtn = (props: {cartObj:CartClass}) => {
    const cartObj = props.cartObj;

    useEffect(()=>{
        window.addEventListener('resize', () => {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
            cartObj.setPos(windowWidth/2 - 30,windowHeight/2);
        })},[])

    return(
        <button
            className={"mt-6 bg-transparent border border-white hover:bg-white hover:text-black text-white font-thin text-xs py-1 px-2 rounded-full"}
            onClick={() => cartObj.setPos(windowWidth/2 - 30,windowHeight/2)}
        >
            Reset Cart
        </button>
    )
}