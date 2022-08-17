import React, { useEffect, useState } from "react"
import { getAllProducts } from "../api/apiProductIndex";
import { CreateProduct } from "./index"

export default function Products() {
  const [products, setProducts] = useState([]);
    useEffect(() => {
        getAllProducts().then((result) => {
          setProducts(result);
        });
      }, []);

     return(
      <div>
        <CreateProduct />
        {products.map((product, id) => {
        return (
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
          </div>
        );
      })}
      </div>
     )

}
