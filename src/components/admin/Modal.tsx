import React from 'react';

type ModalProps = {
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ onClose }) => (
  <div className="fixed z-10 left-0 top-0 w-full h-full flex justify-center items-center bg-semi-black transition-all">
    <form className="relative w-1/2 h-3/4 flex flex-col items-center justify-evenly bg-brand-white p-10 rounded-md" method="post">
      <button type="button" className="absolute top-2 right-2 text-dark text-20" onClick={onClose}>
        &times;
      </button>
      <h1 className="text-dark">Add a <span className="text-secondary">Subject</span></h1>
      <input type="text" className="w-3/4 h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm" placeholder="Name of subject" />
      <select className="w-3/4 h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm">
        <option value="0">Category of subject</option>
        <option value="common entrance">Common Entrance</option>
        <option value="junior waec">Junior WAEC</option>
        <option value="senior waec">Senior WAEC</option>
      </select>
      <input className="w-3/4 h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm" placeholder="Color of subject" />
      <button className="w-1/2 p-2 bg-primary text-white rounded-sm" type="submit">Save and Close</button>
    </form>
  </div>
);

export default Modal;
