import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { subjectData } from "./SubjectData";
import SubjectCard from "../../../components/cards/SubjectCard";
import LeftArrowIcon from "../../../components/utils/LeftArrowIcon";
import RightArrowIcon from "../../../components/utils/RightArrowIcon";
import Logo2 from "../../../assets/images/logo2.png";
import LogoPro from "../../../assets/images/logo-pro.png";
import ClockImg from "../../../assets/images/image 3.png";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { fetchSubjectsByCategory } from "../../../lib/admin/api-subjects";
import { AuthContext } from "../../../contexts/AuthContext";
import { Subject } from "../../../lib/@types/subjects";

const PickSubject: React.FC = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  useEffect(() => {
    if (type !== "test" && type !== "exam") {
      navigate("/dashboard");
    }

    const toastId = toast.loading('fetching subjects...');
    console.log("category id: ", userData.user.category_id)

    fetchSubjectsByCategory(userData.user.category_id)
      .then((data) => {
        toast.remove(toastId);
        toast.success(`${data.length} available!`);
        setSubjects(data);
        console.log(data)
      })
      .catch((error) => {
        toast.error("Failed to load subjects", {id: toastId});
        console.error("Error fetching subjects:", error);
      });
  }, [type, navigate]);

  const handleSubjectChange = (id: string) => {
    setSelectedSubjectId(id);
  };

  const handleContinueClick = () => {
    if (!selectedSubjectId) {
      toast.error("Pick a subject!");
      return;
    }
    navigate(`/pick/${selectedSubjectId}/topic/${type}`);
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
              <h3 className="text-dark md:text-xl text-lg">
                Pick a subject you would love to write a test on
              </h3>
              <div className="flex justify-center items-center gap-5 h-4">
                <img src={ClockImg} alt="clock" className="w-3 h-3" />
                <p>Time limit: 20mins</p>
                <small className="text-green" id="subject-choice">
                  {selectedSubjectId
                    ? `You have picked ${subjects.find((subject) => subject.uuid === selectedSubjectId)?.name}`
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
              <h3 className="text-dark md:text-xl text-lg">
                Write an exam on one subject or more
              </h3>
              <div className="flex justify-center items-center gap-5 h-4">
                <span>20 questions per Subject</span>
                <img src={ClockImg} alt="clock" className="w-3 h-3" />
                <p>Time limit: 1hr 20mins</p>
                <small className="text-green" id="subject-choice">
                  {selectedSubjectId
                    ? `You have picked ${subjects.find((subject) => subject.uuid === selectedSubjectId)?.name}`
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

        <div className="w-full flex justify-center items-center pick-subjects mb-4">
          <div className="w-2/3 mx-auto flex flex-wrap gap-8 h-full p-4">
            {subjects.map((subject, index) => {
              if (index > subject.topics.length) { index = 0 }
              return (
                <SubjectCard
                  key={subject.id}
                  id={subject.id}
                  uuid={subject.uuid}
                  logo={subjectData[index].logo}
                  title={subject.name}
                  topicAmount={subject.topics.length}
                  isSelected={selectedSubjectId === subject.uuid}
                  onSelect={handleSubjectChange}
                />
              )
            })}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PickSubject;
