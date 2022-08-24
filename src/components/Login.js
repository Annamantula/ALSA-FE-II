import "./login.css"
import { useState } from "react"
import { userLogin } from "../api/loginindex";
import { useNavigate } from "react-router-dom";
import { createUserCart, getCartByUserId } from "../api/apiProductIndex";

function Login(props) {
    let navigate = useNavigate()
    const [setCart] = [props.setCart]
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token"):"");

    const submitHandler = async (event) => {
        event.preventDefault();
        const result = await userLogin(email, password);
        setMessage(result.message);
        if (result.token) {
            setToken(result.token);
            localStorage.setItem("token", result.token);
            localStorage.setItem("email", email);
            localStorage.setItem("isAdmin", result.user.isAdmin)
            if (getCartByUserId(result.token, result.user.id)){
           
            const cart = await getCartByUserId(result.token, result.user.id)
            setCart(cart)
            }else{
           const cart = await createUserCart(result.token)
            setCart(cart)
            }
        }
    }

    const registerButton = async (event) => {
        event.preventDefault();
        navigate("/register");
      };

    return(
        (token ? 
        <div>
            <h2 className="fw-bold mb-2 text-uppercase"></h2>
            <h3 className="wlcm">Welcome {email}</h3>
            <button className = "btn2" onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("isAdmin");
                setToken("");
            }}>Log Out</button>
        </div>
        :<div>
            
            <form className="login" onSubmit={submitHandler}>
                <h2></h2>
                <fieldset>
                    <label htmlFor="email" className="crdn">
                        Email
                    </label>
                    <input className ="inpt" minLength={1} id="email" type="text" placeholder="email" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                </fieldset>
                <fieldset>
                <label htmlFor="password" className="crdn">
                        Password
                    </label>
                    <input className ="inpt" minLength={1} id="password" type="text" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                </fieldset>
                <fieldset>
                    <button className = "btn2" type="submit">Login</button>
                    <button className = "btn2" type="submit" onClick={registerButton}>Register</button>
                    <p></p>
                </fieldset>
            </form>
        </div>
        )
    )
}

export default Login