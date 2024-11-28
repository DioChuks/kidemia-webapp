import React from 'react';
import LogoCC42 from "../../assets/images/KIDEMIA LOGO CC 4 -2.png";

interface IReady {
    subjectId: string;
    type: string;
    onStart: () => void
}

const Ready: React.FC<IReady> = ({ subjectId, type, onStart }) => {
  return (
    <div
      className="relative h-max-screen sm-h-val bg-secondary"
      style={{ "--smallHeightValue": "auto" } as React.CSSProperties}
    >
      <div className="flex justify-end gap-10 h-max-screen">
        <div
          className="h-90p h-md-sm flex sm-d-none flex-col justify-end items-center p-20"
          style={{ "--rH": "50px" } as React.CSSProperties}
        >
          <div className="w-full h-half flex items-right">
            <a
              href={`/pick/${subjectId}/topic/${type}`}
              className="w-10 h-3 bg-primary p-5 text-white text-14 font-lg rounded"
            >
              <span>&larr; Back</span>
            </a>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 text-center text-white">
            <img src={LogoCC42} alt="logo alt" className="w-30 h-30" />
            <div>
              <span>“What we learn with pleasure, we never forget.”</span>
              <h3 className="mt-5">Alfred Mercier</h3>
            </div>
          </div>
        </div>
        <div
          className="w-70p sm-w-value h-full flex flex-col justify-end"
          style={{ "--rWidthValue": "100%" } as React.CSSProperties}
        >
          <div
            className="w-full h-95p sm-h-val flex flex-col justify-around gap-10 bg-brand-white top-left-radius-lg p-20"
            style={{ "--smallHeightValue": "100%" } as React.CSSProperties}
          >
            <a
              href={`/pick/${subjectId}/topic/${type}`}
              className="w-10 h-5 bg-primary p-5 text-white text-14 font-lg md-d-none"
            >
              <span>&larr; Back</span>
            </a>
            <div className="w-80p flex flex-col gap-10">
              <h3 className="text-dark ready-subject-title">
                You are writing a <span id="subjects">{type}</span>
              </h3>
              <div className="flex flex-col gap-10" id="subjectInstruction">
                <p>
                  The {type} has 20 questions to be answered in 20 minutes, it
                  will cover the following topics:
                </p>
                <ul className="flex flex-col items-start pl-5">
                  <li className="list-numeric font-sm">Lorem</li>
                  <li className="list-numeric font-sm">Ipsum</li>
                </ul>
              </div>
            </div>
            <div className="ready-instructions">
              <h1
                className="mb-5 text-dark sm-text-value"
                style={{ "--textSmVal": "18px" } as React.CSSProperties}
              >
                Read All Instructions Before You Start
              </h1>
              <div className="flex flex-col gap-10" id="subjectInstruction">
                <ul className="flex flex-col items-start pl-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i} className="list-numeric font-sm">
                      Do not leave this screen else the test would end
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end items-end">
              <div
                className="flex flex-col justify-center items-center gap-5"
                id="readyInfoBtn"
              >
                <p>Ready? Click the button below to begin</p>
                <div
                  onClick={onStart}
                  className="w-30 h-5 flex items-center justify-center bg-primary text-white text-sm font-bold cursor-pointer rounded"
                >
                  Start
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ready