import { useState } from "react";
import useAuth from "./Auth/useAuth";
import api from "./Api";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const hashPassword = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  };

  const getLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Sjekker pålogging fra frontend");
      const hashedPassword = await hashPassword(passwordLogin);

      const response = await api.post(`/users/login`, {
        username: usernameLogin,
        password: hashedPassword,
      });

      if (response.data.success) {
        console.log(response.data.message);

        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken); // Lagre token i Local Storage eller tilsvarende

        fetchUsers();
        setAuth({ user: response.data.user, isAuthenticated: true });
        // navigate(from, {replace: true}); Hvis jeg ønsker å sende til forrige siden, eller den han ønsket å gå til
        navigate("/", {replace: true});
      } else {
        console.log("Feil ved pålogging:", response.data.message);
      }
    } catch (error) {
      console.log("Feil ved pålogging:", error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(usernameLogin + " er logget inn");
    } catch (error) {
      console.log("Feil ved henting av brukerinformasjon:", error.message);
    }
  };

  return (
    <div className="Login">
      <h1>Logg inn</h1>
      <form onSubmit={getLogin}>
        <label htmlFor="loginInputLogin">Brukernavn:</label>
        <div>
          <input
            type="text"
            id="loginInputLogin"
            autoComplete="off"
            onChange={(e) => {
              setUsernameLogin(e.target.value);
            }}
          />
          <br />
          <label htmlFor="passwordInputLogin">Passord:</label>
          <br />
          <input
            type="password"
            id="passwordInputLogin"
            onChange={(e) => {
              setPasswordLogin(e.target.value);
            }}
          />
        </div>
        <br />
        <button type="submit">Logg inn</button>
      </form>
    </div>
  );
};

export default Login;
