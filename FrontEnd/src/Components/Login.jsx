import "../styles.css"
import { useState } from "react";
import axios from "axios";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/users/signin", {
                email,
                password
            }, { withCredentials: true });

            setMessage(res.data.message);
            localStorage.setItem("token", res.data.token); 
        } catch (error) {
            setMessage(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="signup">
            <div className="formcontainer">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="signupbutton" type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            </div>
           
        </div>
    );


}

export default Login;