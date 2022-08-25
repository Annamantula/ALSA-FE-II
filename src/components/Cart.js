import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartByUserId, getGuestCartByCode, createGuestCart, updateCartProduct,updateUserCartProduct,createUserCart } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";
import { CartCount } from "./index";


export default function Cart(props) {
  const [cart, setCart] = [props.cart, props.setCart];
  const [count,setCount] = useState(0)
  const [refresh, setRefresh] = [props.refresh, props.setRefresh];
  const [cartProductIds, setCartProductIds] = useState([]);

  useEffect(() => {
    console.log(cartProductIds)
  }, [refresh]);

  async function handleUpdateProduct({count, cart, product }){
    console.log("delete")
    const token = localStorage.getItem("token");
    if (token){
      console.log ("iffff")
     const cart2 =await updateUserCartProduct({token:token, count: count, cart_user_id: cart.user_id, product_id: product.cartProductId})
     console.log(cart2)
    }else{
        console.log ("elseeee")
     const cart2 = await updateCartProduct({ count: count, guest_cart_id: cart.guest_cart_id, cart_product_id: product.cartProductId })
     console.log(cart2)
    }
    setRefresh(!refresh);
  }


  return (
    <div  >
      <h2 className="slogan2">My Cart</h2>
      <Link className = "chck" to="/checkout/me">Checkout</Link>

      {cart.products.length > 0
        ? cart.products.map((product, index) => {
            console.log(product);
            return (
                (product.count !== 0 ? <div key={product.id}>
                  <div className="r3">
                  <div className="prdct3">
                    <h3 id ="ttl">{product.name}</h3>
                    <div>
                    <img src={product.img_url} alt={product.name}/>
                    </div>
                    <p>${product.price}</p>
                    <CartCount 
          count={product.count}
            cartIndex={index} 
            cart={cart} 
            refresh={refresh} 
            setRefresh={setRefresh} 
            product_id={product.id}/>
                    
                    
                   </div> 
                      </div>
                  </div> : null)
                  
            );
          })
        : null}
    </div>
  );
}
