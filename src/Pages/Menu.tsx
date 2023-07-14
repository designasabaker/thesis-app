import {useFoodContext} from "../Contexts/FoodContext";
import {Food as FoodClass} from "../Stores";

export const Menu = () => {
    const {foodObjList} = useFoodContext();
    function handleMinusClick(foodid:string){
        const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid);
        if(!foodObj) return;
        if(foodObj.numOrdered <= 1){
            foodObj.setNumOrdered(0);
        }else{
            foodObj.setNumOrdered(foodObj.numOrdered - 1);
        }
    }

    function handleAddClick(foodid:string){
        const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid);
        if(!foodObj) return;
        foodObj.setNumOrdered(foodObj.numOrdered + 1);
    }

    return (
        <div className={'h-screen'}>
            <h1>Menu</h1>
            <ul>
                {foodObjList.map((food) => {
                    const {fid:id, name, numOrdered} = food;
                    return (
                        <li key={id}>
                            <h2>{name}</h2>
                            <button onClick={() => handleMinusClick(id)}>-</button>
                            <span>{numOrdered}</span>
                            <button onClick={() => handleAddClick(id)}>+</button>
                        </li>
                )})}
            </ul>
        </div>
    )
}

export default Menu;