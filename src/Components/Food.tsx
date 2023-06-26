import {Food as FoodClass} from '../Stores/Food';
import {useState} from "react";
import {observer} from "mobx-react";

export const Food = (props:any) => {
    const [isLoading, setIsLoading] = useState(true);
    const food: FoodClass = props.food;
    return (
        <div
            style={{
                position: 'fixed',
                width: '60px',
                height: '60px',
                left: food.posX,
                top: food.posY,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                }}
        >
            <div
                style={{
                    position: 'fixed',
                    width: '60px',
                    height: '60px',
                    left: food.posX,
                    top: food.posY + 60,
                    color: 'white',
                    fontSize: '10px',
                }}
            >
                {isLoading && 'Loading...'}
                {(food.isDisplay && !isLoading) && food.name} <br />
                {food.showInfo && (
                    <div className={"bg-black"}>
                        {food.info}
                    </div>
                )}
            </div>
            {food.isDisplay ?
                <div>
                <img
                    className={"rounded-full bg-white p-3"}
                    style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',}}
                    src={food.image}
                    onLoad={() => setIsLoading(false)}
                    alt={food.name}
                />

                </div>
                :
                <p>X</p>
            }
        </div>
    )
}

export default observer(Food);