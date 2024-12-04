import React, { useContext, useState } from "react";
import MailIcon from "../../components/icons/MailIcon";
import ScanIcon from "../../components/icons/ScanIcon";
import GoogleLogo from "../../assets/images/google.png";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { IRegisterUser } from "../../lib/@types/users";
import { attemptRegister } from "../../lib/user/api-auth";
import { AuthContext } from "../../contexts/AuthContext";
import { handleRequestError } from "../../lib/api-error-handler";

interface Purpose {
  id: number;
  name: string;
}


const StudentStep: React.FC<{onProgress: (pos: string) => void}> = ({ onProgress }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState<"personal" | "purpose" | "guardian">(
    "personal",
  );

  const [userData, setUserData] = useState<IRegisterUser>({
    type: "student",
    email: "",
    password: "",
    confirm_password: "",
    purpose: null,
    guardian_email: "",
  });

  const purposes: Purpose[] = [
    { id: 1, name: "Common Entrance" },
    { id: 2, name: "Junior WAEC" },
    { id: 3, name: "Senior WAEC" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePurposeChange = (purposeId: number) => {
    setUserData((prevState) => ({
      ...prevState,
      purpose: purposeId,
    }));
  };

  const handleNextStep = () => {
    if (step === "personal") {
      setStep("purpose");
    }
    else if (step == "purpose" && userData.purpose == null) {
      return;
    } 
    else if (step === "purpose" && userData.purpose !== null) {
      setStep("guardian");
    }
    onProgress("next");
  };

  const handleBackStep = () => {
    if (step === "purpose") {
      setStep("personal");
    } else if (step === "guardian") {
      setStep("purpose");
    }
    onProgress("back");
  };

  const handleSubmit = async () => {
    const toastId = toast.loading('processing...');
    try {
      console.log(userData);
      const response = await attemptRegister(userData);
      toast.success("redirecting...", { id: toastId });
      login(response);
      setTimeout(() => {
        navigate("/dashboard");
      },2000)
    } catch (error) {
      console.error("Registration error:", error);
      handleRequestError(error, toastId);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "personal":
        return (
          <div id="step" className="flex flex-col gap-5">
            <div
              id="inputBox"
              className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm border border-primary"
            >
              <label htmlFor="email">
                <MailIcon />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                className="w-full border-none outline-none bg-transparent font-xs text-16 text-dark"
                required
                onChange={handleInputChange}
              />
            </div>
            <div
              id="inputPasswordBox"
              className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm border border-primary"
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
                minLength={6}
                required
                onChange={handleInputChange}
              />
            </div>
            <div
              id="checkPasswordBox"
              className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm border border-primary"
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
                required
                onChange={handleInputChange}
              />
            </div>
            <button
              id="nextStep"
              className="w-full p-10 bg-primary text-white text-hover-color font-xs rounded-sm border-none cursor-pointer transition-all"
              style={{ "--textColor": "#f7f7f7" } as React.CSSProperties}
              type="button"
              onClick={handleNextStep}
            >
              Sign Up
            </button>
            <h3 className="font-lg text-center">OR</h3>
            <a
              href="#"
              id="registerWithGoogle"
              className="w-full flex justify-start items-center gap-10 p-10 bg-white bg-hover font-xs rounded-sm border-none cursor-pointer transition-all"
              style={{ "--bgHoverColor": "#f7f7f7" } as React.CSSProperties}
            >
              <img src={GoogleLogo} alt="google-logo" /> Sign up with Google
            </a>
            <div id="loginLink" className="text-center">
              <span>
                I have an account{" "}
                <Link to="/login" className="text-primary text-hover-underline">
                  Login
                </Link>
              </span>
            </div>
          </div>
        );
      case "purpose":
        return (
          <div
            id="step"
            className="w-full flex-col justify-evenly items-center gap-5 my-6"
            style={{ "--rH": "300px" } as React.CSSProperties}
          >
            <h2 className="text-lg md:text-xl text-dark">What are you preparing for?</h2>
            <br />
            <div className="w-3-quarts flex justify-between items-center gap-5">
              {purposes.map((purpose) => (
                <div
                  key={purpose.id}
                  className={`w-auto h-4 flex items-center p-10 gap-2 rounded-sm transition-all purpose-box 
                    ${purpose.id === userData.purpose ? 'bg-secondary':''}`}
                  id="purposeBox"
                >
                  <input
                    type="radio"
                    className="cursor-pointer purpose-radio"
                    name="purpose"
                    id={`purpose-${purpose.id}`}
                    aria-describedby="purpose"
                    value={purpose.id}
                    onChange={() => handlePurposeChange(purpose.id)}
                    checked={purpose.id === userData.purpose}
                  />
                  <label
                    htmlFor={`purpose-${purpose.id}`}
                    className="cursor-pointer"
                  >
                    {purpose.name}
                  </label>
                </div>
              ))}
            </div>
            <br />
            <div className="w-full flex justify-between items-center">
              <a
                id="backStep"
                className="text-dark font-xs cursor-pointer"
                onClick={handleBackStep}
              >
                &lt; Back
              </a>
              <button
                id="nextStep"
                className="w-half p-10 bg-primary text-white text-hover-color font-xs rounded-sm border-none transition-all continue-purpose"
                style={{ "--textColor": "green" } as React.CSSProperties}
                type="button"
                onClick={handleNextStep}
                disabled={userData.purpose === null}
              >
                continue
              </button>
            </div>
          </div>
        );
      case "guardian":
        return (
          <div
            id="step"
            className="w-full flex-col justify-evenly items-center gap-5 h-md-sm my-8"
            style={{ "--rH": "300px" } as React.CSSProperties}
          >
            <h2 className="text-lg md:text-xl text-black text-center font-bold">Let's meet your guardian</h2>
            <p className="text-center text-lg md:text-xl">
              Your guardian would receive reports on tests and exams you take
            </p>
            <br />
            <div className="flex justify-center items-center gap-5">
              <div
                id="inputBox"
                className="w-3-quarts flex items-center bg-inputGrey gap-5 p-5 rounded-sm border border-primary"
              >
                <label htmlFor="guardianEmail">
                  <MailIcon />
                </label>
                <input
                  type="email"
                  name="guardian_email"
                  id="guardianEmail"
                  placeholder="Guardian email"
                  className="w-full border-none outline-none bg-transparent font-xs text-16 text-dark h-14"
                  value={userData.guardian_email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="w-full flex justify-between items-center">
              <a
                id="backStep"
                className="text-dark text-sm md:text-base cursor-pointer"
                onClick={handleBackStep}
              >
                &lt; Back
              </a>
              <button
                id="finalStep"
                className="w-half p-10 bg-primary text-white text-hover-color text-sm md:text-base rounded-sm border-none transition-all"
                style={{ "--textColor": "green" } as React.CSSProperties}
                type="button"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div
      className="w-3-quarts sm-md-width"
      style={{ "--rWidthValue": "100%" } as React.CSSProperties}
    >
      {renderStep()}
      <Toaster/>
    </div>
  );
};

export default StudentStep;
