import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import LogoCC42 from "../../assets/images/KIDEMIA LOGO CC 4 -2.png";
import { AuthContext } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import TestAssessment from "../../components/assessments/Test";
import Ready from "../../components/assessments/Ready";
import Loading from "../../components/modals/Loading";
import { fetchBatchQuestions } from "@/lib/user/api-questions";
import { fetchAssessment } from "@/lib/user/api-assessment";
import { Question } from "@/lib/@types/questions";

const AssessmentScreen: React.FC = () => {
  const { subjectId, asId, type } = useParams<{
    asId: string;
    type: string;
    subjectId: string;
  }>();
  const { state } = useLocation();
  
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<string>("ready");
  const [questions, setQuestions] = useState<Question[]>([]);

  // check if there is no state then use the useEffect
  // use effect to load the questions
  useEffect(() => {
    if (state) {
      const fetchQuestions = async () => {
        try {
          const response = await fetchBatchQuestions(state.question_ids);
          console.log(response);
          setQuestions(response);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };
      fetchQuestions();
    } else {
      const fetchAssessments = async () => {
        try {
          if (asId && type) {
            const response = await fetchAssessment(asId, type);
            console.log(response);
            const responseTwo = await fetchBatchQuestions(response.question_ids);
            console.log(responseTwo);
            setQuestions(responseTwo);
          }
        } catch (error) {
          console.error("Error fetching assessment:", error); 
        }
      }
      fetchAssessments();
    }
  }, [state, asId, type]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    const handleBlur = async () => {
      const authToken = userData?.token;
      try {
        console.log(asId);
        // if (asId) {
        //   await axios.post(
        //     "/terminate-test-exam",
        //     { assessment_id: asId },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${authToken}`,
        //         "Content-Type": "application/json",
        //       },
        //     },
        //   );
        //   console.log("Test exam terminated successfully!");
        //   alert("terminated");
        //   navigate("/account/user/profile");
        // } else {
        //   console.warn("Test ID not defined. Cannot send termination request.");
        // }
      } catch (error) {
        console.error("Error sending termination request:", error);
        toast.error("An error occured!");
      }
    };

    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [asId, navigate]);

  const handleMode = () => {
    setMode("started");
  }

  const renderAssessment = () => {
    switch (mode) {
      case "started":
        return <TestAssessment assId={asId ?? ""} questions={questions}/>
        break;
    
      default:
        return <Ready type={type ?? "break"} subjectId={subjectId ?? ""} onStart={handleMode} />
        break;
    }
  }

  return (
    <div>
      {renderAssessment()}
      {isLoading && <Loading/>}
      <Toaster/>
    </div>
  );
};

export default AssessmentScreen;
