import { useState, useEffect } from "react";
import api from "./Api";

const Register = ({ showBox }) => {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [passwordRegErrMsg, setPasswordRegErrMsg] = useState("");
  const [passwordRegErrMsg2, setPasswordRegErrMsg2] = useState("");
  const [validUsername, setValidUsername] = useState("");
  const [usernameAvailability, setUsernameAvailability] = useState(true);
  const [validPassword, setValidPassword] = useState("");
  const [usernameRegErrMsg, setUsernameRegErrMsg] = useState("");
  const [usernameRegErrMsg2, setUsernameRegErrMsg2] = useState("");

  const [actionText, setActionText] = useState("");

  useEffect(() => {
    if (actionText) {
      const timerId = setTimeout(() => {
        setActionText("");
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, [actionText]);

  useEffect(() => {
    checkValidUsername();
    checkUsernameAvailability();
    resetErrMsgs();
  }, [usernameReg]);

  useEffect(() => {
    checkValidPassword();
  }, [passwordReg]);

  const USER_REGEX = /^[A-z]{4,24}$/;
  // const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

  const PWD_REGEX = /^[A-z]{4,24}$/;
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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

  const addUser = async (e) => {
    e.preventDefault();
    resetErrMsgs();
    if (
      validUsername &&
      validPassword &&
      usernameAvailability &&
      passwordReg === confirmPasswordReg
    ) {
      try {
        console.log("adding user");
        const hashedPassword = await hashPassword(passwordReg);
        await api.post(`/adduser`, {
          username: usernameReg,
          password: hashedPassword,
        });
        setActionText(`${usernameReg} er lagt til`);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      if (!validUsername) {
        setUsernameRegErrMsg("Ugyldig brukernavn");
      }
      if (!validPassword) {
        setPasswordRegErrMsg2("Ugyldig passord");
      }
      if (passwordReg !== confirmPasswordReg) {
        setPasswordRegErrMsg("Passord matcher ikke");
      }
      if (!usernameAvailability) {
        setUsernameRegErrMsg2("Brukernavn er opptatt");
      }
    }
    resetInput();
  };

  const checkUsernameAvailability = async () => {
    try {
      const response = await api.post(`/checkusername`, {
        username: usernameReg,
      });
      setUsernameAvailability(response.data.available);
    } catch (error) {
      console.error("Error checking username availability:", error);
    }
  };

  const checkValidUsername = () => {
    setValidUsername(USER_REGEX.test(usernameReg));
  };
  const checkValidPassword = () => {
    setValidPassword(PWD_REGEX.test(passwordReg));
  };

  const resetInput = () => {
    setUsernameReg("");
    setPasswordReg("");
    setConfirmPasswordReg("");
    setUsernameAvailability(true);
  };

  const resetErrMsgs = () => {
    setPasswordRegErrMsg("");
    setPasswordRegErrMsg2("");
    setUsernameRegErrMsg("");
    setUsernameRegErrMsg2("");
  };

  return (
    <div className="Register">
      <h1>Registrer</h1>
      <form onSubmit={addUser}>
        <label htmlFor="registerInputReg">Brukernavn:</label>
        <div>
          <input
            type="text"
            id="registerInputReg"
            autoComplete="off"
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
          <br />
          <label htmlFor="passwordInputRegRepeat">Gjenta passord</label>
          <br />
          <input
            type="password"
            id="passwordInputRegRepeat"
            value={confirmPasswordReg}
            onChange={(e) => {
              setConfirmPasswordReg(e.target.value);
            }}
          />
        </div>
        <div className="ErrorMsg">
          {passwordRegErrMsg !== "" && <span>{passwordRegErrMsg}</span>}
          {passwordRegErrMsg2 !== "" && <span>{passwordRegErrMsg2}</span>}
        </div>
        <div className="ErrorMsg">
          {usernameRegErrMsg !== "" && <span>{usernameRegErrMsg}</span>}
          {usernameRegErrMsg2 !== "" && <span>{usernameRegErrMsg2}</span>}
        </div>
        {actionText}
        <br />
        <button type="submit">Registrer</button>
      </form>
      <br />
      <div>
        Allerede bruker?{" "}
        <a href="#" onClick={showBox}>
          Logg inn
        </a>
      </div>
    </div>
  );
};

export default Register;
