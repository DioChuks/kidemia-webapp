import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '../icons/Grid';
import ReportLineIcon from '../icons/ReportLine';

const Sidebar: React.FC = () => (
  <div className="md-d-flex w-15p h-full hidden flex-col gap-10 items-start bg-white text-16 text-secondary p-5">
    <div className="flex items-center gap-5 text-secondary mt-5">
        <Grid/> <span>Dashboard</span>
    </div>
    <Link to="/admin/guardian/ward-report" className="w-full flex items-center gap-5 text-secondary text-dark">
      <ReportLineIcon/> <span className="font-lg">Report</span>
    </Link>
    <Link to="/admin/guardian" className="w-full flex justify-between items-center gap-5 font-lg text-secondary border-bottom-3 border-secondary">
      <h3>Ward(s) </h3><span>(4)</span>
    </Link>
  </div>
);

export default Sidebar;
