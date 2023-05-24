import Food from "../Stores/Food";
import {Cart} from "../Stores";
import {observer} from "mobx-react";

export const CartShoppingList = (props:any) => {
    const cartObj:Cart = props.cartObj;
    return (
        <div
            style={{
                color: 'white',
                textAlign: 'right',
                backgroundColor: 'gray',
                position: 'fixed',
                width: '160px',
                right: 0,
                top: 60,
                }}
        >
            <h2>Shopping List</h2>
                {cartObj.inCartFood.map((food:Food) => {
                    return (
                        <div key={`cartFood${food.fid}`}>
                            {food.name}
                            <img src={food.image} alt={food.name} style={{width: '60px', height: '60px'}}/>
                        </div>
                    )
                })}
        </div>
    )
}

export default observer(CartShoppingList);