import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartByUserId, getGuestCartByCode, createGuestCart, updateCartProduct } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";


export default function Cart(props) {
  const [cart, setCart] = [props.cart, props.setCart];
  const [count,setCount] = useState(0)
  async function getCart() {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getUser(token);
      const gottenCart = await getCartByUserId(token, user.id);
      setCart(gottenCart);
    } else {
        const cartCode = localStorage.getItem("cartCode");
        console.log(cartCode, "cartCode");
        if(!cartCode){
            const code = await createGuestCart();
            console.log(code,"CODE")
            const gottenCart = await getGuestCartByCode(code.code);
            console.log(gottenCart, "cart");
            localStorage.setItem("cartCode", code.code);
            setCart(gottenCart);
        }
        else{
            const gottenCart = await getGuestCartByCode(cartCode);
            console.log(gottenCart, "cart");
            setCart(gottenCart);
        }
      
    }
    console.log(cart, "CART");
  }
  useEffect(() => {
    getCart();
  }, []);


  return (
    <div>
      <h2>Cart</h2>

      {cart.products
        ? cart.products.map((product) => {
            console.log(product);
            return (
                (product.count ? <div key={product.id}>
                    <h3>{product.name}</h3>
                    <label>Qnty:
                    <input type="number" min="1" max={product.inventory} placeholder={1} >
                    </input>
                    </label>
                    <button onClick={() => {updateCartProduct({ count: 0, guest_cart_id: cart.guest_cart_id, cart_product_id: product.cartProductId })}}>Delete</button>
                  </div> : null)
                  
            );
          })
        : null}
        <Link to="/checkout/me">Checkout</Link>
    </div>
  );
}
