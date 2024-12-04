import React, { CSSProperties, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import MailIcon from "../../components/icons/MailIcon";
import ScanIcon from "../../components/icons/ScanIcon";
import logo2 from "../../assets/images/logo2.png";
import toast, { Toaster } from "react-hot-toast";
import { attemptRegister } from "../../lib/admin/api-login";
import { handleRequestError } from "../../lib/api-error-handler";

export interface MyCustomCSS extends CSSProperties {
  "--rWidthValue": string;
  "--rH": string;
  "--textColor": string;
  "--bgHoverColor": string;
}

const AdminRegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('confirming details...');
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await attemptRegister(email, password);
      toast.success("redirecting...", { id: toastId });

      login(response);

      setTimeout(() => {
        navigate("/admin/dashboard");
      },2000)
    } catch (error) {
      console.error("Login error:", error);
      handleRequestError(error, toastId);
    }
  };

  return (
    <main className="relative w-full h-max-screen flex flex-col justify-evenly items-center bg-brand-white element-before">
      <div
        className="w-3-quarts h-[80vh] max-w-4xl flex flex-col p-5 justify-evenly items-center gap-5 bg-brand-white rounded-[20px] shadow-auth z-1 animate-slideDown sm-md-width h-md-sm"
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
            <h2 className="font-bold text-black text-xl md:text-3xl text-center mb-4">
              Welcome to <span className="text-xl md:text-3xl text-secondary">KIDEMIA</span>
            </h2>
            <p className="text-sm md:text-xl font-normal text-dark text-center">Create your passward to complete your registration as a Guardian</p>
          </div>
        </header>
        <form
          id="body"
          className="w-3-quarts flex flex-col justify-between items-center gap-5"
          onSubmit={handleRegister}
        >
          <div
            id="steps"
            className="w-3-quarts sm-w-value"
            style={{ "--rWidthValue": "100%" } as MyCustomCSS}
          >
            <div id="step" className="flex flex-col gap-5">
              <div
                id="inputBox"
                className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm"
              >
                <label htmlFor="email">
                  <MailIcon />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  className="w-full border-none outline-none bg-transparent font-xs text-16 text-dark md:h-14"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
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
                  className="w-full border-none outline-none bg-transparent md:h-14"
                  value={password}
                  onChange={handlePasswordChange}
                  minLength={6}
                  required
                />
              </div>
              <div
                id="inputPasswordBox"
                className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm"
              >
                <label htmlFor="checkPassword">
                  <ScanIcon />
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Check Password"
                  className="w-full border-none outline-none bg-transparent md:h-14"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  minLength={6}
                  required
                />
              </div>
              <button
                id="guardianRegBtn"
                className="w-full p-10 bg-primary text-white text-hover-color font-xs rounded-sm border-none cursor-pointer transition-all"
                style={{ "--textColor": "#f7f7f7" } as MyCustomCSS}
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster/>
    </main>
  );
};

export default AdminRegisterPage;
