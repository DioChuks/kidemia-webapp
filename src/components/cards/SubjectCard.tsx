import React from "react";

interface SubjectCardProps {
  id: number;
  logo: string;
  title: string;
  topicAmount: number;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  id,
  logo,
  title,
  topicAmount,
  isSelected,
  onSelect,
}) => {
  return (
    <label
      className={`relative w-25 h-20 flex flex-col justify-between items-center bg-primary-10 rounded-lg transition-all subject-card ${isSelected ? "subject-selected" : ""}`}
      onClick={() => onSelect(id)}
      htmlFor={`selected-${id}`}
    >
      <div className="img">
        <img src={logo} alt="sub-img" className="w-full h-full" />
      </div>
      <h2 className="subject-title">{title}</h2>
      <p className="subject-topics">{topicAmount} Topics</p>
    </label>
  );
};

export default SubjectCard;
