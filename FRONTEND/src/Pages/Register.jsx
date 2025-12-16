import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/users/register", form);
            alert(res.data.message);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "100vh",
                backgroundImage: "url(/images/p1.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "Arial, sans-serif",
                paddingTop: "200px",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    padding: "40px 50px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    width: "400px",
                    maxWidth: "90%",
                    textAlign: "center",
                    backdropFilter: "blur(20px)",
                }}
            >
                <h2 style={{ marginBottom: "30px", color: "#333" }}>Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        name="first_name"
                        placeholder="First Name"
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "12px 15px",
                            marginBottom: "15px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            outline: "none",
                        }}
                    />
                    <input
                        name="last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "12px 15px",
                            marginBottom: "15px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            outline: "none",
                        }}
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "12px 15px",
                            marginBottom: "15px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            outline: "none",
                        }}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
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
                            background: "linear-gradient(135deg, #ff6a00, #ee0979)",
                            color: "#fff",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseOver={e =>
                            (e.target.style.background = "linear-gradient(135deg, #ee0979, #ff6a00)")
                        }
                        onMouseOut={e =>
                            (e.target.style.background = "linear-gradient(135deg, #ff6a00, #ee0979)")
                        }
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
