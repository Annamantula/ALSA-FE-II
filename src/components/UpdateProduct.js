import React, { useState } from "react";
import { updateProduct } from "../api/apiProductIndex";

export default function UpdateProduct(props) {
  const [product_id, refresh, setRefresh] = [props.product_id, props.refresh, props.setRefresh];
  const [name, setName] = useState(props.name ? props.name : "");
  const [description, setDescription] = useState(props.description ? props.description : "");
  const [price, setPrice] = useState(props.price ? props.price : 0);
  const [price_type, setPrice_type] = useState(props.price_type ? props.price_type : "");
  const [category, setCategory] = useState(props.category ? props.category : "");
  const [inventory, setInventory] = useState(props.inventory ? props.inventory : 0);
  const [img_url, setImg_url] = useState(props.img_url ? props.img_url : "");
  const [isActive] = [props.isActive];
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") ? localStorage.getItem("isAdmin"):false)

  const authToken = localStorage.getItem("token") ? true : false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const updatedProduct = await updateProduct({
      product_id: product_id,
      token: token,
      name: name,
      description: description,
      price: price,
      price_type: price_type,
      category: category,
      inventory: inventory,
      img_url: img_url,
      isActive: isActive
    }
    );
    setRefresh(!refresh);
    // setName("");
    // setDescription("");
    // setPrice(0);
    // setPrice_type("");
    // setCategory("");
    // setInventory(0);
    // setImg_url("");
    return updatedProduct;
  };
  return (
    <section>
      <div>
        <div>
          <div>
            <div>
              {authToken && isAdmin ? (
                <>
                  <h1>Update Product</h1>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input className ="inpt"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="name"
                        ></input>
                      <input className ="inpt"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="description"
                        ></input>
                      <input className ="inpt"
                        type="text"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        placeholder="price"
                        ></input>
                      <input className ="inpt"
                        type="text"
                        value={price_type}
                        onChange={(event) => setPrice_type(event.target.value)}
                        placeholder="price_type"
                        ></input>
                      <input className ="inpt"
                        type="text"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        placeholder="category"
                      ></input>
                      <input className ="inpt"
                        type="text"
                        value={inventory}
                        onChange={(event) => setInventory(event.target.value)}
                        placeholder="inventory"
                      ></input>
                      <input className ="inpt"
                        type="text"
                        value={img_url}
                        onChange={(event) => setImg_url(event.target.value)}
                        placeholder="Picture url"
                      ></input>
                      <button className = "btn2">Submit Product Update</button>
                    </div>
                  </form>
                </>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
