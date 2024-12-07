import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BellIcon from "../../components/icons/BellIcon";
import MenuIcon from "../../components/icons/MenuIcon";
import logo from "../../assets/images/KIDEMIA LOGO pro 2.png";
import userIcon from "../../assets/images/Ellipse 1.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { attemptLogout } from "../../lib/api-logout";
import toast, { Toaster } from "react-hot-toast";
import { handleRequestError } from "../../lib/api-error-handler";
import { ArrowDownIcon, ArrowLeftCircleIcon, ArrowUpIcon } from 'lucide-react'
import StudentProfile from "./StudentProfile";

const Performance: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [isLogout, setIsLogout] = useState(false);

  const subjects = [
    {
      name: "Social Studies",
      overallPercentage: 45,
      topics: [
        { name: "Family", percentage: 70, trend: "up" },
        { name: "Civil Rights", percentage: 45, trend: "down" },
        { name: "Natural Disasters", percentage: 45, trend: "down" },
        { name: "History", percentage: 45, trend: "down" },
        { name: "Racism", percentage: 70, trend: "up" },
      ],
    },
    {
      name: "English Language",
      overallPercentage: 45,
      topics: [
        { name: "Family", percentage: 45, trend: "down" },
        { name: "Civil Rights", percentage: 45, trend: "down" },
        { name: "Natural Disasters", percentage: 70, trend: "up" },
        { name: "History", percentage: 45, trend: "down" },
        { name: "Racism", percentage: 70, trend: "up" },
      ],
    },
  ]

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
      <div className="lg:ml-3 cursor-pointer" onClick={() => window.history.back()}>
        <ArrowLeftCircleIcon className="text-blue-950 w-4 h-4"/>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between overflow-hidden">
            <StudentProfile/>
        <div className="bg-[#c3c3c3] p-6 min-h-screen rounded-tl-xl">
      <h1 className="text-2xl font-bold mb-4">Subject Performance</h1>
      <div className="space-y-6">
        {subjects.map((subject, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={subject.name === "Social Studies" ? "#F59E0B" : "#EF4444"}
                      strokeWidth="3"
                      strokeDasharray={`${subject.overallPercentage}, 100`}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                    {subject.overallPercentage}%
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{subject.name}</h2>
                  <p className="text-gray-600">
                    {subject.overallPercentage}% <span className="text-sm">50% Avg</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <button className="text-blue-600 hover:underline block">View History</button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Take a Test</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subject.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="flex items-center bg-gray-100 p-2 rounded">
                  <div className="w-6 h-6 bg-[#3F4F79] rounded flex items-center justify-center text-white text-xs mr-2">
                    {topicIndex + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{topic.name}</div>
                    <div className="text-sm text-gray-600 flex items-center">
                      50%
                      {topic.trend === "up" ? (
                        <ArrowUpIcon className="w-4 h-4 text-green-500 ml-1" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 text-red-500 ml-1" />
                      )}
                      {topic.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Performance;
