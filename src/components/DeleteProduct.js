import React from "react";
import { deleteProduct} from "../api";




export default function  DeleteProduct ({product_id}){
    async function deleteProducts() {
        const tokens = localStorage.getItem("token");
        const erase = await deleteProduct(tokens, product_id);
        return erase;
      }
    return (
        <button
        onClick={() => {
          deleteProducts();
        }}
        type="button">
        Delete Product
      </button>
    )
}