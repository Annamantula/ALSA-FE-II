import React, { useState, useParams } from "react";
import { useNavigate } from "react-router";
import {getProductById,getGuestCartByCode,getCartByUserId, createGuestCart, createUserCart } from "../api/apiProductIndex";

export default function SingleProduct() {
    const [products, setProducts] = useState([]);
    const {product_id} = useParams();
 
    
    useEffect(() => {
        getProductById(product_id).then((result) => {
          setProducts(result);
        });
      }, []);

      const addProduct = async (event) => {
        event.preventDefault();

        if (localStorage.getItem("cartCode")){
            const cart = await getGuestCartByCode(code)
            setCart(cart)
            }else{
           const code = await createGuestCart()
           const cart = await getGuestCartByCode(code)
           localStorage.setItem("cartCode",code)
            setCart(cart)
            }
        if (localStorage.getItem("token")){
        const user = await getUserByEmail(email)
        const cart = await getCartByUserId(user.id)
        setCart(cart)
        }else{
        const cart = await createUserCart()
        setCart(cart)
        }
    
      return(
          <div>
      {products.map((product) => {
        return (
          <div key={product.id} >
          <h5>Name:</h5>
          <p>{product.name}</p>
          <img src={product.img_url} alt={product.name}/>
          <h5 >Description:</h5>
          <p>{product.description}</p>
          <h5 >Price:</h5>
          <p>{product.price}<span>{product.price_type}</span></p>
          <h5 >Category:</h5>
          <p>{product.category}</p>
          <h5 >Inventory:</h5>
          <p>{product.inventory}</p>
        <button type="add" onClick={addProduct}>Add To Cart</button>
            
        </div>
        
        )})}
      </div>
     )    
}}