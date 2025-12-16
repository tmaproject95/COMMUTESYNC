import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <style>{`
                @keyframes slideFromLeft {
                    from { transform: translateX(-150px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes slideFromRight {
                    from { transform: translateX(150px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes blink {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: "url(/images/p1.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textAlign: "center",
                }}
            >


                <button
                    onClick={() => navigate("/login")}
                    style={{
                        padding: "12px 35px",
                        fontSize: "16px",
                        borderRadius: "30px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "rgba(0,0,0,0.75)",
                        color: "white",
                        marginBottom: "15px",
                        animation: "slideFromLeft 1s ease-out, blink 1.5s infinite 1s",
                    }}
                >
                    Login
                </button>


                <button
                    onClick={() => navigate("/register")}
                    style={{
                        padding: "12px 35px",
                        fontSize: "16px",
                        borderRadius: "30px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "#2563eb",
                        color: "white",
                        animation: "slideFromRight 1s ease-out, blink 1.5s infinite 1s",
                    }}
                >
                    Register
                </button>


                <p
                    style={{
                        marginTop: "25px",
                        fontSize: "16px",
                        animation: "fadeIn 1s ease-in forwards",
                        animationDelay: "1.2s",
                        opacity: 0,
                    }}
                >
                    No account? Register now
                </p>
            </div>
        </>
    );
};

export default Home;
