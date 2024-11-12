import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'huebee/dist/huebee.min.css';
import { storeSubject } from '../../lib/admin/api-subjects';

type ModalProps = {
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [subjectData, setSubjectData] = useState({
    name: '',
    category_id: 0,
    color: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: name === 'category_id' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subjectData.name || subjectData.category_id === 0) {
      toast.error('Please fill in all fields');
      return;
    }

    const toastId = toast.loading('Saving subject...');
    try {
      await storeSubject({
        name: subjectData.name,
        category_id: subjectData.category_id,
        color: subjectData.color,
      });
      toast.success('Subject added successfully!', { id: toastId });
      setSubjectData({ name: '', category_id: 0, color: null }); // Reset form
      onClose(); // Close the modal
    } catch (error) {
      toast.error('Failed to add subject.', { id: toastId });
      console.error('Error creating subject:', error);
    }
  };

  return (
    <div className="fixed z-1 left-0 top-0 w-full h-full flex justify-center items-center overflow-auto bg-semi-black transition-all addSubjectModal">
      <form onSubmit={handleSubmit} className="relative w-half max-sm-w-90p h-3-quarts flex flex-col items-center justify-evenly gap-5 bg-brand-white p-10 rounded-md modal-content animate-slideDown" method="post">
        <span className="absolute w-3 h-3 flex justify-center items-center top-2 right-2 text-dark text-20 rounded-md border border-dark cursor-pointer hover:text-red-600" onClick={onClose}>&times;</span>
        <h1 className="text-dark max-sm:text-sm">Add a <span className="text-secondary">Subject</span></h1>
        
        <input
          type="text"
          className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
          name="name"
          placeholder="Name of subject"
          value={subjectData.name}
          onChange={handleInputChange}
        />

        <select
          className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
          name="category_id"
          value={subjectData.category_id}
          onChange={handleInputChange}
        >
          <option value={0}>Category of subject</option>
          <option value={1}>Common Entrance</option>
          <option value={2}>Junior WAEC</option>
          <option value={3}>Senior WAEC</option>
        </select>

        <input
          type="text"
          className="w-3-quarts h-4 pl-1 bg-primary-grad2 text-14 border-none outline-none rounded-sm shadow-sm"
          name="color"
          placeholder="Color of subject"
          value={subjectData.color ?? ''}
          onChange={handleInputChange}
          data-huebee='{ "saturations": 3, "hues":6, "shades":3 }'
        />

        <div className="w-3-quarts flex items-center justify-between gap-5">
          <button className="w-half p-10 border-none outline-none rounded-sm bg-primary-grad22 text-primary cursor-pointer" type="submit">
            Save and Close
          </button>
          <Link to="/admin/dashboard/add-question" className="w-half p-10 border-none outline-none rounded-sm bg-primary text-center text-white cursor-pointer" onClick={onClose}>
            Add Question
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Modal;
