import React, { useEffect, useState } from "react"
import { getAllProducts } from "../api/apiProductIndex";
import { UpdateProduct, DeleteProduct } from "./index"

export default function Products() {
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);
    useEffect(() => {
        getAllProducts().then((result) => {
          setProducts(result);
        });
      }, [refresh]);

     return(
      <div>
        
        {products.map((product, id) => {
        return (
          (product.isActive || localStorage.getItem("isAdmin")? (
          <div key={id} >
          <h5>Name:</h5>
          <p>{product.name}</p>
          <img src={product.img_url} alt={product.name}/>
          <h5 >Description:</h5>
          <p>{product.description}</p>
          <h5 >Price:</h5>
          <p>{product.price}<span>{product.price_type}</span></p>
          <h5 >Category:</h5>
          <p>{product.category}</p>
          <h5 >Inventory:</h5>
          <p>{product.inventory}</p>
          <UpdateProduct name={product.name} refresh={refresh} setRefresh={setRefresh} price_type={product.price_type} description={product.description} price={product.price} category={product.category} inventory={product.inventory} img_url={product.img_url} product_id={product.id} />
          <DeleteProduct product_id={product.id}/>
        </div>)
        : null
          ))
          })}
      </div>
     )

}
