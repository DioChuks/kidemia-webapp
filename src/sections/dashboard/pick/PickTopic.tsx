import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/modals/Loading";
import Logo2 from "../../../assets/images/logo2.png";
import toast, { Toaster } from "react-hot-toast";
import { fetchTopicsBySubjectId } from "../../../lib/user/api-topics";
import { Topic } from "../../../lib/@types/topics";
import { createTestOrExam } from "../../../lib/user/api-assessment";

const PickTopic: React.FC = () => {
  const { type = "", subjectId = "" } = useParams<{
    type: string;
    subjectId: string;
  }>();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

    if (selectedTopics.length > 5) {
      toast.error("Not more than 5 topics!");
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      // Prepare data for submission
      const formData = {
        subject: subjectId,
        view: type,
        topics: selectedTopics.map((topic) => topics[topic]?.id),
      };

      // Send the request
      const { a_id: testId, subject_id: newSubjectId, view } = await createTestOrExam(formData);

      // Navigate to the assessment page after a short delay
      setTimeout(() => {
        navigate(`/assessment/${newSubjectId}/ready/${view}/for/${testId}`);
      }, 2500);
    } catch (error) {
      console.error("Error sending form data:", error);
      toast.error("An error occurred!");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    if (type !== "test" && type !== "exam" && subjectId == null) {
      navigate("/dashboard");
    }
    setIsLoading(true);

    fetchTopicsBySubjectId(subjectId)
      .then((data) => {
        setTopics(data);
        setIsLoading(false); 
        console.log(data)
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Failed to load topics");
        console.error("Error fetching topics:", error);
    });
  }, [type, subjectId, navigate])

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
                  {topic.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
      {isLoading && <Loading />}
      <Toaster />
    </div>
  );
};

export default PickTopic;
