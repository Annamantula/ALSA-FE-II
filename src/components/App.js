import React from "react"
import { Route, Link, Routes } from "react-router-dom";
import { Products, Login, Register } from "./index";

const App = () => {
    return (
        <div>
           <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )

}

export default App;