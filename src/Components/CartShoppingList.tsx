import {Cart} from "../Stores";
import {observer} from "mobx-react";
import FoodJSONList from "../Data/Foods";

export const CartShoppingList = (props:any) => {
    const cartObj:Cart = props.cartObj;
    const clickFn = props.clickFn;
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
                {cartObj.inCartFood.map((foodid:string) => {
                    const foodJSON = FoodJSONList.find((food:any) => food.id === foodid);
                    if(!foodJSON) return null;
                    return (
                        <div key={`cartFood${foodid}`}>
                            {foodJSON.name}
                            <img src={foodJSON.srcImg} alt={foodJSON.name} style={{width: '60px', height: '60px'}}/>
                            <button onClick={() => clickFn(foodid,cartObj)}>Delete</button>
                        </div>
                    )
                })}
        </div>
    )
}

export default observer(CartShoppingList);