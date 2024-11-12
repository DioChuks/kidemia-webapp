import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '../icons/Grid';
import ReportLineIcon from '../icons/ReportLine';

const Sidebar: React.FC = () => (
  <div className="md-d-flex w-15p h-full hidden flex-col gap-10 items-start bg-white text-16 text-secondary p-5">
    <div className="flex items-center gap-5 text-secondary mt-5">
        <Grid/> <span>Dashboard</span>
    </div>
    <Link to="/admin/dashboard/report" className="w-full flex items-center gap-5 text-secondary text-secondary border-bottom-3 border-secondary">
      <ReportLineIcon/> <span className="font-lg">Report</span>
    </Link>
    <Link to="/admin/dashboard/subjects" className="w-full flex justify-between items-center gap-5 text-dark">
      <h3>Subjects </h3><span>(12)</span>
    </Link>
    <Link to="/admin/dashboard/new-topic" className="w-full flex justify-between items-center gap-5 text-dark">
      <p> - Add Topic </p>
    </Link>
    <Link to="/admin/dashboard/add-question" className="w-full flex justify-between items-center gap-5 text-dark">
      <p> - Add Question Wizard </p>
    </Link>
  </div>
);

export default Sidebar;
