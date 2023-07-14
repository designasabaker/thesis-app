import {Cart, Food as FoodClass} from "../Stores";
import {observer} from "mobx-react";
// import FoodJSONList from "../Data/Foods";
import {FaPlusSquare, FaMinusSquare, FaTrash} from "react-icons/fa";
import {useFoodContext} from "../Contexts/FoodContext";

const FoodSubmittedKey = 'foodSubmitted';

window.onload = () => {
    localStorage.setItem(FoodSubmittedKey, '');
}

export const CartShoppingList = (props:any) => {
    const {foodObjList} = useFoodContext();
    const getFoodSubmitted = () => {
        return localStorage.getItem(FoodSubmittedKey) || ""
    };

    const cartObj:Cart = props.cartObj;
    // const clickDeleteFn = props.clickDeleteFn;
    // const clickMinusFn = props.clickMinusFn;
    // const clickAddFn = props.clickAddFn;
    const hasAddCart:boolean = cartObj.inCartFood.length > 0;

    function handleMinusClick(foodid:string, cartObj:Cart){
        const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid);
        if(!foodObj) return;
        if(foodObj.numOrdered <= 1){
            cartObj.offsetPos(0,100);
            foodObj.preventReAdding();
            foodObj.setDisplay(true);
            cartObj.removeFood(foodid);
        }else{
            foodObj.setNumOrdered(foodObj.numOrdered - 1);
        }
    }

    function handleAddClick(foodid:string){
        const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid);
        if(!foodObj) return;
        foodObj.setNumOrdered(foodObj.numOrdered + 1);
    }

    function handleDeleteClick(foodid:string,cartObj:Cart){
        const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid)
        if(!foodObj) return;
        //move cart first to avoid trigger isClose
        cartObj.offsetPos(0,100);
        foodObj.preventReAdding();
        foodObj.setDisplay(true);
        cartObj.removeFood(foodid);
    }

    function handleSubmit(){
        // const foodObjsInCart: FoodClass[] = cartObj.inCartFood.map((foodid:string) => {
        //     const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid);
        //     if(!foodObj) return null;
        //     return foodObj;
        // });
        //
        // const foodObjsInCartString:string = foodObjsInCart.map((foodObj:FoodClass) => {
        //     return `(${foodObj.name} x ${foodObj.numOrdered})`;
        // }).join("  +  ");
        //
        // const totalFoodSubmitted = getFoodSubmitted() + "  +  " + foodObjsInCartString;
        //
        // localStorage.setItem(FoodSubmittedKey, totalFoodSubmitted);
        // console.log(totalFoodSubmitted);
        // deleteFoodsInCart();
    }

    // function deleteFoodsInCart(){
    //     cartObj.inCartFood.forEach((foodid:string) => {
    //         const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid);
    //         if(!foodObj) return;
    //         foodObj.preventReAdding();
    //         foodObj.setDisplay(true);
    //     });
    //     cartObj.clearFood();
    // }

    return (
        <div className={"text-black bg-white fixed w-60 right-0 top-0 m-0 px-2 pb-6 rounded-lg"}>
            <h1 className={"text-black text-center font-bold font-sans my-3"}>Shopping List</h1>
            {!hasAddCart && <p className={"text-black font-thin text-sm text-center"}>Control the joystick to collect foods!</p>}
            <div className={"flex flex-col gap-3"}>
                {foodObjList
                    .filter((foodObj:FoodClass) => foodObj.numOrdered > 0)
                    .map((foodObj:FoodClass) => {
                    if(!foodObj) return null;
                    if(foodObj.numOrdered <= 0) return null;
                    const {fid:id, name, numOrdered, image} = foodObj;
                    return (
                        <div key={`cartFood${id}`} className={"flex flex-row gap-2 items-center"}>
                            <img
                                src={image}
                                alt={name}
                                className={"rounded-full"}
                                style={{width: '60px', height: '60px'}}
                            />
                            <div className={"flex flex-col w-full pr-6"}>
                                <p className={"text-black uppercase"}>{foodObj.name}</p>
                                <div className={"flex flex-row justify-between"}>
                                    <div className={"flex flex-row items-center"}>
                                        <button
                                            className={"text-black flex flex-row"}
                                            onClick={() => {handleMinusClick(id,cartObj);}}>
                                            <FaMinusSquare color="red" />-
                                        </button>
                                        <span className={"text-black px-1 pb-1"}>{numOrdered}</span>
                                        <button
                                            className={"text-black flex flex-row"}
                                            onClick={() => {handleAddClick(id);}}>
                                            +<FaPlusSquare />
                                        </button>
                                    </div>
                                    <button
                                        className={"text-black flex flex-row"}
                                        onClick={() => handleDeleteClick(id,cartObj)}>
                                        X<FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={"px-6"}>
                <button
                    className={"w-full mt-6 bg-transparent border border-black hover:bg-white hover:text-black text-black font-thin text-xs py-1 px-2 rounded-full"}
                    onClick={handleSubmit}>
                    SUBMIT
                </button>
            </div>
            <div className={"text-black text-sm text-center pt-3 font-thin"}>
                <h1>Order Submitted</h1>
                <p>{getFoodSubmitted()}</p>
            </div>
        </div>
    )
}

export default observer(CartShoppingList);