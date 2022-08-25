import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/apiProductIndex";
import { UpdateProduct, DeleteProduct, CreateProduct, ReactivateProduct } from "./index"

export default function Products(props) {
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [category] = [props.category];
  const [message, setMessage] = useState(0);

    useEffect(() => {
        getAllProducts().then((result) => {
          setProducts(result);
        });
      }, [refresh]);

    

     return(
        
      <div>
        {/* <div>
              <button onClick={(event)=>{
                event.preventDefault() 
              setCategory("fruit")
            }}>Fruit</button>
          <button onClick={(event)=>{
                event.preventDefault() 
            setCategory("grocery")}}>Grocery</button>
          <button onClick={(event)=>{
                event.preventDefault() 
            setCategory("meat")}}>Meat</button>
          <button onClick={(event)=>{
                event.preventDefault() 
            setCategory("vegetable")}}>Vegetable</button>
            <button onClick={(event)=>{
                event.preventDefault() 
            setCategory("")}}>All Categories</button>
        </div> */}
        {(localStorage.getItem("isAdmin") === "true" ? <CreateProduct />:null)}
        
        {products.map((product) => {
        return (
          ((product.isActive || localStorage.getItem("isAdmin")) && (!category || product.category === category) ? (
          <div className="prdct" key={product.id} >
           <form >
            <h3 id ="ttl">Category:</h3>
          <p id ="p1">{product.category}</p>
          {/* <h5 >Inventory:</h5> */}

            <h3 id ="ttl">Name:</h3>
          <p id ="p1">{product.name}</p>
          <img src={product.img_url} alt={product.name}/>

          <h5 id ="ttl3"><Link to={`/products/${product.id}`}>Details:</Link></h5 >
          
          {/* <h5 >Description:</h5> */}
          <p id ="p2">{product.description}</p>
          <h5 id ="ttl2">Price:</h5>
          <p id ="p2">{product.price}<span>{product.price_type}</span></p>

          <h5 id ="ttl2">In Stock:</h5>
          <p id ="p2">{product.inventory}</p>
          
          
            </form>
            {(localStorage.getItem("isAdmin") === "true" ? <div>
              <h5 id = "tt12">Is Active: {product.isActive}</h5>
              <p id = "p2">{`${product.isActive}`}</p>
          <UpdateProduct name={product.name} refresh={refresh} setRefresh={setRefresh} price_type={product.price_type} description={product.description} price={product.price} category={product.category} inventory={product.inventory} img_url={product.img_url} isActive={product.isActive} product_id={product.id} />
          {product.isActive === true ? 
          <DeleteProduct product_id={product.id} refresh={refresh} setRefresh={setRefresh} />
        : <ReactivateProduct refresh={refresh} setRefresh={setRefresh}  product_id={product.id} />
        }
          
            </div>:null)}
        </div>)
        : null
          ))
          })}
      </div>
     )

}
