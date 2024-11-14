import React, { useEffect, useState } from "react";
import axios from "axios";

type Question = {
  question: string;
  answers: string[];
};

interface AssessmentProps {
  test: string;
  questions: Question[];
}

const OngoingAssessment: React.FC<AssessmentProps> = ({ test, questions }) => {
  const [minutes, setMinutes] = useState(19);
  const [seconds, setSeconds] = useState(59);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>(
    Array(questions.length).fill(null)
  );

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
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = index;
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
    const formData = new FormData();
    formData.append("id", test);
    formData.append("minutes_left", minutes.toString());
    formData.append("seconds_left", seconds.toString());

    selectedAnswers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        formData.append(`question_${questionIndex}`, answerIndex.toString());
      }
    });

    try {
      const response = await axios.post("/assessment.submit", formData, {
        headers: {
          "X-CSRF-TOKEN": (document.querySelector(
            'meta[name="csrf-token"]'
          ) as HTMLMetaElement).content,
        },
      });
      if (response.data) {
        window.location.href = `/test/result/${response.data.a_id}`;
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
        <input type="hidden" name="id" value={test} id="assessmentId" />
        <div className="w-full flex justify-between items-center ongoing-test-head">
          <div className="w-auto h-5">
            <img src="/images/logo3.png" alt="alt-img" className="w-inherit h-inherit" />
          </div>
          <div className="flex justify-between items-center mx-2 timer-box">
            <h4>
              Time Left:{" "}
              <span id="timer">
                {minutes}min:{seconds < 10 ? `0${seconds}` : seconds}sec
              </span>
            </h4>
            <input type="number" name="minutes_left" value={minutes} hidden />
            <input type="number" name="seconds_left" value={seconds} hidden />
            <button
              type="submit"
              className="bg-primary text-white font-xl outline-none submit-btn"
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
                {questions[currentQuestionIndex].question}
              </h3>
              <div className="h-15 p-4 flex flex-col justify-evenly items-start">
                <ul id="answerList" className="flex flex-col gap-5">
                  {questions[currentQuestionIndex].answers.map((answer, index) => (
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
                        checked={selectedAnswers[currentQuestionIndex] === index}
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
              className="flex items-center p-10 rounded-sm bg-light-wine text-wine border border-white cursor-pointer sm-md-pad"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              type="button"
              className="flex items-center p-10 rounded-sm bg-light-green text-green border border-white cursor-pointer sm-md-pad"
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
                   className="p-10 border border-primary rounded-xs cursor-pointer transition-all input-label sm-md-pad"
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

export default OngoingAssessment;
