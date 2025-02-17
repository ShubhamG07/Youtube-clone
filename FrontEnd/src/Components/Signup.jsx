import "../styles.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(){
    
    const navigate =useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/users/signup", {
                username,
                email,
                password
            }, { withCredentials: true });

            setMessage(res.data.message);
            setTimeout(() => {
                setMessage('');
                navigate('/login');
              },2000);
        } catch (error) {
            setMessage(error.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="signup">
            <div className="formcontainer">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="signupbutton" type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
            </div>
           
        </div>
    );


}

export default Signup;