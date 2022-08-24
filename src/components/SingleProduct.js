import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  getProductById,
  getGuestCartByCode,
  getCartByUserId,
  createGuestCart,
  createUserCart,
  addProductToCart,
  updateCartProduct,
} from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";

export default function SingleProduct(props) {
  const [setCart] = [props.setCart];
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const { product_id } = useParams();
  const [message, setMessage] = useState(false);


  useEffect(() => {
    getProductById(product_id).then((result) => {
      console.log(result);
      setProduct(result);
    });
  }, []);

  const addProduct = async (event) => {
    event.preventDefault();
    const cartCode = localStorage.getItem("cartCode");
    console.log(cartCode, "cartCode");
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getUser(token);
      console.log(user, "user");
      const cart = await getCartByUserId(token, user.id);
      if (cart) {
        setCart(cart);
        const cartProduct = await cart.products.filter((product) => {
          return product.id === product_id
        });
        if(cartProduct[0]) {
          console.log(cart.guest_cart_id, "HELLOOOO");
          console.log(cartProduct, "BYEEEE");
          const updateProd = await updateCartProduct({count: 1, guest_cart_id: cart.guest_cart_id, cart_product_id: cartProduct[0].cartProductId});
        } else {
          const addProd = await addProductToCart(product_id, cart.id, count);
          console.log(addProd, "addProd");
        }
      } else {
        const cart = await createUserCart();
        setCart(cart);
        if(cartProduct[0]) {
          console.log(cart.guest_cart_id, "HELLOOOO");
          console.log(cartProduct, "BYEEEE");
          const updateProd = await updateCartProduct({count: 1, guest_cart_id: cart.guest_cart_id, cart_product_id: cartProduct[0].cartProductId});
        } else {
          const addProd = await addProductToCart(product_id, cart.id, count);
          console.log(addProd, "addProd");
        }
      }
    } else {
      if (cartCode) {
        const cart = await getGuestCartByCode(cartCode);
        setCart(cart);
        console.log(cart, "CARTTTT");
        const cartProduct = await cart.products.filter((product) => {
          console.log(product.id == product_id, "TRIPLE EQUALS");
          return product.id == product_id
        });
        if(cartProduct[0]) {
          console.log(cart.guest_cart_id, "HELLOOOO");
          console.log(cartProduct, "BYEEEE");
          const updateProd = await updateCartProduct({count: 1, guest_cart_id: cart.guest_cart_id, cart_product_id: cartProduct[0].cartProductId});
        } else {
          const addProd = await addProductToCart(product_id, cart.id, count);
          console.log(addProd, "addProd");
        }
      } else {
        const code = await createGuestCart();
        console.log(code,"CODE")
        const cart = await getGuestCartByCode(code.code);
        localStorage.setItem("cartCode", code.code);
        setCart(cart);
        const cartProduct = await cart.products.filter((product) => {
          return product.id === product_id
        });
        console.log(cartProduct)
        if(cartProduct[0]) {
          console.log(cart.guest_cart_id, "HELLOOOO");
          console.log(cartProduct, "BYEEEE");
          const updateProd = await updateCartProduct({count: 1, guest_cart_id: cart.guest_cart_id, cart_product_id: cartProduct[0].cartProductId});
        } else {
          const addProd = await addProductToCart(product_id, cart.id, count);
          console.log(addProd, "addProd");
        }
      
      }
    }
    setMessage(true);
  };

  return (
    <div key={product.id}>
      
      <form className="prdct2">
      <h5 id ="ttl">Category:</h5>
      <p id ="p1">{product.category}</p>

      <h5 id ="ttl">Name:</h5>
      <p id ="p1">{product.name}</p>

      <img src={product.img_url} alt={product.name} />
      <h5 id ="ttl3">Description:</h5>
      <p id ="p2">{product.description}</p>

      <h5 id ="ttl2">Price:</h5>
      <p id ="p2">
        {product.price}
        <span>{product.price_type}</span>
      </p>
      
       <h5 id ="ttl2">In Stock:</h5>
      <p id ="p2">{product.inventory}</p>
      {(message === true ? <p id="2">Added To Cart</p> : 
      <button className ="btn5" type="add" onClick={addProduct}>
      Add To Cart
    </button>
    )}
      
      </form>
    </div>
  );
}
