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
                background: `url(${food.image})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                }}
        >
            <p
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
                {isLoading ? 'Loading...' : food.name}
            </p>
            {food.isDisplay &&
                <img style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',}}
                    src={food.image}
                    onLoad={() => setIsLoading(false)}
                    alt={food.name}
                />
            }
        </div>
    )
}

export default observer(Food);