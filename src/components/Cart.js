import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartByUserId, getGuestCartByCode, createGuestCart, updateCartProduct,updateUserCartProduct,createUserCart } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";


export default function Cart(props) {
  const [cart, setCart] = [props.cart, props.setCart];
  const [count,setCount] = useState(0)
  async function getCart() {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getUser(token);
      const gottenCart = await getCartByUserId(token, user.id);
      if(!gottenCart) {
        const createdCart = await createUserCart();
        setCart(createdCart);
      }
      else {
        setCart(gottenCart);
      }
      
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
      <h2 className="slogan2">My Cart</h2>
      <Link className = "chck" to="/checkout/me">Checkout</Link>

      {cart.products
        ? cart.products.map((product) => {
            console.log(product);
            return (
                (product.count !== 0 ? <div key={product.id}>
                  <form className="prdct3">
                    <h3 id ="ttl">{product.name}</h3>
                    <img src={product.img_url} alt={product.name}/>
                    <label id ="ttl2">Qnty:
                    <input className ="inpt" type="number" min="1" max={product.inventory} placeholder={1} >
                    </input>
                    </label>
                    <button onClick={() => {
                      console.log("delete")
                      const token = localStorage.getItem("token");
                      if (token){
                        console.log ("iffff")
                       updateUserCartProduct({token:token, count: 0, cart_user_id: cart.user_id, product_id: product.id })
                       
                      }else{
                          console.log ("elseeee")
                       updateCartProduct({ count: 0, guest_cart_id: cart.guest_cart_id, cart_product_id: product.cartProductId })
                       }
                       }
                       } className="r2">Delete</button>
                   </form> 
                  </div> : null)
                  
            );
          })
        : null}
    </div>
  );
}
