import React from 'react';
import { Link } from 'react-router-dom';
import subjects from '../data/subjects';

const SubjectSelection: React.FC = () => {

  return (
    <div className="w-full flex justify-between items-center gap-5 flex-wrap">
      <div className="w-80p max-sm-w-full pt-1 flex flex-col items-center gap-10 bg-white rounded-sm">
        <h1 className="text-center text-primary">Select a Subject</h1>
        <div className="w-full flex flex-wrap bg-semi-transparent items-center gap-10 p-10">
          {subjects.map((subject) => (
            <Link
              to={`/admin/dashboard/new-question/${subject.uuid}`}
              key={subject.uuid}
              className="w-20 p-10 border border-light-grey rounded-xs bg-grey-200 shadow-md-hover transition-all"
            >
              <span className="text-center text-dark">{subject.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
