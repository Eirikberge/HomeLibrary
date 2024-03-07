import { useState, useEffect, useRef } from "react";
import api from "./Api";

const Register = () => {

  // const userRef = useRef();
  // const errRef = useRef();

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");



  const addUser = async () => {
    try {
      console.log("adding user");
      await api.post(`/adduser`, {
        username: usernameReg,
        password: passwordReg,
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
    setUsernameReg("");
    setPasswordReg("");
  };

  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PWD_REGEX = /^;(?=.*[a-z])(?=.*[A-Z]){8,24}$/;

  return (
    <div className="Register">
      <h1>Registrer</h1>

      <label htmlFor="registerInputReg">Brukernavn:</label>
      <div>
        <input
          type="text"
          id="registerInputReg"
          value={usernameReg}
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <br />
        <label htmlFor="passwordInputReg">Password:</label>
        <br />
        <input
          type="password"
          id="passwordInputReg"
          value={passwordReg}
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
      </div>
      <button onClick={() => addUser()}>Registrer</button>
    </div>
  );
};

export default Register;
