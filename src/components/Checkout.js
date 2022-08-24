import React  from "react";
import { useNavigate } from "react-router-dom";
import { deleteGuestCart,deleteUserCart } from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";

export default function Checkout() {
    // const[ first_name,setFirst_name] = useState('')
    // const[last_name,setLast_name] =useState('')
    // const[cardNumber,setCardNumber] = useState()
    // const[exp,setExp]=useState("")
    // const [cvc,setCvc] =useState()
    // const[country,setCountry]=useState("")
    // const[zip,setZip]=useState()
    

    async function handleSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if(token){
          console.log (token , "my tooooken")
        const user = await getUser (token)
        const deleted = await deleteUserCart(token, user.id);
        console.log(deleted);
        }
        else {
          const deleted = await deleteGuestCart(localStorage.getItem("cartCode"));
          console.log(deleted);
        }
        
        alert("Confirmed");
      };

      let nav = useNavigate();

    return(
        <div>
        <h1 className="slogan3">Card Info</h1>
        <form className="login" onSubmit={handleSubmit}>
          <div>
            <input className ="inpt"
              type="text"
            //   onChange={(event) => setFirst_name(event.target.value)}
              placeholder="Name"
            ></input>
            <input className ="inpt"
              type="text"
            //   onChange={(event) => setLast_name(event.target.value)}
              placeholder="Last name"
            ></input>
            <input className ="inpt"
              type="text"
            //   onChange={(event) => setCardNumber(event.target.value)}
              placeholder="Card number"
            ></input>
            <input className ="inpt"
              type="text"
            //   onChange={(event) => setExp(event.target.value)}
              placeholder="Expiration"
            ></input>
            <input className ="inpt"
              type="text"
            //   onChange={(event) => setCvc(event.target.value)}
              placeholder="CVC"
            ></input>
            <input className ="inpt"
              type="text"
            //   onChange={(event) => setCountry(event.target.value)}
              placeholder="Country"
            ></input>
             <input className ="inpt"
              type="text"
            //   onChange={(event) => setZip(event.target.value)}
              placeholder="zip code"
            ></input>
            <button className = "btn2" type="submit"  onClick={(event) => {
              event.preventDefault();
              handleSubmit(event);
              nav("/Products");
            }}>Confirm</button>
          </div>
        </form>
</div>
    )
}