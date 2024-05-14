import React from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';

interface ModalProps {
  modalId: string;
  img: string;
  title: string;
  subtitle: string;
  type: string;
  sizeClass: string;
  onClose: () => void;
}

const TakeAssessmentModal: React.FC<ModalProps> = ({ modalId, img, title, subtitle, type, sizeClass, onClose }) => {
  return (
    <div
      id={modalId}
      className="fixed flex z-10 w-max-screen h-max-screen justify-center items-center bg-semi-black p-10"
    >
      <div className="w-half h-half flex flex-col justify-between items-center gap-10 p-20 text-dark bg-brand-white rounded-md z-99 animate__animated animate__zoomInUp">
        <div className="w-20 h-10 flex justify-center">
          <img src={img} alt="second-img" className={`object-cover ${sizeClass}`} />
        </div>

        <div className="w-full text-center test-body">
          <h1 className="mb-1">{title}</h1>
          <p className="font-md">{subtitle}</p>
        </div>

        <div className="flex gap-10">
          <button className="btn btn-secondary sm-btn" id={`close-${type}`} onClick={onClose}>
            cancel
          </button>
          <Link href={`/pick-subject/${type}`} className="btn btn-primary sm-btn">
            continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TakeAssessmentModal;
