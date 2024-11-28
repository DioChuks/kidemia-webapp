import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import LogoCC42 from "../../assets/images/KIDEMIA LOGO CC 4 -2.png";
import { AuthContext } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import TestAssessment from "../../components/assessments/Test";
import Ready from "../../components/assessments/Ready";
import Loading from "../../components/modals/Loading";

const AssessmentScreen: React.FC = () => {
  const { subjectId, asId, type } = useParams<{
    asId: string;
    type: string;
    subjectId: string;
  }>();
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<string>("ready");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    const handleBlur = async () => {
      const authToken = userData.token;
      try {
        if (asId) {
          await axios.post(
            "/terminate-test-exam",
            { assessment_id: asId },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            },
          );
          console.log("Test exam terminated successfully!");
          alert("terminated");
          navigate("/account/user/profile");
        } else {
          console.warn("Test ID not defined. Cannot send termination request.");
        }
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
        return <TestAssessment/>
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
