import React from "react";

interface BtnProps {
  btnId: string;
  classType: string;
  slot: string;
}

const Btn: React.FC<BtnProps> = ({ btnId, classType, slot }) => {
  return (
    <button
      id={btnId}
      className={`flex items-center gap-5 p-10 ${classType} rounded-sm border border-white cursor-pointer transition-all`}
    >
      {slot}
    </button>
  );
};

export default Btn;
