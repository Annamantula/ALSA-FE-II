import React, { useState } from "react";
import { deleteProduct} from "../api/apiProductIndex";


export default function  DeleteProduct (props){
    const [product_id, refresh, setRefresh] = [props.product_id, props.refresh, props.setRefresh];
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") ? localStorage.getItem("isAdmin"):false)
    const authToken = localStorage.getItem("token") ? true : false;

    async function deleteProducts() {
        const token = localStorage.getItem("token");
        console.log(token, product_id, "NEWWWWW")
        const erase = await deleteProduct(token, product_id);
        return erase;
      }
    return (
        <div>
            {authToken && isAdmin ? (
        <button className = "btn2"
        onClick={() => {
          deleteProducts();
          setRefresh(!refresh);
        }}
        type="button">
        Delete Product
      </button>
        ) : (
            null
          )}
      </div>
    )
}

