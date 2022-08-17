import { useState } from "react"
import { userLogin } from "../api/loginindex";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token"):"");

    const submitHandler = async (event) => {
        event.preventDefault();
        const result = await userLogin(email, password);
        setMessage(result.message);
        if (result.token) {
            setToken(result.tokan);
            localStorage.setItem("token", result.tokan);
            localStorage.setItem("email", email);
        }
    }

    return(
        (token ? 
        <div>
            <h2>Login</h2>
            <h3>Logged in as {email}</h3>
            <button onClick={() => {
                localStorage.removeItem("token");
                setToken("");
            }}>Log Out</button>
        </div>
        :<div>
            <form className="login" onSubmit={submitHandler}>
                <h2>Login</h2>
                <fieldset>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input minLength={1} id="email" type="text" placeholder="email" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                </fieldset>
                <fieldset>
                <label htmlFor="password">
                        Password
                    </label>
                    <input minLength={1} id="password" type="text" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                </fieldset>
                <fieldset>
                    <button type="submit">Login</button>
                    <p>{message}</p>
                </fieldset>
            </form>
        </div>
        )
    )
}

export default Login