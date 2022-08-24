import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function NavBar(props) {
    const [setCategory] = [props.setCategory];
    const nav = useNavigate();
  return (
    <>
    <header>
      <span className="headerLogo" >
       <img src= "../ALSA4.png" alt="logo" className="logotoo"/>
      </span>
      
    <nav id ="nav">
      <div id ="nav">
      <Link className="Links" to="/">Home</Link>
        <Link className="Links" to="/login">Login</Link>
        {/* <Link to = "/register">Register</Link> */}
        <Link className="Links" to="/products">Products</Link>
        <Link className="Links" to="/cart"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cart3" viewBox="0 0 18 18">
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg></Link>
    <Link className="Links" to="/"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 18 18">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></Link>
        
      </div>
      </nav>
      </header>
      <div>
        <div>
          <button className="btn"
            onClick={(event) => {
              event.preventDefault();
              setCategory("fruit");
              nav("/products");
            }}
          >
           <img src="../f.png" className="img-thumbnail img" alt="fruits"></img> 
           Fruit
          </button>
          <button className="btn"
            onClick={(event) => {
              event.preventDefault();
              setCategory("grocery");
              nav("/products");
            }}
          >
            <img src="../g.png" className="img-thumbnail img" alt="fruits"></img>
            Grocery
          </button>
          <button className="btn"
            onClick={(event) => {
              event.preventDefault();
              setCategory("meat");
              nav("/products");
            }}
          >
            <img src="../m.png" className="img-thumbnail img" alt="fruits"></img>
          Meat
          </button>
          <button className="btn"
            onClick={(event) => {
              event.preventDefault();
              setCategory("vegetable");
              nav("/products");
            }}
          >
            <img src="../a.png" className="img-thumbnail img" alt="fruits"></img>
            Vegetable
          </button>
          <button className="btn"
            onClick={(event) => {
              event.preventDefault();
              setCategory("");
              nav("/products");
            }}
          >
            <img src="../all.png" className="img-thumbnail img" alt="fruits"></img>
            All Categories
          </button>
        </div>
      </div>
    
    </>
    
  );
}
