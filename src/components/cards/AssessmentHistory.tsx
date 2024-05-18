import React, { useState, useEffect } from "react";

interface HistoryItem {
  title: string;
  average_score: number;
  status: string;
  comment: string;
  dateCreated: string;
}

interface AssessmentHistoryProps {
  historyData: HistoryItem[];
}

const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({
  historyData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<HistoryItem[]>([]);

  const itemsPerPage = 10;

  // Calculate the number of pages based on the total data length
  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  useEffect(() => {
    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Display only the data points for the current page
    setCurrentPageData(historyData.slice(startIndex, endIndex));
  }, [currentPage, historyData]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`border-none w-3 h-3 mr-2 text-dark ${i === currentPage ? "bg-gray" : "bg-grey-10"
            } rounded-xs`}
        >
          {i}
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div id="subjects-wrapper" className="w-3-quarts overflow-x-auto">
      <table
        id="fl-table"
        className="w-full whitespace-no border-none border-collapse"
      >
        <thead className="bg-primary">
          <tr className="h-4 text-white">
            <th className="font-xs">S/N</th>
            <th className="font-xs text-left">Title</th>
            <th className="font-xs">Average Score (%)</th>
            <th className="font-xs">Status</th>
            <th className="font-xs">Comment</th>
            <th className="font-xs">Date Created</th>
            <th className="font-xs">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((history, index) => (
            <tr key={index} className="border-bottom border-primary-light">
              <td className="text-center p-10">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="text-left p-10">{history.title}</td>
              <td className="text-center p-10">{history.average_score}</td>
              <td className="text-center">
                <li
                  className="w-10 border border-primary text-primary rounded-sm text-12 bg-primary-10 p-val"
                  style={{ "--p": "10px" } as React.CSSProperties}
                >
                  {history.status}
                </li>
              </td>
              <td className="w-15 text-center">
                <li
                  className="w-80p text-dark rounded-sm text-12 bg-lightSuccess p-val"
                  style={{ "--p": "10px" } as React.CSSProperties}
                >
                  {history.comment}
                </li>
              </td>
              <td className="text-center">{history.dateCreated}</td>
              <td className="text-center">
                <a href="#" className="text-primary">
                  View Result
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="h-4 flex justify-around text-dark text-center">
        <span>
          Showing {totalPages} of {historyData.length}
        </span>
        <div>prev {renderPaginationButtons()} next</div>
      </div>
    </div>
  );
};

export default AssessmentHistory;
