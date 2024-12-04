import { CSSProperties, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LogoCC from "../../assets/images/KIDEMIA LOGO pro 2.png";
import Ellipse from "../../assets/images/Ellipse 1.svg";
import Img2 from "../../assets/images/image 2.png";
import Img1 from "../../assets/images/image 1.png";
import Img3 from "../../assets/images/image 3.png";
import Logo2 from "../../assets/images/logo2.png";
import LogoPro from "../../assets/images/logo-pro.png";
import MenuIcon from "../../components/icons/MenuIcon";
import BellIcon from "../../components/icons/BellIcon";
import TakeAssessmentModal from "../../components/modals/TakeAssessmentModal";
import { Link } from "react-router-dom";
import AssessmentHistory from "../../components/cards/AssessmentHistory";
import historyTopicData from "../../components/cards/HistoryData.ts";
import BarChart from "../../components/charts/BarChart.tsx";

export interface MyCustomCSS extends CSSProperties {
  "--textSmVal": number | string;
  "--progress": number;
}

function HomeDashboard() {
  const [testModal, setTestModal] = useState(false);
  const [examModal, setExamModal] = useState(false);

  const { userData } = useContext(AuthContext);
  console.log("This is the logged in user:");
  console.log(userData);

  const handleTestModal = () => {
    setTestModal(!testModal);
  };

  const handleExamModal = () => {
    setExamModal(!examModal);
  };

  const handleCloseModal = (type: "test" | "exam") => {
    if (type === "test") {
      setTestModal(false);
    } else {
      setExamModal(false);
    }
  };

  return (
    <div className="overflow-x-hidden" id="app">
      {testModal && (
        <TakeAssessmentModal
          modalId="testModalBox"
          img={Logo2}
          title="Test Yourself"
          subtitle="The test comprises of 20 questions to be answered in 20 mins"
          type="test"
          sizeClass="w-8 h-8"
          onClose={() => handleCloseModal("test")}
        />
      )}

      {examModal && (
        <TakeAssessmentModal
          modalId="examModalBox"
          img={LogoPro}
          title="Ready for an exam? 😃"
          subtitle="The exam comprises of 40 questions to be answered in 30 mins"
          type="exam"
          sizeClass="h-10"
          onClose={() => handleCloseModal("exam")}
        />
      )}

      <div className="w-max-screen h-max-screen top-section">
        <header className="h-10p flex justify-between items-center bg-dark header">
          <div className="logo">
            <img src={LogoCC} alt="Kidemia" className="w-inherit h-inherit" />
          </div>
          {/*medium to large screen*/}
          <nav className="flex items-center nav sm-d-none">
            <ul className="flex items-center">
              <li className="nav-item">
                <a href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a href="#">Scheme</a>
              </li>
              <li className="nav-item">
                <Link to="">Dashboard</Link>
              </li>
              <li className="nav-item">
                <a href="#">
                  <BellIcon />
                </a>
              </li>
              <ul>
                <li className="nav-item">
                  <Link to="/user-profile">
                    <img src={Ellipse} alt="User-icon" />
                  </Link>
                </li>
              </ul>
            </ul>
          </nav>
          {/*small screen*/}
          <nav className="relative hidden md-d-none z-10" id="mobile-menu">
            <ul className="absolute top-2 right-2 left-2 w-20 h-30 border flex flex-col justify-around items-center bg-brand-white rounded-sm">
              <li className="nav-item">
                <a href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a href="#">Scheme</a>
              </li>
              <li className="nav-item">
                <a href="#">Dashboard</a>
              </li>
              <a href="#" className="flex items-center gap-1 text-dark">
                <BellIcon /> Notifications
              </a>
              <li className="nav-item">
                <a
                  href="user-profile"
                  className="w-5 h-4 flex items-center gap-1"
                >
                  <img src={Ellipse} alt="User-icon" className="w-2 h-2" />{" "}
                  Account
                </a>
              </li>
            </ul>
          </nav>
          <MenuIcon />
        </header>
        <div className="h-90p flex justify-center items-center flex-col gap-10">
          <div className="flex flex-col text-center gap-10">
            <div className="top-heading">
              <h1
                className="whitespace-no overflow-hidden md:text-6xl text-2xl text-white animate-typing font-bold"
              >
                Welcome {userData.user.name}
              </h1>
              <p className="whitespace-no overflow-hidden text-xl text-white animate-typing">
                What would you like to do?
              </p>
            </div>
            <div className="w-full flex justify-center gap-10">
              <button
                className="btn btn-primary animate-scale-out sm-btn"
                id="testModalBtn"
                onClick={handleTestModal}
              >
                Take a test
              </button>
              <button
                className="btn btn-primary animate-scale-out sm-btn"
                id="examModalBtn"
                onClick={handleExamModal}
              >
                Take an exam
              </button>
            </div>
          </div>
        </div>
        <main className="h-auto flex flex-col justify-center items-center bg-brand-white my-8">
          <div className="w-full h-auto flex flex-col justify-around items-center p-20 gap-10 performance-report">
            <div className="report-heading">
              <h1 className="text-dark md:text-6xl text-2xl px-5 pr-5 py-12 border-b-2 border-[#2A3740]">Performance Report Summary</h1>
            </div>
            <div className="h-90p flex sm-flex-col justify-around items-center w-half text-center report-chart">
              <div className="flex flex-col items-center report-box">
                <div
                  className="flex rounded-full piechart-progress"
                  style={{ "--progress": 35 } as MyCustomCSS}
                >
                  <div className="whitespace">
                    <div className="progress-number">35%</div>
                  </div>
                </div>
                <div className="report-body">
                  <h4 className="md:text-2xl text-xl font-bold">Test Performance</h4>
                  <a href="#">view history</a>
                </div>
              </div>
              <div className="report-box">
                <div
                  className="flex rounded-full piechart-progress"
                  style={{ "--progress": 60 } as MyCustomCSS}
                >
                  <div className="whitespace">
                    <div className="progress-number">60%</div>
                  </div>
                </div>
                <div className="report-body">
                  <h4 className="md:text-2xl text-xl font-bold">Exam Performance</h4>
                  <a href="#">view history</a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-max-screen h-auto flex flex-wrap justify-around items-center text-dark bg-primary gap-10 p-20 content-center my-8">
            <div className="flex flex-col justify-evenly items-center analysis-box">
              <div className="flex flex-col justify-center items-center text-center analysis-info">
                <div className="analysis-img">
                  <img src={Img2} alt="img" />
                </div>
                <h4 className="analysis-title font-bold">No. of tests attempted</h4>
              </div>
              <span className="analysis-score">70</span>
            </div>
            <div className="flex flex-col justify-evenly items-center analysis-box">
              <div className="flex flex-col justify-center items-center text-center analysis-info">
                <div className="analysis-img">
                  <img src={Img1} alt="img" />
                </div>
                <h4 className="analysis-title font-bold">
                  Correct Test Questions Answered
                </h4>
              </div>
              <span className="analysis-score">
                <span className="answer-success">30</span>/70
              </span>
            </div>
            <div className="flex flex-col justify-evenly items-center analysis-box">
              <div className="flex flex-col justify-center items-center text-center analysis-info">
                <div className="analysis-img">
                  <img src={Img2} alt="img" />
                </div>
                <h4 className="analysis-title font-bold">No. of Exams Attempted</h4>
              </div>
              <span className="analysis-score">70</span>
            </div>
            <div className="flex flex-col justify-evenly items-center analysis-box">
              <div className="flex flex-col justify-center items-center text-center analysis-info">
                <div className="analysis-img">
                  <img src={Img1} alt="img" />
                </div>
                <h4 className="analysis-title font-bold">
                  Correct Exam Questions Answered
                </h4>
              </div>
              <span className="analysis-score">
                <span className="answer-success">30</span>/70
              </span>
            </div>
            <div className="flex flex-col justify-evenly items-center analysis-box">
              <div className="flex flex-col justify-center items-center text-center analysis-info">
                <div className="analysis-img">
                  <img src={Img3} alt="img" />
                </div>
                <h4 className="analysis-title font-bold">
                  Average time spent per question
                </h4>
              </div>
              <span className="analysis-score">
                <span className="answer-success">1.00</span> min per question
              </span>
            </div>
          </div>
        </main>
        <footer className="w-max-screen p-10 bg-brand-white my-8">
          <div className="flex sm-flex-col gap-5 chart-container">
            <div
              className="flex flex-col items-center w-half sm-w-value chart-box"
              style={{ "--rWidthValue": "100%" } as React.CSSProperties}
            >
              <div className="chart-heading">
                <h1 className="text-center text-dark chart-title text-xl md:text-3xl font-bold">
                  Recent Test Performance
                </h1>
              </div>
              <BarChart bars={[30, 15, 5, 60, 90]} titleId="recent-test" />
            </div>
            <div
              className="flex flex-col items-center w-half sm-w-value chart-box my-2"
              style={{ "--rWidthValue": "100%" } as React.CSSProperties}
            >
              <div className="chart-heading">
                <h1 className="text-center text-dark chart-title text-xl md:text-3xl font-bold">
                  Recent Exam Performance
                </h1>
              </div>
              <BarChart bars={[30, 45, 35, 55, 50]} titleId="recent-exam" />
            </div>
          </div>
          <div id="assessment-history" className="w-max-screen mb-5">
            <h2 className="text-dark mb-2 text-xl md:text-2xl font-bold">Assessment History</h2>
            <div className="w-full flex flex-col items-center gap-5">
              <div id="Frame1000001375" className="flex gap-5">
                <button
                  id="historySubject"
                  className="btn btn-primary opacity-d5 sm-btn"
                >
                  Subjects
                </button>
                <button id="historyTopic" className="btn btn-primary sm-btn">
                  Topics
                </button>
              </div>
              <AssessmentHistory historyData={historyTopicData} />
            </div>
          </div>

          <div className="dashboard-btn-box">
            <Link to={"/dashboard"} className="btn btn-primary sm-btn">
              Dashboard
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomeDashboard;
