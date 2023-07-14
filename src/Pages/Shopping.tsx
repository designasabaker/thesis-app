import mapBrick from '../assets/mapBrick.png';
import Food from '../Components/Food';
import Cart from '../Components/Cart';
import {Food as FoodClass} from '../Stores/Food';
import {Cart as CartClass} from '../Stores/Cart';
// import {observer} from "mobx-react";
import JoySticker2 from "../Components/JoySticker2";
import CartShoppingList from "../Components/CartShoppingList";
import {observer} from "mobx-react";
import {ResetCartBtn} from "../Components/ResetCartBtn";
import {useFoodContext} from "../Contexts/FoodContext";
import {useEffect, useState} from "react";
// import randomNums from "../utils/randomNums";


export const Shopping = () => {
    const {foodObjList} = useFoodContext();
    // const [foodObjList, setFoodObjList] = useState<FoodClass[]>([]);
    const [cartObj, setCartObj] = useState<CartClass>(new CartClass(1,100,100,""));

    useEffect(() => {
        // function initFoodList(){
        //     // initialize food list HERE
        //     const foodObjList:FoodClass[] = [];
        //
        //     const windowWidth:number = window.innerWidth;
        //     const windowHeight:number = window.innerHeight;
        //     const numOfFood:number = FoodJSONList.length;
        //     const numOFGrade:number = numOfFood + 2;
        //     const unitWidth:number = windowWidth / numOFGrade;
        //     const unitHeight:number = windowHeight / numOFGrade;
        //     // const indexSet:number[] = randomNums(numOfFood, 0, numOFGrade * numOFGrade)
        //
        //     FoodJSONList.forEach((food:IFoodJSON) => {
        //         const indexX:number = Math.floor(Math.random() * numOfFood + 1);
        //         const indexY:number = Math.floor(Math.random() * numOfFood + 1);
        //
        //         // const indexX:number = indexSet[index] % numOFGrade;
        //         // const indexY:number = indexSet[(2 * index + 1) % indexSet.length] % numOFGrade;
        //
        //         const newFoodObj = new FoodClass(food.id, food.name, unitWidth * indexX,unitHeight * indexY, food.srcImg);
        //         foodObjList.push(newFoodObj);
        //         return null;
        //     });
        //     return foodObjList;
        // }
        // setFoodObjList(initFoodList());
        setCartObj(new CartClass(1,100,100,"https://www.freeiconspng.com/thumbs/cart-icon/shopping-cart-icon-19.png"));
    },[]);

    return(
        <>
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    background: `url(${mapBrick})`,
                    backgroundSize: 'cover',
                    }}
            />
            {/* foods */}
            {foodObjList.map((foodObj:FoodClass) => {
                return (
                    <Food key={foodObj.fid} food={foodObj} />
                )})}
            {/* Cart */}
            <Cart
                id={'cart01'}
                CartObj={cartObj}
                foodsListenOn={foodObjList}
            />
            <CartShoppingList
                cartObj={cartObj}
                foodObjList={foodObjList}
                // clickDeleteFn={(foodid:string,cartObj:CartClass)=>{
                //     // console.log('click');
                //     const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid)
                //     if(!foodObj) return;
                //     //move cart first to avoid trigger isClose
                //     cartObj.offsetPos(0,100);
                //     foodObj.preventReAdding();
                //     foodObj.setDisplay(true);
                //     cartObj.removeFood(foodid);
                // }}
                // clickMinusFn={(foodid:string,cartObj:CartClass)=>{
                //     console.log('click');
                //     const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid);
                //     if(!foodObj) return;
                //     if(foodObj.numOrdered <= 1){
                //         cartObj.offsetPos(0,100);
                //         foodObj.preventReAdding();
                //         foodObj.setDisplay(true);
                //         cartObj.removeFood(foodid);
                //     }else{
                //         foodObj.setNumOrdered(foodObj.numOrdered - 1);
                //     }
                // }}
                // clickAddFn={(foodid:string,cartObj:CartClass)=>{
                //     // console.log('click');
                //     const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid);
                //     if(!foodObj) return;
                //     foodObj.setNumOrdered(foodObj.numOrdered + 1);
                // }}
            />
            {/*<JoySticker />*/}
            <div
                style={{
                    position:'fixed',
                    bottom: 100,
                    left: '50vw',
                    transform: 'translateX(-50%)',
                }}>
                <div className={"flex flex-col justify-center"}>
                    <JoySticker2
                        movementFn={cartObj.addMovement}
                        leaveFn={cartObj.clearMovement}
                    />
                    <ResetCartBtn cartObj={cartObj} />
                </div>
            </div>
        </>
    )
}

export default observer(Shopping);