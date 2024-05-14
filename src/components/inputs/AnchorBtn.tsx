import React from "react";
import { Link } from "react-router-dom";

interface AnchorBtnInterface {
  classType: string;
  slot: string;
  endpoint: string;
}

const AnchorBtn: React.FC<AnchorBtnInterface> = ({
  classType,
  slot,
  endpoint,
}) => {
  return (
    <Link
      to={endpoint}
      className={`flex items-center gap-5 p-10 rounded-sm cursor-pointer transition-all ${classType}`}
    >
      {slot}
    </Link>
  );
};

export default AnchorBtn;
