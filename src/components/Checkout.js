import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteGuestCart, deleteUserCart } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";

export default function Checkout() {
  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getUser(token);
      const deleted = await deleteUserCart(token, user.id);
    } else {
      const deleted = await deleteGuestCart(localStorage.getItem("cartCode"));
    }

    alert("Confirmed");
  }

  let nav = useNavigate();

  return (
    <div>
      <h1 className="slogan3">Card Info</h1>
      <form className="login" onSubmit={handleSubmit}>
        <div>
          <input className="inpt" type="text" placeholder="Name"></input>
          <input className="inpt" type="text" placeholder="Last name"></input>
          <input className="inpt" type="text" placeholder="Card number"></input>
          <input className="inpt" type="text" placeholder="Expiration"></input>
          <input className="inpt" type="text" placeholder="CVC"></input>
          <input className="inpt" type="text" placeholder="Country"></input>
          <input className="inpt" type="text" placeholder="zip code"></input>
          <button
            className="btn2"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              handleSubmit(event);
              nav("/Products");
            }}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
