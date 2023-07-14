import {useFoodContext} from "../Contexts/FoodContext";
import {Food as FoodClass} from "../Stores";
import {observer} from "mobx-react";

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
        <div className='m-auto mt-16'>
            <h1 className='text-3xl text-center mb-6'>Menu</h1>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {foodObjList.map((food) => {
                    const {fid:id, name, numOrdered,image:src} = food;
                    return (
                        <li key={id} className="p-6 rounded shadow">
                            <img src={src} alt={name} className='max-w-24 max-h-24 contain mb-4 rounded-full'/>
                            <h2 className='mb-4 text-xl'>{name}</h2>
                            <button onClick={() => handleMinusClick(id)}>-</button>
                            <span className='mx-2'>{numOrdered}</span>
                            <button onClick={() => handleAddClick(id)}>+</button>
                        </li>
                )})}
            </ul>
        </div>
    )
}

export default observer(Menu);