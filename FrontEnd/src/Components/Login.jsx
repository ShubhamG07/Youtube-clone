import "../styles.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Utils/authSlice";
import { Link } from "react-router-dom";

function Login(){

    const navigate=useNavigate();
    const dispatch=useDispatch();
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
            dispatch(loginSuccess(res.data));
            setTimeout(() => {
                setMessage('');
                navigate('/');
              },1000);
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
            <Link to='/register'><p>Signup</p></Link>
            {message && <p>{message}</p>}
            </div>
           
        </div>
    );


}

export default Login;