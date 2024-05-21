import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { subjectData } from "./SubjectData";
import SubjectCard from "../../../components/cards/SubjectCard";
import LeftArrowIcon from "../../../components/utils/LeftArrowIcon";
import RightArrowIcon from "../../../components/utils/RightArrowIcon";
import Logo2 from "../../../assets/images/logo2.png";
import LogoPro from "../../../assets/images/logo-pro.png";
import ClockImg from "../../../assets/images/image 3.png";
import { Link } from "react-router-dom";

const PickSubject: React.FC = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (type !== "test" && type !== "exam") {
      navigate("/dashboard");
    }
  }, [type, navigate]);

  const handleSubjectChange = (id: number) => {
    setSelectedSubjectId(id);
  };

  const handleContinueClick = () => {
    if (selectedSubjectId) {
      navigate(`/pick/${selectedSubjectId}/topic/${type}`);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col bg-brand-white">
      <div className="w-full bg-secondary h-5"></div>
      <div className="h-auto bg-brand-white">
        <div className="flex justify-between gap-5 pl-2 pr-2">
          {type === "test" ? (
            <Link to="/dashboard" className="btn btn-primary sm-btn">
              <LeftArrowIcon /> Back
            </Link>
          ) : (
            <Link to="/take/exam" className="btn btn-primary sm-btn">
              <LeftArrowIcon /> Back
            </Link>
          )}
          <button
            className="btn btn-primary sm-btn"
            onClick={handleContinueClick}
          >
            Continue <RightArrowIcon />
          </button>
        </div>
        {type === "test" ? (
          <div className="flex flex-col items-center gap-5">
            <div className="w-6 h-6">
              <img src={Logo2} alt="logo" className="w-full h-full" />
            </div>
            <div
              className="text-center sm-md-width"
              style={{ "--rWidthValue": "300px" } as React.CSSProperties}
            >
              <h3 className="text-dark">
                Pick a subject you would love to write a test on
              </h3>
              <div className="flex justify-center items-center gap-5 h-4">
                <img src={ClockImg} alt="clock" className="w-3 h-3" />
                <p>Time limit: 20mins</p>
                <small className="text-green" id="subject-choice">
                  {selectedSubjectId
                    ? `You have picked ${subjectData.find((subject) => subject.id === selectedSubjectId)?.title}`
                    : ""}
                </small>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 mb-3">
            <div className="w-6 h-6">
              <img src={LogoPro} alt="img" className="w-full h-full" />
            </div>
            <div className="text-center">
              <h3 className="text-dark">
                Write an exam on one subject or more
              </h3>
              <div className="flex justify-center items-center gap-5 h-4">
                <span>20 questions per Subject</span>
                <img src={ClockImg} alt="clock" className="w-3 h-3" />
                <p>Time limit: 1hr 20mins</p>
                <small className="text-green" id="subject-choice">
                  {selectedSubjectId
                    ? `You have picked ${subjectData.find((subject) => subject.id === selectedSubjectId)?.title}`
                    : ""}
                </small>
              </div>
            </div>
            <Link
              className="w-3-quarts flex items-center justify-center p-20 bg-green text-white rounded-sm bg-hover transition-all"
              to={`/pick/topic/all/${type}`}
              style={
                {
                  "--w": "100%",
                  "--bgHoverColor": "teal",
                } as React.CSSProperties
              }
            >
              <h6 className="font-sm">Write on all subjects</h6>
            </Link>
          </div>
        )}
        <div className="w-full inline-flex justify-center items-center pick-subjects">
          <section className="h-auto">
            <div className="w-full h-full flex justify-center items-center p-10 gap-10">
              <div
                className="w-90p flex flex-wrap justify-evenly items-start gap-10"
                id="subject-box"
              >
                {subjectData.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    id={subject.id}
                    logo={subject.logo}
                    title={subject.title}
                    topicAmount={subject.topicAmount}
                    isSelected={selectedSubjectId === subject.id}
                    onSelect={handleSubjectChange}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PickSubject;
