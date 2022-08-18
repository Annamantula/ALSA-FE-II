import React from "react"


export default function Home (props) {

    const [setCategory] = [props.setCategory];


    return(

       

        <div>
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
  </div>

    )
}