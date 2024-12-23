import React, { useEffect, useState } from 'react';
import UnionIcon from '../../../components/icons/Union'
import AddIcon from '../../../components/icons/Add'
import LinkIcon from '../../../components/icons/Link'
import TrashIcon from '../../../components/icons/Trash'
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchTopicsBySubjectId } from '../../../lib/admin/api-topics';
import { storeQuestion } from '../../../lib/admin/api-questions';
import toast, { Toaster } from 'react-hot-toast';
import { handleRequestError } from '../../../lib/api-error-handler';
import UploadIcon from '../../../components/icons/Upload';
import { Link } from 'react-router-dom';

interface Option {
  id: number;
  text: string;
}

interface Topic {
  id: number;
  name: string;
  uuid: string;
  subject_id: number;
}

const NewQuestion: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>(); // Fetch the subjectId from route params
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [options, setOptions] = useState<Option[]>([{ id: 1, text: '' }]);
  const [questionData, setQuestionData] = useState({
    title: '',
    topic_id: 0,
    correct_answer: '',
    solution: null as string | File | null,
    is_answer_multi: 0
  });
  const [solutionModal, setSolutionModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchedTopics = async () => {
      try {
        if (subjectId) {
          const response = await fetchTopicsBySubjectId(Number(subjectId));
          setTopics(response);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }
    // Use subjectId to fetch topics
    fetchedTopics();
  }, [subjectId]);

  const handleAddOption = () => {
    // Only allow up to 5 options
    if (options.length < 5) {
      const newOption = { id: options.length + 1, text: '' };
      setOptions([...options, newOption]);
    }
  };

  const handleRemoveOption = (id: number) => {
    // Prevent removal of the first option
    if (id !== 1) {
      setOptions(options.filter((option) => option.id !== id));
    }
  };

  const handleOptionChange = (id: number, value: string) => {
    setOptions(options.map(opt => (opt.id === id ? { ...opt, text: value } : opt)));
  };

  const handleSolutionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'text' | 'link' | 'file'
  ) => {
    if (type === 'file' && e.target instanceof HTMLInputElement && e.target.files) {
      setQuestionData({ ...questionData, solution: e.target.files[0] });
    } else {
      setQuestionData({ ...questionData, solution: e.target.value });
    }
  };


  const handleResetQuestion = () => {
    setQuestionData({
      title: '',
      topic_id: questionData.topic_id,
      correct_answer: '',
      solution: null as string | File | null,
      is_answer_multi: 0
    });
    setOptions([{ id: 1, text: '' }]);
  }

  const handleSubmit = async () => {
    console.log(questionData)
    if (!questionData.title || !questionData.topic_id || options.length < 2) {
      toast.error("Please fill in all fields and add at least two options.");
      return;
    }

    const toastId = toast.loading('Saving question...');

    // Prepare form data to handle the solution as a file
    const formData = new FormData();
    formData.append('subject_id', String(subjectId));
    formData.append('topic_id', String(questionData.topic_id));
    formData.append('title', questionData.title);
    formData.append('correct_answer', questionData.correct_answer);
    formData.append('is_answer_multi', String(questionData.is_answer_multi));

    // Append options as an array of strings in FormData
    options.forEach((option, index) => formData.append(`options[${index}]`, option.text));

    // Append solution if present
    if (questionData.solution) {
      formData.append(
        'solution',
        typeof questionData.solution === 'string' ? questionData.solution : questionData.solution
      );
    }

    try {
      await storeQuestion(formData);
      toast.success("Question saved successfully!", { id: toastId });
      handleResetQuestion();
    } catch (error) {
      handleRequestError(error, toastId);
    }
  };

  return (
    <>
    <div className='flex justify-end'>
        <Link to="/admin/dashboard/upload-questions" className='flex gap-6 w-fit items-center p-10 bg-primary text-white rounded-sm'>
          <UploadIcon /> Upload Questions
        </Link>
      </div>
      <br />
    <div className="w-full flex flex-col justify-between items-start gap-5 flex-wrap">
      <div className="w-80p max-sm-w-full flex flex-col gap-5 relative bg-white rounded-xs p-5 shadow-md">
        <div className="w-full h-4 flex items-center justify-between">
          <h4>Question 1.</h4>
          <select
            name="topic"
            id="topic"
            className="w-30p h-4 border border-light-grey rounded-xs cursor-pointer"
            onChange={(e) => setQuestionData({ ...questionData, topic_id: Number(e.target.value) })}
            defaultValue={0}
          >
            <option value={0}>Enter Topic</option>
            {topics.map((topic) => (
              <option value={topic.id} key={topic.id}>{topic.name}</option>
            ))}
          </select>
        </div>
        <div className="w-full h-4 flex items-center justify-between">
          <textarea
            name="question"
            id="question"
            className="w-70p h-4 pl-1 border border-light-grey rounded-xs"
            placeholder="What is Newton’s first law of motion?"
            value={questionData.title}
            onChange={(e) => setQuestionData({ ...questionData, title: e.target.value })}
          />
          <select name="topic" id="topic"
            className="w-30p h-4 border border-light-grey rounded-xs cursor-pointer" defaultValue={0}>
            <option value={0}>Multiple choice answer</option>
            <option value="1">option1</option>
            <option value="2">option2</option>
            <option value="3">option3</option>
            <option value="4">option4</option>
          </select>
        </div>
        <div className="w-full flex flex-col gap-10 p-5 option-container">
          {options.map((option) => (
            <div key={option.id} className="w-full flex items-center justify-between gap-5 option-box">
              <div className="w-85p flex items-center gap-5">
                <UnionIcon />
                <input
                  type="radio"
                  name="correct_answer"
                  onChange={() => setQuestionData({ ...questionData, correct_answer: option.text })}
                />
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  className="w-80p h-4 pl-1 bg-color border border-light-grey rounded-xs"
                  placeholder="Type your option"
                  style={{ "--bg": "#F4F9FC" } as React.CSSProperties}
                />
              </div>
              {option.id !== 1 && ( // Only allow removal for options after the first
                <div
                  className="remove-option flex items-center gap-5 text-red px-2 py-1 cursor-pointer"
                  onClick={() => handleRemoveOption(option.id)}
                >
                  <TrashIcon />
                  <span>Remove</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full p-1 justify-end pr-1 items-center gap-10 inline-flex">
          {options.length < 5 && ( // Limit to 5 options
            <div
              className="p-10 bg-opaque-blue text-blue rounded-xs justify-start items-center gap-2 flex cursor-pointer"
              onClick={handleAddOption}
            >
              <AddIcon />
              <span>Add option</span>
            </div>
          )}
          <div className="justify-start items-center gap-2 flex text-light-blue cursor-pointer" id="openBtn" onClick={() => setSolutionModal(!solutionModal)}>
            <LinkIcon />
            <span>Add Solution</span>
          </div>
          <div className="justify-start items-center gap-2 flex text-base-wine cursor-pointer">
            <TrashIcon />
            <span>Delete</span>
          </div>
        </div>
      </div>
      {category && <input type="text" value={category} required hidden />}
      {solutionModal &&
        (<div className="fixed z-1 left-0 top-0 w-full h-full flex justify-center items-center overflow-auto bg-semi-black transition-all addSolutionModal">
          <div className="relative w-half max-sm-w-90p h-3-quarts flex flex-col items-center justify-evenly gap-5 bg-brand-white p-10 rounded-md modal-content animate-slideDown">
            <span className="absolute w-3 h-3 flex justify-center items-center top-2 right-2 text-dark text-20 rounded-md border border-dark cursor-pointer hover:text-red-600" onClick={() => setSolutionModal(false)}>&times;</span>
            <h1 className="text-dark max-sm:text-sm">Add a <span className="text-secondary">Solution</span></h1>
            <p className="text-red">Choose only one out of the three!</p>

            <textarea
              className="w-3-quarts h-10 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
              name="solution"
              placeholder="solution text if any"
              onChange={(e) => handleSolutionChange(e, 'text')}
            ></textarea>

            <input
              type="text"
              className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
              name="solution"
              placeholder="solution link if any"
              onChange={(e) => handleSolutionChange(e, 'link')}
            />

            <input
              type="file"
              className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
              name="solution"
              placeholder="solution image if any"
              onChange={(e) => handleSolutionChange(e, 'file')}
            />

            <div className="w-3-quarts flex items-center justify-between gap-5">
              <button className="w-half p-10 border-none outline-none rounded-sm bg-primary-grad22 text-primary cursor-pointer"
                type="button"
                onClick={() => setSolutionModal(false)}
              >
                continue
              </button>
            </div>
          </div>
        </div>)}
      <div className="w-80p max-sm-w-full flex items-center justify-end gap-10">
        <div onClick={handleSubmit} className="h-3 sm-md-height flex items-center gap-5 bg-primary text-white p-5 rounded-xs cursor-pointer">
          <span>Save and Continue</span>
        </div>
      </div>
      <Toaster />
    </div>
    </>
  )
}

export default NewQuestion
