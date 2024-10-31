import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '../../../components/icons/Search';
import FilterIcon from '../../../components/icons/Filter';
import PlusIcon from '../../../components/icons/Plus';
import EditModal from '../../../components/admin/EditSubjectModal';

// Define interfaces for Topic and SubjectData
interface Topic {
  id: string;
  name: string;
  questions: string[];
}

interface SubjectData {
  topics: Topic[];
}

const ShowSubject: React.FC = () => {
    const { subjectId } = useParams<{ subjectId: string }>();
  const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Simulate fetching subject data based on subjectId
  useEffect(() => {
    const fetchSubjectData = async () => {
      // Simulate a network request to fetch subject data
      const simulatedApiResponse: SubjectData = {
        topics: [
          {
            id: '1223',
            name: 'Algebra',
            questions: [
              "What is x + 1 = 7? Find x",
              "Solve 299 - (-299)",
              "Solve 390 * (-390)",
            ],
          },
          {
            id: '1224',
            name: 'Calculus',
            questions: [
              "What is the derivative of x²?",
              "Integrate x from 0 to 1.",
              "What is the limit of (1/x) as x approaches 0?",
            ],
          },
          {
            id: '1225',
            name: 'Geometry',
            questions: [
              "What is the area of a circle?",
              "What is the Pythagorean theorem?",
              "Define a polygon.",
            ],
          },
        ],
      };

      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set the fetched data
      setSubjectData(simulatedApiResponse);
      setLoading(false);
    };

    fetchSubjectData();
  }, [subjectId]);

  const handleDelete = async (topicId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this topic? Yes or No");

    if (confirmDelete) {
      try {
        // Send delete request to the API endpoint
        const response = await fetch(`http://localhost:8000/api/admin/subjects/${subjectId}/topics/${topicId}/delete`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Handle successful deletion (e.g., update state, show message, etc.)
          alert("Topic deleted successfully!");
          // Optionally, re-fetch the subject data or update the state to remove the deleted topic
        } else {
          alert("Failed to delete the topic. Please try again.");
        }
      } catch (error) {
        alert("An error occurred while deleting the topic. Please try again.");
      }
    }
  };

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  // Render loading state or subject data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!subjectData) {
    return <div>No subject data found.</div>;
  }

  return (
    <>
    <div className='text-right flex justify-between'>
    <button onClick={() => navigate(-1)} className='bg-transparent cursor-pointer rounded-full w-fit font-2xl text-25'>&larr;</button>
        <p className='text-right flex items-center gap-5 p-10 border-none outline-none bg-primary-10 bg-hover text-primary rounded-sm cursor-pointer transition-all w-fit'
        style={{"--bgHoverColor": "#555"} as React.CSSProperties} onClick={handleModalToggle}><PlusIcon/> Edit Subject</p>
    </div>
    <br />
    <div className="w-full h-auto flex flex-col justify-center items-center text-dark bg-white rounded-sm shadow-md">
      <div className="w-full flex justify-end items-center gap-10 p-10">
        <div className="w-20 h-4 flex items-center justify-center gap-5 rounded-xs bg-inputGrey">
          <label htmlFor="searchSubject" className="h-inherit flex items-center">
            {/* Replace with your search icon component */}
            <SearchIcon/>
          </label>
          <input
            type="text"
            className="w-80p h-inherit border-none outline-none bg-transparent"
            name="search_subject"
            id="searchSubject"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-20 h-4 flex items-center justify-center gap-5">
          <span id="filterTitle">Filter</span>
          <div className="flex items-center gap-5 p-10 rounded-xs shadow-sm cursor-pointer">
            <select
              name="filter_subject"
              id="filterSubject"
              className="border-none outline-none appearance-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all" selected>All</option>
              <option value="subject">Subject</option>
              <option value="topic">Topic</option>
            </select>
            <label htmlFor="filterSubject" className="no-pointer-events z-1">
              {/* Replace with your filter icon component */}
              <FilterIcon />
            </label>
          </div>
        </div>
        <div className="w-auto h-4 flex items-center justify-center gap-5">
          <label htmlFor="sortBy">Sort by</label>
          <select
            className="p-10 rounded-xs"
            name="sort_by"
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent" selected>Most recent</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="noOfQuestions">No. of Questions</option>
          </select>
        </div>
      </div>
      <div className="w-full">
        <table id="fl-table" className="w-full whitespace-no border-none border-collapse">
          <thead>
            <tr className="h-4 text-dark">
              <th>S/N</th>
              <th>Topic</th>
              <th className='text-right pr-5'>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {subjectData.topics.map((topic, index) => (
              <tr key={topic.id} className="even-el-bg" style={{ "--elBg": "rgba(191, 76, 32, 0.10)" } as React.CSSProperties}>
                <td>{index + 1}</td>
                <td>{topic.name}</td>
                <td className="p-20 text-right">
                <span
                    onClick={() => handleDelete(topic.id)}
                    className="p-10 bg-light-wine text-wine rounded-sm cursor-pointer"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {isModalOpen && <EditModal subject={{name: "Something", uuid: "4f948f-43fh45-385h-598fh", category: "junior-waec" }} onClose={handleModalToggle}/>}
    </>
  );
};

export default ShowSubject;
