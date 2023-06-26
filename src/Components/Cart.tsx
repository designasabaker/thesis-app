import {Cart as CartClass} from '../Stores/Cart';
import {Food as FoodClass} from '../Stores/Food';
import {observer} from "mobx-react";
import {useEffect, useState} from "react";

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
    const [showAddBtn, setShowAddBtn] = useState(false); // show add button when cart is close to food
    const id = props.id;
    const cart: CartClass = props.CartObj;
    const foodsListenOn:FoodClass[] = props.foodsListenOn; // foods to listen on

    const foodsOnDisplay = foodsListenOn.filter((food:FoodClass) => food.isDisplay); // foods on display

    // everytime cart moves, check if there are any foods close to cart
    const foodsClose = foodsOnDisplay.filter((food:FoodClass) => isClose(food,cart)); // foods close to cart
    const foodsCloseButNotJustRestored = foodsClose.filter((food:FoodClass) => !food.justRestored); // foods close to cart but not just restored

    // avoid cart and food re-render conflict
    useEffect(()=>{
        if (foodsCloseButNotJustRestored.length > 0){
            foodsCloseButNotJustRestored.forEach((food:FoodClass) => {
            food.setShowInfo(true);
            setShowAddBtn(true);
            //food.setDisplay(false);
            //food.setNumOrdered(1);
            //cart.addFood(food.fid)
        })
    }},[foodsCloseButNotJustRestored]) // each time foodsCloseButNotJustRestored changes, run the effect

    const handleAddBtnClick = () => {
        setShowAddBtn(false); // hide add button
        foodsCloseButNotJustRestored.forEach((food:FoodClass) => {
            food.setShowInfo(false); // hide info
            food.setDisplay(false); // hide food
            food.setNumOrdered(1); // initial addition, set num to 1
            cart.addFood(food.fid) // add food to cart
        })
    }

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
            {showAddBtn &&
                <button
                    onClick={handleAddBtnClick}
                >+</button>
            }
        </div>
    )
}

export default observer(Cart);