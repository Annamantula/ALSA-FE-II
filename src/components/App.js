import React,{useState} from "react"
import { Route, Link, Routes } from "react-router-dom";
import { Products, Login, Register,Home,NavBar } from "./index";

const App = () => {
    const [category,setCategory] = useState("");


    return (
        <div>
           <NavBar/>
           <Routes>
           <Route path="/login" element={<Home />} />
            <Route path="/products" element={<Products category={category}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )

}

export default App;