import React from 'react';
import { Link } from 'react-router-dom';
import 'huebee/dist/huebee.min.css';
import { Subject } from '../../sections/admin/data/subjects';

type ModalProps = {
  onClose: () => void;
  subject: Subject
};

const EditModal: React.FC<ModalProps> = ({ onClose, subject }) => (
  <div className="fixed z-1 left-0 top-0 w-full h-full flex justify-center items-center overflow-auto bg-semi-black transition-all editSubjectModal">
    <form className="relative w-half h-3-quarts flex flex-col items-center justify-evenly gap-5 bg-brand-white p-10 rounded-md modal-content animate-slideDown" method="post">
      <span className="absolute w-3 h-3 flex justify-center items-center top-2 right-2 text-dark text-20 rounded-md border border-dark cursor-pointer hover:text-red-600" id="closeModal" onClick={onClose}>&times;</span>
      <h1 className="text-dark max-sm:text-sm">Edit <span className="text-secondary">Subject</span></h1>
      <input type="text" className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm" name="subject_name" id="subjectName" placeholder="Name of subject" value={subject.name}/>
      <select className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm" name="subject_category" id="subjectCategory" defaultValue={subject.category}>
        <option value={0}>Category of subject</option>
        <option value={1}>Common Entrance</option>
        <option value={2}>Junior WAEC</option>
        <option value={3}>Senior WAEC</option>
      </select>
      <input className="w-3-quarts h-4 pl-1 bg-primary-grad2 text-14 border-none outline-none rounded-sm shadow-sm" id="subjectColor" name="subject_color" placeholder="Color of subject" data-huebee='{ "saturations": 3, "hues":6, "shades":3 }' />
      <div className="w-3-quarts flex items-center justify-between gap-5">
            <button className="w-half p-10 border-none outline-none rounded-sm bg-primary-grad22 text-primary cursor-pointer" type="submit">Save and Close</button>
            <Link to="/admin/dashboard/add-question" className="w-half p-10 border-none outline-none rounded-sm bg-primary text-center text-white cursor-pointer" onClick={onClose}>Add Question</Link>
        </div>
    </form>
  </div>
);

export default EditModal;
