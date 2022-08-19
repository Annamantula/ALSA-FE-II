import React, { useState }  from "react";
import { createContactInfo } from "../api/userIndex";
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const[ first_name,setFirst_name] = useState('')
    const[last_name,setLast_name] =useState('')
    const[email,setEmail] = useState('')
    const[phone,setPhone]=useState()
   const [street,setStreet] =useState('')
    const[street_num,setStreet_num]=useState()
    const[apt,setApt]=useState()
    const[city,setCity]=useState('')
    const[zip,setZip]=useState()
    

    async function handleSubmit(event) {
        event.preventDefault();
        alert("Contact Created");
        const response = await createContactInfo({
            first_name:first_name,
            last_name:last_name,
            email:email,
            phone:phone,
            street:street,
            street_num:street_num,
            apt:apt,
            city:city,
            zip:zip
      });


        return response;
      }

      let nav = useNavigate();

    return(
        <div>
        <h1>Create Contact Info</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              onChange={(event) => setFirst_name(event.target.value)}
              placeholder="name"
            ></input>
            <input
              type="text"
              onChange={(event) => setLast_name(event.target.value)}
              placeholder="last name"
            ></input>
            <input
              type="text"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
            ></input>
            <input
              type="text"
              onChange={(event) => setPhone(event.target.value)}
              placeholder="phone number"
            ></input>
            <input
              type="text"
              onChange={(event) => setStreet(event.target.value)}
              placeholder="street"
            ></input>
            <input
              type="text"
              onChange={(event) => setStreet_num(event.target.value)}
              placeholder="street number"
            ></input>
            <input
              type="text"
              onChange={(event) => setApt(event.target.value)}
              placeholder="apt"
            ></input>
             <input
              type="text"
              onChange={(event) => setCity(event.target.value)}
              placeholder="city"
            ></input>
             <input
              type="text"
              onChange={(event) => setZip(event.target.value)}
              placeholder="zip code"
            ></input>
            <button type="submit"  onClick={(event) => {
              event.preventDefault();
              nav("/checkout");
            }}>Submit Info</button>
          </div>
        </form>
</div>
    )
}