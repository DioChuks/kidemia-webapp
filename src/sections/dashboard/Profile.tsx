import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BellIcon from "../../components/icons/BellIcon";
import CloudUploadIcon from "../../components/icons/CloudUploadIcon";
import MenuIcon from "../../components/icons/MenuIcon";
import logo from "../../assets/images/KIDEMIA LOGO pro 2.png";
import userIcon from "../../assets/images/Ellipse 1.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { attemptLogout } from "../../lib/api-logout";
import toast, { Toaster } from "react-hot-toast";
import { handleRequestError } from "../../lib/api-error-handler";

const Profile: React.FC = () => {
  const { userData, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [category, setCategory] = useState("Common Entrance");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const toggleLogoutModal = () => {
    console.log(isLogout);
    setIsLogout(!isLogout);
  }

  const handleLogout = async () => {
    const toastId = toast.loading('signing out...');
    try {
      setIsLogout(false);
      const response = await attemptLogout();
      toast.success(response.message, { id: toastId });
      logout();
    } catch (error) {
      handleRequestError(error, toastId);
    }
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCategorySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle category change submission
    console.log("New category:", category);
    handleModalClose();
  };

  return (
    <div className="bg-brand-white h-max-screen">
      <header className="h-10p flex justify-between items-center bg-secondary mb-4 header">
        <div className="logo">
          <Link to="/dashboard" className="w-inherit h-inherit">
            <img src={logo} alt="Kidemia" className="w-inherit h-inherit" />
          </Link>
        </div>
        <nav className="flex items-center nav sm-d-none relative">
          <ul className="flex items-center">
            <li className="nav-item">
              <a href="#">Scheme</a>
            </li>
            <li className="nav-item">
              <a href="#">
                <BellIcon />
              </a>
            </li>
            <ul>
              <li className="nav-item" onClick={toggleLogoutModal}>
                <a href="#">
                  <img src={userIcon} alt="User-icon" />
                </a>
              </li>
            </ul>
          </ul>
          {isLogout && (<ul
            className="absolute top-3 right-2 w-10 h-4 border flex flex-col justify-around items-center bg-brand-white rounded-sm">
            <li className="text-red nav-item font-lg cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>)}
        </nav>
        <nav className="relative hidden md-d-none z-10" id="mobile-menu">
          <ul className="absolute top-2 right-2 left-2 w-20 h-30 border flex flex-col justify-around items-center bg-brand-white rounded-sm">
            <li className="nav-item">
              <a href="#">Scheme</a>
            </li>
            <a href="#" className="flex items-center gap-1 text-dark">
              <BellIcon /> Notifications
            </a>
            <li className="nav-item">
              <a href="#" className="w-5 h-4 flex items-center gap-1">
                <img src={userIcon} alt="User-icon" className="w-2 h-2" />{" "}
                Account
              </a>
            </li>
          </ul>
        </nav>
        <MenuIcon />
      </header>
      <div className="flex items-center justify-center">
        <div className="w-80 h-full inline-flex flex-col items-center justify-center pr-5 pl-5 pt-5 pb-5 rounded-lg bg-white overflow-hidden Frame2608385">
          <div className="w-full inline-flex flex-col justify-start items-center gap-10 self-stretch Frame2608394">
            <figure className="flex flex-col justify-center items-center gap-5 Frame2608387">
              <input
                type="file"
                name="profile_picture"
                id="profilePicture"
                className="hidden"
              />
              <label htmlFor="profilePicture">
                <img
                  className="w-10 h-10 rounded-full border-3 border-primary Ellipse1"
                  src={userData.user.photo ?? userIcon}
                  alt="User Profile Picture"
                />
              </label>
              <figcaption className="inline-flex justify-start items-start gap-10 Frame2608386">
                <CloudUploadIcon />
                <span className="text-dark text-14 font-md font-gothic TapToUploadYourPicture">
                  <span
                    style={{ lineHeight: "19.60px", wordWrap: "break-word" }}
                  >
                    Tap to{" "}
                  </span>
                  <span
                    className="text-primary font-md text-16 font-gothic"
                    style={{ lineHeight: "22.40px", wordWrap: "break-word" }}
                  >
                    upload
                  </span>
                  <span
                    className="text-dark text-14 font-md font-gothic"
                    style={{ lineHeight: "19.60px", wordWrap: "break-word" }}
                  >
                    {" "}
                    your picture
                  </span>
                </span>
              </figcaption>
            </figure>
            <div className="w-full flex flex-col justify-center items-start Frame2608390">
              <div className="w-full flex flex-col justify-start items-start gap-2 pl-2 pr-2 pt-2 pb-2 Frame165">
                <div
                  className="inline-flex justify-start items-start gap-5 Frame166"
                  style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    opacity: "0.70",
                  }}
                >
                  <div
                    className="text-16 text-gray font-gothic font-xl YourName"
                    style={{ lineHeight: "25.20px", wordWrap: "break-word" }}
                  >
                    Your Name
                  </div>
                </div>
                <div className="w-full inline-flex justify-start items-start gap-2 Frame2608389">
                  <div
                    className="w-3-quarts flex justify-start items-center gap-5 rounded-sm pt-2 pb-2 pl-3 pr-3 overflow-hidden border-bottom border-primary Frame164"
                    style={{ width: "600px", height: "43px" }}
                  >
                    <input
                      className="w-full text-gray text-16 font-gothic font-xs Student border-none outline-none"
                      style={{ lineHeight: "22.40px", wordWrap: "break-word" }}
                      value={userData.user.name}
                      placeholder="Liam Gabriel"
                    />
                  </div>
                  <button className="w-quarter flex justify-center items-center p-10 bg-primary rounded-xs border-none cursor-pointer Frame3">
                    <span
                      className="text-white text-16 font-gothic font-md Update"
                      style={{ lineHeight: "19.80px", wordWrap: "break-word" }}
                    >
                      Update
                    </span>
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2 pl-2 pr-2 pt-2 pb-2 Frame2608388">
                <div
                  className="inline-flex justify-start items-start gap-5 Frame166"
                  style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    opacity: "0.70",
                  }}
                >
                  <div
                    className="text-16 text-gray font-gothic font-xl YourEmail"
                    style={{ lineHeight: "19.80px", wordWrap: "break-word" }}
                  >
                    Your email
                  </div>
                </div>
                <div className="w-full inline-flex justify-start items-start gap-2 Frame2608389">
                  <div
                    className="w-3-quarts flex justify-start items-center gap-5 rounded-sm pt-2 pb-2 pl-3 pr-3 overflow-hidden border-bottom border-primary Frame164"
                    style={{ width: "600px", height: "43px" }}
                  >
                    <input
                      className="w-full text-gray text-16 font-gothic font-xs Student border-none outline-none"
                      style={{ lineHeight: "22.40px", wordWrap: "break-word" }}
                      value={userData.user.email}
                      placeholder="echempraise@gmail.com"
                    />
                  </div>
                  <button className="w-quarter flex justify-center items-center p-10 bg-primary rounded-xs border-none cursor-pointer Frame3">
                    <span
                      className="text-white text-16 font-gothic font-md Update"
                      style={{ lineHeight: "19.80px", wordWrap: "break-word" }}
                    >
                      Update
                    </span>
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2 pl-2 pr-2 pt-2 pb-2 Frame2608388">
                <div
                  className="inline-flex justify-start items-start gap-5 Frame166"
                  style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    opacity: "0.70",
                  }}
                >
                  <div
                    className="text-16 text-gray font-gothic font-xl YourCategory"
                    style={{ lineHeight: "25.20px", wordWrap: "break-word" }}
                  >
                    Your category
                  </div>
                </div>
                <div className="w-full inline-flex justify-start items-start gap-2 Frame2608389">
                  <div
                    className="w-3-quarts flex justify-start items-center gap-5 rounded-sm pt-2 pb-2 pl-3 pr-3 overflow-hidden border-bottom border-primary Frame164"
                    style={{ width: "600px", height: "43px" }}
                  >
                    <input
                      className="w-full text-gray text-16 font-gothic font-xs Student border-none outline-none"
                      style={{ lineHeight: "22.40px", wordWrap: "break-word" }}
                      value=""
                      placeholder="Common Entrance"
                    />
                    <button
                      className="w-auto h-full flex justify-center items-center bg-transparent border-none cursor-pointer Frame3"
                      id="openBtn"
                      onClick={handleModalOpen}
                    >
                      <span
                        className="text-red text-16 font-gothic font-md Change"
                        style={{
                          lineHeight: "19.80px",
                          wordWrap: "break-word",
                        }}
                      >
                        change
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2 pl-2 pr-2 pt-2 pb-2 Frame2608388">
                <div
                  className="inline-flex justify-start items-start gap-5 Frame166"
                  style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    opacity: "0.70",
                  }}
                >
                  <div
                    className="text-16 text-gray font-gothic font-xl GuardianEmail"
                    style={{ lineHeight: "25.20px", wordWrap: "break-word" }}
                  >
                    Guardian Email
                  </div>
                </div>
                <div className="w-full inline-flex justify-start items-start gap-2 Frame2608389">
                  <div
                    className="w-3-quarts flex justify-start items-center gap-5 rounded-sm pt-2 pb-2 pl-3 pr-3 overflow-hidden border-bottom border-primary Frame164"
                    style={{ width: "600px", height: "43px" }}
                  >
                    <input
                      className="w-full text-gray text-16 font-gothic font-xs Student border-none outline-none"
                      style={{ lineHeight: "22.40px", wordWrap: "break-word" }}
                      value=""
                      placeholder="diochuks65@gmail.com"
                    />
                  </div>
                  <button className="w-quarter flex justify-center items-center p-10 bg-primary rounded-xs border-none cursor-pointer Frame3">
                    <span
                      className="text-white text-16 font-gothic font-md Update"
                      style={{ lineHeight: "19.20px", wordWrap: "break-word" }}
                    >
                      Update
                    </span>
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2 pl-2 pr-2 pt-2 pb-2 Frame2608388">
                <div
                  className="inline-flex justify-start items-start gap-5 Frame166"
                  style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    opacity: "0.70",
                  }}
                >
                  <div
                    className="text-16 text-gray font-gothic font-xl School"
                    style={{ lineHeight: "25.20px", wordWrap: "break-word" }}
                  >
                    School
                  </div>
                </div>
                <div className="w-full inline-flex justify-start items-start gap-2 Frame2608389">
                  <div
                    className="w-3-quarts flex justify-start items-center gap-5 rounded-sm pt-2 pb-2 pl-3 pr-3 overflow-hidden border-bottom border-primary Frame164"
                    style={{ width: "600px", height: "43px" }}
                  >
                    <input
                      className="w-full text-gray text-16 font-gothic font-xs Student border-none outline-none"
                      style={{ lineHeight: "22.40px", wordWrap: "break-word" }}
                      value=""
                      placeholder="null"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full inline-flex justify-start items-start pl-2 pr-2 pt-2 pb-2">
                <button
                  className="text-16 font-lg border-none bg-transparent cursor-pointer text-hover-color"
                  style={{ "--textColor": "orangered" } as React.CSSProperties}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed flex z-1 left-0 top-0 w-full h-full justify-center items-center overflow-auto bg-semi-black transition-all PendingApprovalModal"
          id="customModal"
        >
          <span className="close" id="closeModal" onClick={handleModalClose}>
            &times;
          </span>
          <form
            className="w-80p h-half flex flex-col items-center justify-evenly gap-5 bg-white p-10 rounded-md modal-content"
            onSubmit={handleCategorySubmit}
          >
            <h3
              className="text-16 font-md WhatCategoryDoYouWantToChangeTo"
              style={{ lineHeight: "22.40px", wordWrap: "break-word" }}
            >
              What category do you want to change to
            </h3>
            <div className="flex justify-start items-start gap-10 Frame2608373">
              <div className="flex items-center gap-5">
                <input
                  type="radio"
                  name="category"
                  id="category1"
                  value="Common Entrance"
                  checked={category === "Common Entrance"}
                  onChange={handleCategoryChange}
                />
                <label htmlFor="category1" className="cursor-pointer">
                  Common Entrance
                </label>
              </div>
              <div className="flex items-center gap-5">
                <input
                  type="radio"
                  name="category"
                  id="category2"
                  value="Junior WAEC"
                  checked={category === "Junior WAEC"}
                  onChange={handleCategoryChange}
                />
                <label htmlFor="category2" className="cursor-pointer">
                  Junior WAEC
                </label>
              </div>
              <div className="flex items-center gap-5">
                <input
                  type="radio"
                  name="category"
                  id="category3"
                  value="Senior WAEC"
                  checked={category === "Senior WAEC"}
                  onChange={handleCategoryChange}
                />
                <label htmlFor="category3" className="cursor-pointer">
                  Senior WAEC
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-5">
              <p className="text-16 font-md">
                Your guardian would need to approve your change, then you will
                be notified of their choice
              </p>
              <button
                className="w-half p-10 border-none outline-none rounded-sm bg-primary text-white cursor-pointer"
                type="submit"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      )}
      <Toaster/>
    </div>
  );
};

export default Profile;
