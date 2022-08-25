import React,{useState, useEffect} from "react"
import { Route, Link, Routes } from "react-router-dom";
import { Products, Login, Register,Home,NavBar, SingleProduct, Cart, Checkout, MyAccount, Users } from "./index";
import { getCartByUserId, getGuestCartByCode, createGuestCart, createUserCart } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";


const App = () => {
    const [category,setCategory] = useState("");
    const [cart,setCart] = useState({});
    async function getCart() {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await getUser(token);
        console.log(token, "user")
        const gottenCart = await getCartByUserId(token, user.id);
        console.log(gottenCart, "gottenCart")
        if(!gottenCart.id) {
          const createdCart = await createUserCart(token);
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
           <NavBar setCategory={setCategory}/>
           <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products category={category}/>} />
            <Route path="/products/:product_id" element={<SingleProduct setCart={setCart}/>} />
            <Route path="/login" element={<Login setCart={setCart}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} />
            <Route path="/checkout/me" element={<MyAccount />} />
            <Route path="/checkout/" element={<Checkout />} />
            <Route path="/users" element={<Users />} />
            </Routes>
        </div>
    )

}

export default App;