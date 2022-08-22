import React,{useState} from "react"
import { Route, Link, Routes } from "react-router-dom";
import { Products, Login, Register,Home,NavBar, SingleProduct, Cart,Checkout,MyAccount } from "./index";

const App = () => {
    const [category,setCategory] = useState("");
    const [cart,setCart] = useState({});


    return (
        <div>
           <NavBar setCategory={setCategory}/>
           <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products category={category}/>} />
            <Route path="/products/:product_id" element={<SingleProduct setCart={setCart}/>} />
            <Route path="/login" element={<Login setCart={setCart}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} />
            <Route path="/checkout/me" element={<MyAccount />} />
            <Route path="/checkout/" element={<Checkout />} />

            </Routes>
        </div>
    )

}

export default App;