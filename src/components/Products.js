import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { createGuestCart, createUserCart, getAllProducts, getCartByUserId, getGuestCartByCode } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";
import { UpdateProduct, DeleteProduct, CreateProduct, ReactivateProduct, CartCount } from "./index"

export default function Products(props) {
  const [refresh, setRefresh] = [props.refresh, props.setRefresh];
  const [products, setProducts] = useState([]);
  const [category] = [props.category];
  const [cart, setCart] = [props.cart, props.setCart];
  const [message, setMessage] = useState(0);
  const [cartProductIds, setCartProductIds] = useState([]);

  

    useEffect(() => {
      
        getAllProducts().then((result) => {
          if (cart.products){
            const cartProducts = cart.products.map((product) => {
              return product.id;
            })
            setCartProductIds(cartProducts);
          }
          setProducts(result);
        })
        console.log(cartProductIds, "productIds");
      }, [refresh, cart]);

    

     return(
        
      <div>
        {/* <div>
              <button onClick={(event)=>{
                event.preventDefault() 
              setCategory("fruit")
            }}>Fruit</button>
          <button onClick={(event)=>{
                event.preventDefault() 
            setCategory("grocery")}}>Grocery</button>
          <button onClick={(event)=>{
                event.preventDefault() 
            setCategory("meat")}}>Meat</button>
          <button onClick={(event)=>{
                event.preventDefault() 
            setCategory("vegetable")}}>Vegetable</button>
            <button onClick={(event)=>{
                event.preventDefault() 
            setCategory("")}}>All Categories</button>
        </div> */}
        {(localStorage.getItem("isAdmin") === "true" ? <CreateProduct refresh={refresh} setRefresh={setRefresh} />:null)}
        
        {products.map((product) => {
        return (
          ((product.isActive || localStorage.getItem("isAdmin")) && (!category || product.category === category) ? (
          <div className="prdct" key={product.id} >
           <form >
            <h3 id ="ttl">Category:</h3>
          <p id ="p1">{product.category}</p>
          {/* <h5 >Inventory:</h5> */}

            <h3 id ="ttl">Name:</h3>
          <p id ="p1">{product.name}</p>
          <img src={product.img_url} alt={product.name}/>

          <h5 id ="ttl3"><Link to={`/products/${product.id}`}>Details:</Link></h5 >
          
          {/* <h5 >Description:</h5> */}
          {/* <p id ="p2">{product.description}</p> */}
          <h5 id ="ttl2">Price:</h5>
          <p id ="p2">{product.price}<span>{product.price_type}</span></p>

          <h5 id ="ttl2">In Stock:</h5>
          <p id ="p2">{product.inventory}</p>
          
          {(cartProductIds.includes(product.id) ? <div>
          <CartCount 
          count={cart.products[cartProductIds.indexOf(product.id)].count}
            cartIndex={cartProductIds.indexOf(product.id)} 
            cart={cart} 
            refresh={refresh} 
            setRefresh={setRefresh} 
            product_id={product.id}/>
          
          </div>: <CartCount count={0} cart={cart} refresh={refresh} setRefresh={setRefresh} product_id={product.id}/>)}
            </form>
            {(localStorage.getItem("isAdmin") === "true" ? <div>
              <h5 id = "ttl2">Is Active: {product.isActive}</h5>
              <p id = "p2">{`${product.isActive}`}</p>
          <UpdateProduct name={product.name} refresh={refresh} setRefresh={setRefresh} price_type={product.price_type} description={product.description} price={product.price} category={product.category} inventory={product.inventory} img_url={product.img_url} isActive={product.isActive} product_id={product.id} />
          {product.isActive === true ? 
          <DeleteProduct product_id={product.id} refresh={refresh} setRefresh={setRefresh} />
        : <ReactivateProduct refresh={refresh} setRefresh={setRefresh}  product_id={product.id} />
        }
          
            </div>:null)}
        </div>)
        : null
          ))
          })}
      </div>
     )

}
