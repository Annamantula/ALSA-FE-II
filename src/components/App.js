import React,{useState} from "react"
import { Route, Link, Routes } from "react-router-dom";
import { Products, Login, Register,Home,NavBar, SingleProduct } from "./index";

const App = () => {
    const [category,setCategory] = useState("");
    const [cart,setCart] = useState({});


    return (
        <div>
           <NavBar setCategory={setCategory}/>
           <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products category={category}/>} />
            <Route path="/products/:product_id" element={<SingleProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            </Routes>
        </div>
    )

}

export default App;