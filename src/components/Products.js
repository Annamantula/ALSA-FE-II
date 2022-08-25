import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { createGuestCart, createUserCart, getAllProducts, getCartByUserId, getGuestCartByCode } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";
import { UpdateProduct, DeleteProduct, CreateProduct, ReactivateProduct, CartCount } from "./index"

export default function Products(props) {
  const [refresh, setRefresh] = [props.refresh, props.setRefresh];
  const [products, setProducts] = useState([]);
  const [category] = [props.category];
  const [cart, setCart] = [props.cart, props.setCart];
  const [message, setMessage] = useState(0);
  const [cartProductIds, setCartProductIds] = useState([]);

  useEffect(() => {
    getAllProducts().then((result) => {
      if (cart.products) {
        const cartProducts = cart.products.map((product) => {
          return product.id;
        })
        setCartProductIds(cartProducts);
      }
      setProducts(result);
    })
  }, [refresh, cart]);

  return (
    <div>
      {(localStorage.getItem("isAdmin") === "true" ? <CreateProduct refresh={refresh} setRefresh={setRefresh} /> : null)}
      {products.map((product) => {
        return (
          ((product.isActive || localStorage.getItem("isAdmin")) && (!category || product.category === category) ? (
            <div className="prdct" key={product.id} >
              <form className="frm" >
                <h3 id="ttl">Category:</h3>
                <p id="p1">{product.category}</p>
                <h3 id="ttl">Name:</h3>
                <p id="p1">{product.name}</p>
                <img className="img2" src={product.img_url} alt={product.name} />
                <h5 id="ttl3"><Link to={`/products/${product.id}`}>Details:</Link></h5 >
                <h5 id="ttl2">Price:</h5>
                <p id="p2">{product.price}<span>{product.price_type}</span></p>
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
              {(localStorage.getItem("isAdmin") === "true" ? <div>
                <h5 id="ttl2">Is Active: {product.isActive}</h5>
                <p id="p2">{`${product.isActive}`}</p>
                <UpdateProduct name={product.name} refresh={refresh} setRefresh={setRefresh} price_type={product.price_type} description={product.description} price={product.price} category={product.category} inventory={product.inventory} img_url={product.img_url} isActive={product.isActive} product_id={product.id} />
                {product.isActive === true ?
                  <DeleteProduct product_id={product.id} refresh={refresh} setRefresh={setRefresh} />
                  : <ReactivateProduct refresh={refresh} setRefresh={setRefresh} product_id={product.id} />
                }
              </div> : null)}
            </div>)
            : null
          ))
      })}
    </div>
  )

}
