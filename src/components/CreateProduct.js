import React, { useState } from "react";
import { createProduct } from "../api";

export default async function createProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [price_type, setPrice_type] = useState("");
  const [category, setCategory] = useState("");
  const [inventory, setInventory] = useState("");
  const [img_url, setImg_url] = useState("");

  const authToken = localStorage.getItem("token") ? true : false;

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    alert("New Product Created");
    const response = await createProduct(
      token,
      name,
      description,
      price,
      price_type,
      category,
      inventory,
      img_url
    );
    return response;
  }
  return (
    <section>
      <div>
        <div>
          <div>
            <div>
              {authToken === true && isAdmin === true ? (
                <>
                  <h1>Create a New Product</h1>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        placeholder="name"
                      ></input>
                      <input
                        type="text"
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="description"
                      ></input>
                      <input
                        type="text"
                        onChange={(event) => setPrice(event.target.value)}
                        placeholder="price"
                      ></input>
                      <input
                        type="text"
                        onChange={(event) => setPrice_type(event.target.value)}
                        placeholder="price_type"
                      ></input>
                      <input
                        type="text"
                        onChange={(event) => setCategory(event.target.value)}
                        placeholder="category"
                      ></input>
                      <input
                        type="text"
                        onChange={(event) => setInventory(event.target.value)}
                        placeholder="inventory"
                      ></input>
                      <input
                        type="text"
                        onChange={(event) => setImg_url(event.target.value)}
                        placeholder="Picture url"
                      ></input>
                      <button>Submit New Product</button>
                    </div>
                  </form>
                </>
              ) : (
                <h2>You are not an Admin</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
