import React from "react";
import { deleteProduct} from "../api";




export default function  DeleteProduct ({product_id}){
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") ? localStorage.getItem("isAdmin"):false)
    const authToken = localStorage.getItem("token") ? true : false;

    async function deleteProducts() {
        const tokens = localStorage.getItem("token");
        const erase = await deleteProduct(tokens, product_id);
        return erase;
      }
    return (
        <div>
            {authToken && isAdmin ? (
        <button
        onClick={() => {
          deleteProducts();
        }}
        type="button">
        Delete Product
      </button>
        ) : (
            <h2>You are not an Admin</h2>
          )}
      </div>
    )
}