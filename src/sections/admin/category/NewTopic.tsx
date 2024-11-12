import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UploadIcon from '../../../components/icons/Upload';
import toast, { Toaster } from 'react-hot-toast';
import { storeTopic } from '../../../lib/admin/api-topics';
import { fetchSubjectsByCategory } from '../../../lib/admin/api-subjects'; // Add this function to fetch subjects based on category

interface ITopic {
  name: string;
  subject_id: number;
  description: string|null;
}

const NewTopic: React.FC = () => {
  const [topicData, setTopicData] = useState<ITopic>({
    name: '',
    subject_id: 0,
    description: null,
  });
  const [subjectCategory, setSubjectCategory] = useState<number>(0);
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    // Fetch subjects when the category changes
    if (subjectCategory !== 0) {
      fetchSubjectsByCategory(subjectCategory)
        .then((data) => {
          setSubjects(data); // Update subjects with filtered list
          setTopicData((prevData) => ({ ...prevData, subject_id: 0 })); // Reset selected subject
        })
        .catch((error) => {
          toast.error('Failed to load subjects.');
          console.error('Error fetching subjects:', error);
        });
    }
  }, [subjectCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTopicData((prevData) => ({
      ...prevData,
      [name]: name === "subject_id" ? parseInt(value) : value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = parseInt(e.target.value);
    setSubjectCategory(selectedCategory); // Update category and trigger useEffect
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Creating topic...');
    try {
      if (topicData.subject_id === 0) {
        throw new Error('subject id needed!')
      }
      await storeTopic(topicData);
      toast.success('Topic created successfully!', { id: toastId });
      setTopicData({ name: '', subject_id: 0, description: null }); // Reset form
      setSubjectCategory(0); // Reset category selection
    } catch (error) {
      toast.error('Failed to create topic.', { id: toastId });
      console.error('Error creating topic:', error);
    }
  };

  return (
    <>
      <p className='text-right'>
        <Link to="/admin/dashboard/upload-subjects" className='text-right p-10 bg-primary text-white rounded-sm'>
          <UploadIcon /> Upload Subjects
        </Link>
      </p>
      <br />
      <div className="w-full max-sm-w-300 h-auto flex flex-col justify-center items-center text-dark overflow-x-auto">
        <form onSubmit={handleSubmit} className="relative w-half max-sm-w-90p h-3-quarts flex flex-col items-center justify-evenly gap-5 bg-white rounded-sm shadow-md p-10 rounded-md modal-content animate-slideDown" method="post">
          <h1 className="text-dark max-sm:text-sm">Add a <span className="text-secondary">Topic</span></h1>
          <input
            type="text"
            className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
            name="name"
            id="topicName"
            placeholder="Name of topic"
            value={topicData.name}
            onChange={handleInputChange}
          />
          <select
            className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
            name="subject_category"
            id="subjectCategory"
            value={subjectCategory}
            onChange={handleCategoryChange}
          >
            <option value={0}>Select Category of Subjects</option>
            <option value={1}>Common Entrance</option>
            <option value={2}>Junior WAEC</option>
            <option value={3}>Senior WAEC</option>
          </select>
          <select
            className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
            name="subject_id"
            id="subjectId"
            value={topicData.subject_id}
            onChange={handleInputChange}
            required
          >
            <option value={0}>Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
            name="description"
            id="description"
            placeholder="description or instruction of topic"
            value={topicData.description ?? ''}
            onChange={handleInputChange}
          />
          <div className="w-3-quarts flex items-center justify-between gap-5">
            <button className="w-fit p-10 border-none outline-none rounded-sm bg-primary-grad22 text-primary cursor-pointer" type="submit">
              Save and Close
            </button>
            <Link to="/admin/dashboard/add-question" className="w-fit p-10 border-none outline-none rounded-sm bg-primary text-center text-white cursor-pointer">
              Add Question
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default NewTopic;
