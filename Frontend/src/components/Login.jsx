import { useState } from "react";
import api from "./Api";

const Login = () => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const getLogin = async () => {
    try {
      console.log("Sjekker pålogging");
      const response = await api.post(`/login`, {
        username: usernameLogin,
        password: passwordLogin,
      });

      if (response.data.success) {
        console.log("Pålogging vellykket!");
      } else {
        console.log("Feil ved pålogging:", response.data.message);
      }
    } catch (error) {
      console.log("Feil ved pålogging:", error.message);
    } finally {
      setUsernameLogin("");
      setPasswordLogin("");
    }
  };

  const handleLogin = () => {
    getLogin();
  };

  return (
    <div className="Login">
      <h1>Logg inn</h1>

      <label htmlFor="loginInputLogin">Brukernavn:</label>
      <div>
        <input
          type="text"
          id="loginInputLogin"
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
      <button onClick={() => handleLogin()}>Logg inn</button>
    </div>
  );
};

export default Login;
