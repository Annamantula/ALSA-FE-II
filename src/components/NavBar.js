import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function NavBar(props) {
    const [setCategory] = [props.setCategory];
    const nav = useNavigate();
  return (
    <nav>
      <div>
        <Link to="/login">Login</Link>
        {/* <Link to = "/register">Register</Link> */}
        <Link to="/products">Product</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/">My account</Link>
      </div>
      <div>
        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              setCategory("fruit");
              nav("/products");
            }}
          >
            Fruit
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              setCategory("grocery");
              nav("/products");
            }}
          >
            Grocery
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              setCategory("meat");
              nav("/products");
            }}
          >
            Meat
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              setCategory("vegetable");
              nav("/products");
            }}
          >
            Vegetable
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              setCategory("");
              nav("/products");
            }}
          >
            All Categories
          </button>
        </div>
      </div>
    </nav>
  );
}
