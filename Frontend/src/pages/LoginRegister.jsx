import { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import "../styleSheets/LoginRegister.css";

const LoginRegister = () => {
  const [loginBox, setLoginBox] = useState(true);
  const [registerBox, setRegisterBox] = useState(false);

  const showBox = () => {
    if (loginBox){
        setLoginBox(false)
        setRegisterBox(true)
    } else {
        setLoginBox(true)
        setRegisterBox(false)
    }
  }

  return (
    <div className="LoginAndReg">
      <div>{loginBox && <Login showBox = {showBox} />}</div>
      <div>{registerBox && <Register showBox = {showBox} />}</div>
    </div>
  );
};

export default LoginRegister;
