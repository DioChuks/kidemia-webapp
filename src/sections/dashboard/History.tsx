import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BellIcon from "../../components/icons/BellIcon";
import MenuIcon from "../../components/icons/MenuIcon";
import logo from "../../assets/images/KIDEMIA LOGO pro 2.png";
import userIcon from "../../assets/images/Ellipse 1.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { attemptLogout } from "../../lib/api-logout";
import toast, { Toaster } from "react-hot-toast";
import { handleRequestError } from "../../lib/api-error-handler";
import { ArrowDownIcon, ArrowLeftCircleIcon } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CalendarImg from "../../assets/images/calendar.png"
import ClockImg from "../../assets/images/image 3.png"
import MeterImg from "../../assets/images/meter.png"

const StudentHistory: React.FC = () => {
    const { type } = useParams();
    const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isLogout, setIsLogout] = useState(false);

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

//   if type is empty, display message
  if (type !== "test" && type !== "exam") {
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
            </ul>
          </nav>
        </header>
        <div className="lg:ml-3 cursor-pointer" onClick={() => navigate("/performance")}>
            <ArrowLeftCircleIcon className="text-blue-950 w-4 h-4"/>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold mb-4">No history found</h1>
        </div>
        </div>
    )
  }

  return (
    <div className="bg-white h-max-screen">
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
      <div className="lg:ml-3 cursor-pointer flex gap-2 items-center" onClick={() => navigate("/performance")}>
        <ArrowLeftCircleIcon className="text-blue-950 w-4 h-4"/> <h1 className="font-bold text-xl lg:text-3xl">Your {type} history</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
            <TestHistory />
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default StudentHistory;

export const TestHistory: React.FC = () => {
    return (
    <div className="w-full p-4 flex items-center justify-center">
      <Card className="w-full bg-gray-200 p-6 rounded-xl max-h-[535px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Test Info */}
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 flex items-center gap-3">
              <img src={CalendarImg} className="w-5 h-5 text-gray-500" />
              <div>
                Date: 24-10-2023
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 flex items-center gap-3">
              <img src={ClockImg} className="w-5 h-5 text-gray-500" />
              <div>Time Used: 20 mins</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 flex items-center gap-3">
              <img src={MeterImg} className="w-5 h-5 text-gray-500" />
              <div>Average time per second: 1min per question</div>
            </div>
          </div>

          {/* Center Column - Performance */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray={`${45}, 100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
                45%
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                50% <ArrowDownIcon className="w-4 h-4 text-red-500" /> 45%
              </div>
              <h2 className="text-xl font-bold">Social Studies</h2>
            </div>

            <div className="space-y-2">
              <div className="font-semibold">Remark</div>
              <div className="text-red-500">Poor</div>
              <div className="font-semibold">Comment</div>
              <div className="text-gray-600">You can always do better</div>
            </div>
          </div>

          {/* Right Column - Topics */}
          <div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-4">16 Topics touched on</h3>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span>Family</span>
                    <span className="text-green-600">4/10</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 h-[43px]">
                  Take a Test
                </Button>
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 h-[43px]">
                  View Corrections
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
    )
}
