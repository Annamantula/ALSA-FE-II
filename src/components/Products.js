import React from "react"
import { getAllProducts } from "../api/apiProductIndex";

export default async function Product({products,setProducts}) {

    useEffect(() => {
        getAllProducts().then((result) => {
          setProducts(result);
        });
      }, []);

      const productMap = products.map((product,id) => {
        return (
            <div>
                <button>Create Product</button>
                <button>Update Product</button>
                <button>Delete</button>
          <div key={id} >
            <h5>Name:</h5>
            <p>{product.name}</p>
            <p>{product.img_url}</p>
            <h5 >Description:</h5>
            <p>{product.description}</p>
            <h5 >Price:</h5>
            <p>{product.price}<span>{product.price_type}</span></p>
            <h5 >Category:</h5>
            <p>{product.category}</p>
            <h5 >Inventory:</h5>
            <p>{product.inventory}</p>
          </div>
          </div>
        );
      });
    return(
<div>
    {productMap}
</div>
    )
}
