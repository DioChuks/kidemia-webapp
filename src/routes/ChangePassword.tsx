import React, { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/images/logo2.png";
import ScanIcon from "../components/icons/ScanIcon";

export interface MyCustomCSS extends CSSProperties {
  "--rWidthValue": string;
  "--rH": string;
  "--textColor": string;
  "--bgHoverColor": string;
}

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleValidationMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== password) {
      setMsg("Password doesn't match!");
      return;
    }

    setMsg("Password match!");
  };

  const handleChangeForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login logic here
    console.log("Password:", password);
  };

  return (
    <main className="relative w-full h-max-screen flex flex-col justify-evenly items-center bg-brand-white element-before">
      <div
        className="w-3-quarts h-50 flex flex-col p-5 justify-evenly items-center gap-5 bg-brand-white rounded-[20px] shadow-auth z-1 animate-slideDown sm-md-width h-md-sm"
        style={{ "--rWidthValue": "95%", "--rH": "80%" } as MyCustomCSS}
      >
        <Link to="/" className="h-8 r-img">
          <img src={logo2} alt="logo-pro-1" className="w-inherit h-inherit" />
        </Link>
        <header
          className="flex flex-col justify-between items-center gap-5"
          id="formHeader"
        >
          <div id="title">
            <h2 className="text-center">Change Password</h2>
            <p className="font-xs text-dark text-center">
              Do well not to forget your password this time
            </p>
          </div>
        </header>
        <form
          id="body"
          className="w-3-quarts flex flex-col justify-between items-center gap-5"
          onSubmit={handleChangeForm}
        >
          <div
            id="steps"
            className="w-3-quarts sm-w-value"
            style={{ "--rWidthValue": "100%" } as MyCustomCSS}
          >
            <div id="step" className="flex flex-col gap-5">
              <div
                id="inputPasswordBox"
                className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm"
              >
                <label htmlFor="password">
                  <ScanIcon />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full border-none outline-none bg-transparent"
                  value={password}
                  minLength={6}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div
                id="checkPasswordBox"
                className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm"
              >
                <label htmlFor="confirmPassword">
                  <ScanIcon />
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirmPassword"
                  placeholder="Check Password"
                  className="w-full border-none outline-none bg-transparent"
                  minLength={6}
                  onChange={handleValidationMsg}
                  required
                />
              </div>

              <span
                className={`text-dark text-14 ${msg === "Password match!" ? "text-green" : "text-red"}`}
              >
                {msg}
              </span>

              <button
                id="loginBtn"
                className="w-full p-10 bg-primary text-white text-hover-color font-xs rounded-sm border-none cursor-pointer transition-all"
                style={{ "--textColor": "#f7f7f7" } as MyCustomCSS}
                type="submit"
              >
                Continue
              </button>
              <div id="registerLink" className="text-center">
                <span>
                  I don't have an account{" "}
                  <Link
                    to="/register"
                    className="text-primary text-hover-underline"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ChangePassword;
