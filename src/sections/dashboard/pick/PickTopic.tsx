import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { topics } from "./TopicData";
import Loading from "../../../components/modals/Loading";
import Logo2 from "../../../assets/images/logo2.png";
import toast, { Toaster } from "react-hot-toast";

const PickTopic: React.FC = () => {
  const { type = "", subjectId = "" } = useParams<{
    type: string;
    subjectId: string;
  }>();
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);

  setTimeout(() => {
    const loadingMode = document.getElementById("loadingMode");
    loadingMode?.classList.remove("flex");
    loadingMode?.classList.add("hidden");
  }, 3000);

  const handleCheckboxChange = (index: number) => {
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(index)
        ? prevSelectedTopics.filter((id) => id !== index)
        : [...prevSelectedTopics, index],
    );
  };

  const handleContinueClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic!");
      return;
    }

    if (selectedTopics.length >= 5) {
      toast.error("Not more than 5 topics!");
      return;
    }

    // Add your loading state or open modal logic here.
    // Replace with your actual loading state management
    const modal = document.getElementById("modal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }

    try {
      const formData = new FormData();
      formData.append("subject", subjectId);
      formData.append("view", type);
      selectedTopics.forEach((topic, index) => {
        formData.append(`topic-${index}`, topic.toString());
      });

      const response = await axios.post("/test/create/questions", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { test_id: testId, subject_id: newSubjectId, view } = response.data;

      setTimeout(() => {
        navigate(`/assessment/${newSubjectId}/ready/${view}/for/${testId}`);
      }, 2500);
    } catch (error) {
      console.error("Error sending form data:", error);
      toast.error("An error occured!");
    }
  };

  return (
    <div className="w-full h-auto flex flex-col main-wrapper picker-wrap bg-brand-white">
      <div className="w-full h-5 bg-secondary"></div>
      <form
        onSubmit={handleContinueClick}
        className="flex flex-col pick-container"
        id="topic-form"
      >
        <div className="flex justify-between gap-10 p-20 pick-top-section">
          <a href={`/pick/subject/${type}`} className="btn btn-primary sm-btn">
            <span>&larr; Back</span>
          </a>
          <button
            type="submit"
            id="open-load"
            className="btn btn-primary sm-btn"
          >
            Continue <span>&rarr;</span>
          </button>
        </div>
        <div className="flex flex-col items-center gap-5 pick-top-heading">
          <div className="w-6 h-6">
            <img src={Logo2} alt="img" className="w-full h-full" />
          </div>
          <div className="text-center pick-top-body">
            <h3>Select up to 5 topics you want to write on</h3>
          </div>
        </div>
        <div className="inline-flex flex-col w-full h-auto">
          <input type="hidden" name="subject" value={subjectId} />
          <input type="hidden" name="view" value={type} />
          <div className="flex justify-evenly flex-wrap gap-10 m-10 sm-topics-gap">
            {topics.map((topic, ii) => (
              <div
                key={ii}
                className={`w-auto h-4 flex items-center p-10 gap-2 bg-primary-10 rounded-sm transition-all topic-box ${selectedTopics.includes(ii) ? "checked" : ""
                  }`}
              >
                <input
                  type="checkbox"
                  className="cursor-pointer topic-checkbox"
                  name={`topic-${ii}`}
                  id={`form-label-${ii}`}
                  aria-describedby="topic"
                  value={ii}
                  checked={selectedTopics.includes(ii)}
                  onChange={() => handleCheckboxChange(ii)}
                />
                <label htmlFor={`form-label-${ii}`} className="cursor-pointer">
                  {topic}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
      <Loading />
      <Toaster />
    </div>
  );
};

export default PickTopic;
