import { addProductToCart, updateCartProduct, updateUserCartProduct } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";

export default function CartCount(props){
    const [count, cartIndex, cart, refresh, setRefresh, product_id] = [props.count, props.cartIndex, props.cart, props.refresh, props.setRefresh, props.product_id]
    async function addOne() {
        const token = localStorage.getItem("token");
        if(token){
            const user = await getUser(token);
            console.log(cartIndex, "cartIndex")
            if(user){
                if(cartIndex !==undefined){
                    const upd = await updateUserCartProduct({token, count:(count + 1), user_id:user.id, cart_product_id: cart.products[cartIndex].cartProductId, product_id })
                    console.log(upd);
                }
                else{
                    console.log(product_id, cart.id, (count + 1))
                    await addProductToCart(product_id, cart.id, (count + 1))
                }
            }
        }
        else {
            console.log(cart);
            console.log(cartIndex, 'cindex')
            if(cartIndex !==undefined) {
                await updateCartProduct({ count: (count + 1), guest_cart_id: cart.guest_cart_id, cart_product_id: cart.products[cartIndex].cartProductId })
                
            }
            else{
                await addProductToCart(product_id, cart.id, count + 1)
            }
        }
        setRefresh(!refresh);
    }
    async function minusOne(){
        const token = localStorage.getItem("token");
        console.log(cartIndex, 'cindex')
        if(token){
            const user = await getUser(token);
            if(user && count >= 1) {
                await updateUserCartProduct({token, count: (count - 1), user_id:user.id, cart_product_id: cart.products[cartIndex].cartProductId, product_id })   
            }
        }
        else {
            if(cartIndex !==undefined && count >= 1) {
                await updateCartProduct({ count:(count - 1), guest_cart_id: cart.guest_cart_id, cart_product_id: cart.products[cartIndex].cartProductId })
            }
        }
        setRefresh(!refresh);
    }
    return(
        <div>
            <h5 id ="ttl2">Number In Cart: {count}</h5>
            <div>
            <button onClick={(event) => {
                event.preventDefault();
                addOne();
            }
            }>+1</button>
            <button onClick={(event) => {
                event.preventDefault();
                minusOne();
            }
            }>-1</button>
            </div>
            
        </div>
    )
}