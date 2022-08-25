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
import CartCount from "./CartCount";

export default function SingleProduct(props) {
  const [setCart, cart, refresh, setRefresh] = [props.setCart, props.cart, props.refresh, props.setRefresh];
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const { product_id } = useParams();
  const [message, setMessage] = useState(false);
  const [cartProductIds, setCartProductIds] = useState([]);

  useEffect(() => {
    getProductById(product_id).then((result) => {
      if (cart.products) {
        const cartProducts = cart.products.map((product) => {
          return product.id;
        })
        setCartProductIds(cartProducts);
      }
      setProduct(result);
    });
  }, []);

  const addProduct = async (event) => {
    event.preventDefault();
    const cartCode = localStorage.getItem("cartCode");
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getUser(token);
      const cart = await getCartByUserId(token, user.id);
      if (cart) {
        setCart(cart);
        const cartProduct = await cart.products.filter((product) => {
          return product.id === product_id
        });
        if (cartProduct[0]) {
          const updateProd = await updateCartProduct({ count: 1, guest_cart_id: cart.guest_cart_id, cart_product_id: cartProduct[0].cartProductId });
        } else {
          const addProd = await addProductToCart(product_id, cart.id, count);
        }
      } else {
        const cart = await createUserCart();
        setCart(cart);
        if (cartProduct[0]) {
          const updateProd = await updateCartProduct({ count: 1, guest_cart_id: cart.guest_cart_id, cart_product_id: cartProduct[0].cartProductId });
        } else {
          const addProd = await addProductToCart(product_id, cart.id, count);
        }
      }
    } else {
      if (cartCode) {
        const cart = await getGuestCartByCode(cartCode);
        setCart(cart);
        const cartProduct = await cart.products.filter((product) => {
          return product.id == product_id
        });
        if (cartProduct[0]) {
          const updateProd = await updateCartProduct({ count: 1, guest_cart_id: cart.guest_cart_id, cart_product_id: cartProduct[0].cartProductId });
        } else {
          const addProd = await addProductToCart(product_id, cart.id, count);
        }
      } else {
        const code = await createGuestCart();
        const cart = await getGuestCartByCode(code.code);
        localStorage.setItem("cartCode", code.code);
        setCart(cart);
        const cartProduct = await cart.products.filter((product) => {
          return product.id === product_id
        });
        if (cartProduct[0]) {
          const updateProd = await updateCartProduct({ count: 1, guest_cart_id: cart.guest_cart_id, cart_product_id: cartProduct[0].cartProductId });
        } else {
          const addProd = await addProductToCart(product_id, cart.id, count);
        }
      }
    }
    setMessage(true);
  };

  return (
    <div key={product.id}>

      <form className="prdct2">
        <h5 id="ttl">Category:</h5>
        <p id="p1">{product.category}</p>

        <h5 id="ttl">Name:</h5>
        <p id="p1">{product.name}</p>

        <img src={product.img_url} alt={product.name} />
        <h5 id="ttl3">Description:</h5>
        <p id="p2">{product.description}</p>

        <h5 id="ttl2">Price:</h5>
        <p id="p2">
          {product.price}
          <span>{product.price_type}</span>
        </p>

        <h5 id="ttl2">In Stock:</h5>
        <p id="p2">{product.inventory}</p>
        {(cartProductIds.includes(product.id) ? <div>
          <CartCount
            count={cart.products[cartProductIds.indexOf(product.id)].count}
            cartIndex={cartProductIds.indexOf(product.id)}
            cart={cart}
            refresh={refresh}
            setRefresh={setRefresh}
            product_id={product.id} />

        </div> : <CartCount count={0} cart={cart} refresh={refresh} setRefresh={setRefresh} product_id={product.id} />)}

      </form>
    </div>
  );
}
