import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LogoCC42 from "../../assets/images/KIDEMIA LOGO CC 4 -2.png";
import { AuthContext } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const ReadyScreen: React.FC = () => {
  const { subjectId, asId, type } = useParams<{
    asId: string;
    type: string;
    subjectId: string;
  }>();
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  setTimeout(() => {
    const loadingMode = document.getElementById("loadingMode");
    loadingMode?.classList.remove("flex");
    loadingMode?.classList.add("hidden");
  }, 3000);

  useEffect(() => {
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

  return (
    <div
      className="relative h-max-screen sm-h-val bg-secondary"
      style={{ "--smallHeightValue": "auto" } as React.CSSProperties}
    >
      <div className="flex justify-end gap-10 h-max-screen">
        <div
          className="h-90p h-md-sm flex sm-d-none flex-col justify-end items-center p-20"
          style={{ "--rH": "50px" } as React.CSSProperties}
        >
          <div className="w-full h-half flex items-right">
            <a
              href={`/pick/${subjectId}/topic/${type}`}
              className="w-10 h-3 bg-primary p-5 text-white text-14 font-lg"
            >
              <span>&larr; Back</span>
            </a>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 text-center text-white">
            <img src={LogoCC42} alt="logo alt" className="w-30 h-30" />
            <div>
              <span>“What we learn with pleasure, we never forget.”</span>
              <h3 className="mt-5">Alfred Mercier</h3>
            </div>
          </div>
        </div>
        <div
          className="w-70p sm-w-value h-full flex flex-col justify-end"
          style={{ "--rWidthValue": "100%" } as React.CSSProperties}
        >
          <div
            className="w-full h-95p sm-h-val flex flex-col justify-around gap-10 bg-brand-white top-left-radius-lg p-20"
            style={{ "--smallHeightValue": "100%" } as React.CSSProperties}
          >
            <a
              href={`/pick/${subjectId}/topic/${type}`}
              className="w-10 h-5 bg-primary p-5 text-white text-14 font-lg md-d-none"
            >
              <span>&larr; Back</span>
            </a>
            <div className="w-80p flex flex-col gap-10">
              <h3 className="text-dark ready-subject-title">
                You are writing <span id="subjects">Social Studies</span>
              </h3>
              <div className="flex flex-col gap-10" id="subjectInstruction">
                <p>
                  The test has 20 questions to be answered in 20 minutes, it
                  will cover the following topics:
                </p>
                <ul className="flex flex-col items-start pl-5">
                  <li className="list-numeric font-sm">Family</li>
                  <li className="list-numeric font-sm">Racism</li>
                </ul>
              </div>
            </div>
            <div className="ready-instructions">
              <h1
                className="mb-5 text-dark sm-text-value"
                style={{ "--textSmVal": "18px" } as React.CSSProperties}
              >
                Read All Instructions Before You Start
              </h1>
              <div className="flex flex-col gap-10" id="subjectInstruction">
                <ul className="flex flex-col items-start pl-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i} className="list-numeric font-sm">
                      Do not leave this screen else the test would end
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end items-end">
              <div
                className="flex flex-col justify-center items-center gap-5"
                id="readyInfoBtn"
              >
                <p>If you are ready click on the button to begin</p>
                <a
                  href={`/test/ongoing/${asId}`}
                  className="w-30 h-5 justify-center bg-primary p-5 text-white text-14 font-lg"
                >
                  Start
                </a>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default ReadyScreen;
