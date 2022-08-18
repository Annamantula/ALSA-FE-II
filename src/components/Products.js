import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/apiProductIndex";
import { UpdateProduct, DeleteProduct, CreateProduct } from "./index"

export default function Products(props) {
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [category] = [props.category];

    useEffect(() => {
        getAllProducts().then((result) => {
          setProducts(result);
        });
      }, []);

    

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
        <CreateProduct />
        {products.map((product) => {
        return (
          ((product.isActive || localStorage.getItem("isAdmin")) && (!category || product.category === category) ? (
          <div key={product.id} >
            <Link to={`/products/${product.id}`}>Details</Link>
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
          <UpdateProduct name={product.name} refresh={refresh} setRefresh={setRefresh} price_type={product.price_type} description={product.description} price={product.price} category={product.category} inventory={product.inventory} img_url={product.img_url} product_id={product.id} />
          <DeleteProduct product_id={product.id}/>
        </div>)
        : null
          ))
          })}
      </div>
     )

}
