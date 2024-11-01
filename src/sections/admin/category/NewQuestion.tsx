import React, { useEffect, useState } from 'react';
import UnionIcon from '../../../components/icons/Union'
import AddIcon from '../../../components/icons/Add'
import LinkIcon from '../../../components/icons/Link'
import UploadIcon from '../../../components/icons/Upload'
import TrashIcon from '../../../components/icons/Trash'
import { useParams } from 'react-router-dom';

interface Option {
    id: number;
    text: string;
}

const NewQuestion: React.FC = () => {
    const { subjectId } = useParams<{ subjectId: string }>(); // Fetch the subjectId from route params
    const [options, setOptions] = useState<Option[]>([{ id: 1, text: '' }]);

    useEffect(() => {
        // Use subjectId to fetch data if needed
        if (subjectId) {
        // Fetch subject-specific data or perform any other initialization
        console.log("Fetching data for subject ID:", subjectId);
        }
    }, [subjectId]);

      const handleAddOption = () => {
        // Only allow up to 4 options
        if (options.length < 4) {
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

  return (
    <div className="w-full flex flex-col justify-between items-start gap-5 flex-wrap">
        <div className="w-80p max-sm-w-full flex flex-col gap-5 relative bg-white rounded-xs p-5 shadow-md">
        <div className="w-full h-4 flex items-center justify-between">
            <h4>Question 1.</h4>
            <select name="topic" id="topic"
            className="w-30p h-4 border border-light-grey rounded-xs cursor-pointer">
            <option selected>Enter Topic</option>
            <option value="1">topic1</option>
            <option value="2">topic2</option>
            <option value="3">topic3</option>
            <option value="4">topic4</option>
            </select>
        </div>
        <div className="w-full h-4 flex items-center justify-between">
            <input type="text" name="question" id="question"
            className="w-70p h-4 pl-1 border border-light-grey rounded-xs"
            placeholder="What is Newton’s first law of motion?" />
            <select name="topic" id="topic"
            className="w-30p h-4 border border-light-grey rounded-xs cursor-pointer">
            <option selected>Multiple choice answer</option>
            <option value="1">option1</option>
            <option value="2">option2</option>
            <option value="3">option3</option>
            <option value="4">option4</option>
            </select>
        </div>
        <div className="w-full flex flex-col gap-10 p-5 option-container">
            {options.map((option, index) => (
              <div key={option.id} className="w-full flex items-center justify-between gap-5 option-box">
                <div className="w-85p flex items-center gap-5">
                  <UnionIcon />
                  <input type="radio" name="answer" />
                  <input
                    type="text"
                    name={`option${option.id}`}
                    id={`option${option.id}`}
                    value={option.text}
                    onChange={(e) =>
                      setOptions(
                        options.map((opt) =>
                          opt.id === option.id ? { ...opt, text: e.target.value } : opt
                        )
                      )
                    }
                    className="w-80p h-4 pl-1 bg-color border border-light-grey rounded-xs"
                    placeholder="Type your option"
                    style={{ "--bg": "#F4F9FC" } as React.CSSProperties}
                  />
                </div>
                {index > 0 && ( // Only allow removal for options after the first
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
        {options.length < 4 && ( // Limit to 4 options
              <div
                className="p-10 bg-opaque-blue text-blue rounded-xs justify-start items-center gap-2 flex cursor-pointer"
                onClick={handleAddOption}
              >
                <AddIcon />
                <span>Add option</span>
              </div>
            )}
            <div className="justify-start items-center gap-2 flex text-light-blue cursor-pointer" id="openBtn">
            <LinkIcon/>
            <span>Link to Media</span>
            </div>
            <div className="justify-start items-center gap-2 flex text-primary">
            <label htmlFor="correctionVideo" className="flex items-center gap-5 cursor-pointer"><UploadIcon/>
                Upload Media</label>
            <input type="file" name="correction_video" id="correctionVideo" className="hidden" />
            </div>
            <div className="justify-start items-center gap-2 flex text-base-wine cursor-pointer">
            <TrashIcon/>
            <span>Delete</span>
            </div>
          </div>
        </div>
        <div className="w-80p max-sm-w-full flex items-center justify-end gap-10">
          <div className="flex items-center gap-5 text-primary cursor-pointer">
              <div className="flex items-center bg-primary text-white rounded-full">
              <AddIcon/>
              </div>
              <span>Add Question</span>
          </div>
          <div className="h-3 sm-md-height flex items-center gap-5 bg-primary text-white p-5 rounded-xs cursor-pointer">
              <span>Save and Continue</span>
          </div>
        </div>
    </div>
  )
}

export default NewQuestion
