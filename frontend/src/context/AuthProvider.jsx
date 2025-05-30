import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL  from "../config.jsx";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const res = await response.json();
            if (!response.ok) {
                throw new Error(res.message || "Invalid email or password");
            }

            if (res.token) {
                setToken(res.token);
                localStorage.setItem("site", res.token);

                // Fetch user details using the token
                const userResponse = await fetch(`${API_BASE_URL}/api/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${res.token}`,
                        "Content-Type": "application/json",
                    },
                });

                const userData = await userResponse.json();
                if (userResponse.ok) {
                    setUser(userData);
                    // Redirect based on user type
                    if (userData.userAccountId=== 1) {
                        navigate("/admindashboard");
                    } else {
                        navigate("/dashboard");
                    }
                } else {
                    throw new Error("Failed to fetch user details");
                }
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};