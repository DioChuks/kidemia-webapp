import React from 'react';

interface CardInfoBoxProps {
  icon: React.ReactElement;
  title: string;
  amount: number;
  type: string;
  className?: string;
}

const CardInfoBox: React.FC<CardInfoBoxProps> = ({ icon, title, amount, type, className }) => {
  return (
    <div className={`max-sm-w-full w-25 h-15 flex justify-evenly rounded-sm transition-all info-card ${className}`}>
      <div className="flex items-center gap-5">
        <span className={type}>{icon}</span>
        <div className="flex flex-col items-center gap-5">
          <h6 className="text-dark md:font-sm">{title}</h6>
          <h1>{amount}</h1>
        </div>
      </div>
    </div>
  );
};

export default CardInfoBox;
