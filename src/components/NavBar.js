import React from "react"
import { Link } from "react-router-dom"

export default function NavBar() {

    return(
        <div>
        <Link to = "/login">Login</Link>
        {/* <Link to = "/register">Register</Link> */}
        <Link to = "/products">Product</Link>
        <Link to = "/cart">Cart</Link>
        <Link to = "/">My account</Link>
        </div>
    )
}