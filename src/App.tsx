import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SharedLayout, Home, Menu, Shopping} from "./Pages";
import {AuthUserProvider} from "./Firebase/auth";
import './index.css'

function App() {
  return (
    <>
        <AuthUserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SharedLayout />} >
                        <Route index element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/shopping" element={<Shopping />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthUserProvider>
    </>
  )
}

export default App
