import React, { useEffect, useState } from "react";
import { Question } from "@/lib/@types/questions";
import Logo3 from "../../assets/images/logo3.png";
import { submitAssessment } from "@/lib/user/api-assessment";

interface AssessmentProps {
  assId: string;
  questions: Question[];
}

const TestAssessment: React.FC<AssessmentProps> = ({ assId, questions }) => {
  const [minutes, setMinutes] = useState(19);
  const [seconds, setSeconds] = useState(59);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ question_id: number; answer_index: number }[]>([]);

  // Update timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerChange = (index: number) => {
    setSelectedAnswers((prev) => {
      // Update the selected answer for the current question
      const updatedAnswers = [...prev];
      const existingAnswerIndex = updatedAnswers.findIndex(
        (answer) => answer.question_id === currentQuestionIndex
      );
  
      if (existingAnswerIndex !== -1) {
        // Update the existing answer for the current question
        updatedAnswers[existingAnswerIndex] = {
          question_id: currentQuestionIndex,
          answer_index: index,
        };
      } else {
        // Add a new answer for the current question
        updatedAnswers.push({
          question_id: currentQuestionIndex,
          answer_index: index,
        });
      }
  
      return updatedAnswers;
    });
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Construct the JSON object
    const payload = {
      uuid: assId,
      minutes_left: minutes,
      seconds_left: seconds,
      answers: selectedAnswers,
      type: "test",
    };

    try {
      const response = await submitAssessment(payload);

      if (response) {
        window.location.replace(`/test/result/${response.uuid}`);
      }
    } catch (error) {
      console.error("Error submitting assessment: ", error);
    }
  };

  return (
    <div className="w-full h-max-screen bg-brand-white">
      <form
        className="h-full flex flex-col justify-between gap-20 bg-brand-white"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="id" value={assId} id="assessmentId" />
        <div className="w-full flex justify-between items-center ongoing-test-head">
          <div className="lg:w-auto w-5 h-5">
            <img src={Logo3} alt="alt-img" className="w-inherit h-inherit" />
          </div>
          <div className="flex justify-between items-center mx-2 timer-box">
            <h4 className="font-light text-xs lg:text-sm lg:font-medium">
              Time Left:{" "}
              <span id="timer">
                {minutes}min:{seconds < 10 ? `0${seconds}` : seconds}sec
              </span>
            </h4>
            <input type="number" name="minutes_left" value={minutes} hidden />
            <input type="number" name="seconds_left" value={seconds} hidden />
            <button
              type="submit"
              className="bg-primary text-white text-sm lg:text-xl outline-none p-3 rounded-lg submit-btn"
              id="open-load"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="w-3-quarts mx-auto flex flex-col justify-center items-center">
          <div className="w-3-quarts flex flex-col justify-center gap-10">
            <h2 className="text-left">
              Question <span>{currentQuestionIndex + 1}</span>:
            </h2>
            <div className="h-20 inline-flex flex-col items-start question-row" id="questionBox">
              <h3 className="question font-sm" id="question">
                {questions[currentQuestionIndex].title}
              </h3>
              <div className="h-15 p-4 flex flex-col justify-evenly items-start">
                <ul id="answerList" className="flex flex-col gap-5">
                  {questions[currentQuestionIndex].options.map((answer, index) => (
                    <li
                      key={index}
                      className="flex justify-start items-center w-full gap-5"
                    >
                      <input
                        type="radio"
                        id={`answer-${index}`}
                        name={`answer_${currentQuestionIndex}`}
                        value={index}
                        className="form-radio"
                        onChange={() => handleAnswerChange(index)}
                        // Find the selected answer for the current question
                        checked={
                          selectedAnswers.find(
                            (answer) => answer.question_id === currentQuestionIndex && answer.answer_index === index
                          ) !== undefined
                        }
                      />
                      <label htmlFor={`answer-${index}`} className="cursor-pointer">
                        {String.fromCharCode(65 + index)}. {answer}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id="questionNumberBox" className="h-half flex flex-col justify-between gap-10">
          <div id="questionBtnBox" className="w-full flex justify-evenly items-center">
            <button
              type="button"
              className="flex items-center p-5 lg:p-10 rounded-sm bg-light-wine text-wine border border-white cursor-pointer"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              type="button"
              className="flex items-center p-5 lg:p-10 rounded-sm bg-light-green text-green border border-white cursor-pointer"
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
          <div id="questionNumbers" className="w-full flex justify-center">
            <div className="w-3-quarts h-15 p-4 flex flex-wrap justify-evenly items-start gap-20 sm-md-width sm-md-justify sm-md-gap">
              {questions.map((_, index) => (
                <div key={index} className="mx-3 qno">
                  <input
                    type="radio"
                    id={`questionRadio-${index + 1}`}
                    name="selectedQuestion"
                    value={index + 1}
                    className="hidden question-number-radio"
                    onChange={() => handleQuestionSelect(index)}
                  />
                  <label
                   htmlFor={`questionRadio-${index + 1}`}
                   className={`p-10 border border-primary rounded-xs cursor-pointer transition-all input-label ${
                     currentQuestionIndex === index ? "bg-primary text-white" : ""}`}
                 >
                   {index + 1}
                 </label>
               </div>
             ))}
           </div>
         </div>
       </div>
     </form>
     {/* <Loading /> */}
   </div>
 );
};

export default TestAssessment;
