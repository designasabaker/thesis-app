import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SharedLayout, Home, Menu, Shopping} from "./Pages";
import {AuthUserProvider} from "./Firebase/auth";
import './index.css'
import FoodProvider from "./Contexts/FoodContext";
// import CartProvider from "./Contexts/CartContext";

function App() {
  return (
    <>
        <AuthUserProvider>
            <FoodProvider>
                {/*<CartProvider>*/}
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<SharedLayout />} >
                                <Route index element={<Home />} />
                                <Route path="/menu" element={<Menu />} />
                                <Route path="/shopping" element={<Shopping />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                {/*</CartProvider>*/}
            </FoodProvider>
        </AuthUserProvider>
    </>
  )
}

export default App
