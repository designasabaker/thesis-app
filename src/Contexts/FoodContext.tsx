import {createContext, useContext, useState} from "react";
import FoodJSONList,{IFoodJSON} from '../Data/Foods';
import {Food as FoodClass} from "../Stores";
interface FoodContextType {
    FoodJSONList: IFoodJSON[];
    foodObjList: FoodClass[];
}

function initFoodList(){
    // initialize food list HERE
    const foodObjList:FoodClass[] = [];

    const windowWidth:number = window.innerWidth;
    const windowHeight:number = window.innerHeight;
    const numOfFood:number = FoodJSONList.length;
    const numOFGrade:number = numOfFood + 2;
    const unitWidth:number = windowWidth / numOFGrade;
    const unitHeight:number = windowHeight / numOFGrade;
    // const indexSet:number[] = randomNums(numOfFood, 0, numOFGrade * numOFGrade)

    FoodJSONList.forEach((food:IFoodJSON) => {
        const indexX:number = Math.floor(Math.random() * numOfFood + 1);
        const indexY:number = Math.floor(Math.random() * numOfFood + 1);

        // const indexX:number = indexSet[index] % numOFGrade;
        // const indexY:number = indexSet[(2 * index + 1) % indexSet.length] % numOFGrade;

        const newFoodObj = new FoodClass(food.id, food.name, unitWidth * indexX,unitHeight * indexY, food.srcImg);
        foodObjList.push(newFoodObj);
        return null;
    });
    return foodObjList;
}

export const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({children}:any) => {
    const [foodObjList] = useState<FoodClass[]>(initFoodList());
    return (
        <FoodContext.Provider value={{
            FoodJSONList: FoodJSONList,
            foodObjList: foodObjList,
        }}>
            {children}
        </FoodContext.Provider>
    )
}

export const useFoodContext = () => {
    const foodContext = useContext(FoodContext);
    if(!foodContext){
        console.error("useFoodContext must be used within a FoodProvider");
        return { FoodJSONList: [], foodObjList: [] };
    }
    return foodContext;
}

export  default FoodProvider;