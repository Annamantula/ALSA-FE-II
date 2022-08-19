import { useEffect } from "react"
import { getCartByUserId, getGuestCartByCode } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";


export default function Cart(props) {
    const [cart, setCart] = [props.cart, props.setCart]
    async function getCart() {
        const token = localStorage.getItem("token");
        if(token) {
            const user = await getUser(token);
            const cart = await getCartByUserId(token, user.id);
            setCart(cart);
        }
        else {
            const cart = await getGuestCartByCode(localStorage.getItem("cartCode"));
            setCart(cart);
        }
    }
    useEffect(() => { 
        getCart();
    }
    , []);
    return (
        <div>
        <h2>Cart</h2>
        
        {(cart.products ? cart.products.map((product) => {
                return (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                    </div> 
                )
            }): null)}
        </div>
    )
}