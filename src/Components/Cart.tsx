import {Cart as CartClass} from '../Stores/Cart';
import {Food as FoodClass} from '../Stores/Food';
import {observer} from "mobx-react";

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

    if (foodsClose.length > 0){
        foodsClose.forEach((food:FoodClass) => {
            food.setDisplay(false);
            cart.addFood(food.fid)
        })
    }

    return (
        <div
            id={id}
            style={{
                position: 'fixed',
                width: '60px',
                height: '60px',
                left: cart.posX,
                top: cart.posY,
                background: `url(${cart.image})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                }}
        >
        </div>
    )
}

export default observer(Cart);