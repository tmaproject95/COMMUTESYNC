import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/users/login", { email, password });
            alert(res.data.message);
            navigate("/neww");
        } catch (err) {
            alert(err.response?.data || "Login failed");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage: "url(/images/p1.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    padding: "40px 50px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    width: "360px",
                    maxWidth: "90%",
                    textAlign: "center",
                    backdropFilter: "blur(5px)",
                }}
            >
                <h2 style={{ marginBottom: "30px", color: "#333" }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px 15px",
                            marginBottom: "20px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            outline: "none",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px 15px",
                            marginBottom: "25px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            outline: "none",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "none",
                            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                            color: "#fff",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseOver={e =>
                            (e.target.style.background = "linear-gradient(135deg, #2575fc, #6a11cb)")
                        }
                        onMouseOut={e =>
                            (e.target.style.background = "linear-gradient(135deg, #6a11cb, #2575fc)")
                        }
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
