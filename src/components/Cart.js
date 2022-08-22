import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartByUserId, getGuestCartByCode } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";


export default function Cart(props) {
  const [cart, setCart] = [props.cart, props.setCart];
  const [count,setCount] = useState(0)
  async function getCart() {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getUser(token);
      const cart = await getCartByUserId(token, user.id);
      setCart(cart);
    } else {
        const cartCode = localStorage.getItem("cartCode");
        if(!cartCode){
            const code = await createGuestCart();
            console.log(code,"CODE")
            const cart = await getGuestCartByCode(code.code);
            localStorage.setItem("cartCode", code.code);
            setCart(cart);
        }
        else{
            const cart = await getGuestCartByCode(cartCode);
        }
      
      setCart(cart);
    }
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
                  </div> : null)
              

            );
          })
        : null}
        <Link to="/checkout/me">Checkout</Link>
    </div>
  );
}
