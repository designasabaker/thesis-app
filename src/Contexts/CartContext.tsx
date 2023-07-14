import {createContext, useContext, useEffect, useState} from "react";
import { Food as FoodClass } from '../Stores/Food'

interface CartContextType {
    cart: any[];
    setCart: (cart: any[]) => void;
    updateCart: (food: FoodClass) => void;
    submittedOrder: any[];
    setSubmittedOrder: (submittedOrder: any[]) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}:any) => {
    const [cart, setCart] = useState<FoodClass[]>([]);
    const [submittedOrder, setSubmittedOrder] = useState<any[]>([]);

    const updateCart = (food: FoodClass) => {
        console.log("updateCart")
        // check if food item is already in the cart
        const existedFood = cart.find(item => item.fid === food.fid);
        if(existedFood){
            // update the state with the new cart
            setCart(cart.map(item =>
                item.fid === food.fid ? {...item, numOrdered: food.numOrdered} : item
            ));
        }else{
            // update the state with the new cart
            setCart([...cart, food]);
        }
    }
    useEffect(() => {
        console.log("cart changed")
        console.log(cart)
    }, [cart])

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            updateCart,
            submittedOrder,
            setSubmittedOrder
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const cartContext = useContext(CartContext);
    if(!cartContext){
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return cartContext;
}

export default CartProvider;