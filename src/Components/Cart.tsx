import {Cart as CartClass} from '../Stores/Cart';
import {Food as FoodClass} from '../Stores/Food';
import {observer} from "mobx-react";
import {useEffect} from "react";

const close_distance_threshold = 60;
const isClose = (food:FoodClass, cart:CartClass) => {
    const foodX = food.posX;
    const foodY = food.posY;
    const cartX = cart.posX;
    const cartY = cart.posY;
    const distance = Math.sqrt((foodX-cartX)**2 + (foodY-cartY)**2);
    return distance < close_distance_threshold;
}

// let foodsOnDisplay:FoodClass[];
// let foodsClose:FoodClass[];

export const Cart = (props:any) => {
    const id = props.id;
    const cart: CartClass = props.CartObj;
    const foodsListenOn:FoodClass[] = props.foodsListenOn;

    const foodsOnDisplay = foodsListenOn.filter((food:FoodClass) => food.isDisplay);

    const foodsClose = foodsOnDisplay.filter((food:FoodClass) => isClose(food,cart));
    const foodsCloseButNotJustRestored = foodsClose.filter((food:FoodClass) => !food.justRestored);

    // avoid cart and food re-render conflict
    useEffect(()=>{
        if (foodsCloseButNotJustRestored.length > 0){
            foodsCloseButNotJustRestored.forEach((food:FoodClass) => {
            food.setDisplay(false);
            food.setNumOrdered(1);
            cart.addFood(food.fid)
        })
    }},[foodsCloseButNotJustRestored]) // each time foodsCloseButNotJustRestored changes, run the effect

    return (
        <div
            id={id}
            style={{
                position: 'fixed',
                width: '40px',
                height: '40px',
                left: cart.posX,
                top: cart.posY,
                background: `url(${cart.image})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                }}
            className={"shadow-lg rounded-full bg-white p-3 border-2 border-white"}
        >
        </div>
    )
}

export default observer(Cart);