import { useState } from "react";
import api from "./Api";

const Login = () => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const hashPassword = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  };

  const getLogin = async (e) => {
    e.preventDefault()
    try {
      console.log("Sjekker pålogging");
      const hashedPassword = await hashPassword(passwordLogin);

      const response = await api.post(`/login`, {
        username: usernameLogin,
        password: hashedPassword,
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

      {/* Bytte til Form fra Div, så kan jeg bruke enter */}
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
      <button onClick={() => handleLogin()}>Logg inn</button>
    </div>
  );
};

export default Login;