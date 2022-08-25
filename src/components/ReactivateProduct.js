import React, { useState } from "react";
import { activateProduct } from "../api/apiProductIndex";

export default function UpdateProduct(props) {
  const [product_id, refresh, setRefresh] = [props.product_id, props.refresh, props.setRefresh];
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") ? localStorage.getItem("isAdmin"):false)

  const authToken = localStorage.getItem("token") ? true : false;

  const handleClick = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const activatedProduct = await activateProduct(token, product_id);
    setRefresh(!refresh);
    console.log(activatedProduct)
     return activatedProduct;
  };
  return (
    <div>
            {authToken && isAdmin ? (
        <button className = "btn2"
        onClick={handleClick}
        type="button">
        Reactivate Product
      </button>
        ) : (
            null
          )}
      </div>
  );
}