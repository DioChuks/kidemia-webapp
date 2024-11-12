import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchIcon from '../../../components/icons/Search';
import FilterIcon from '../../../components/icons/Filter';
import PlusIcon from '../../../components/icons/Plus';
import EditModal from '../../../components/admin/EditSubjectModal';
import { fetchSubject } from '../../../lib/admin/api-subjects';
import { deleteTopic } from '../../../lib/admin/api-topics';

// Define interfaces for Topic and SubjectData
interface Topic {
  id: number;
  uuid: string;
  name: string;
  subject_id: number;
}

interface Subject {
  id: number;
  name: string;
  uuid: string;
  category_id: number;
  color: string;
  topics: Topic[];
}

const ShowSubject: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subjectData, setSubjectData] = useState<Subject>({
    id: 0,
    name: "",
    uuid: "",
    category_id: 0,
    color: "",
    topics: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulate fetching subject data based on subjectId
  useEffect(() => {
    const fetchedSubject = async () => {
      setLoading(true);
      try {
        if (subjectId) {
          const response = await fetchSubject(subjectId);
          setSubjectData(response);
        }
      } catch (error) {
          console.error("Error fetching subjects:", error);
      } finally {
          setLoading(false);
      }
    }

    fetchedSubject();
  }, [subjectId]);

  const handleDelete = async (topicId: number) => {
    await deleteTopic(topicId);
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
    {/* <button onClick={() => navigate(-1)} className='bg-transparent cursor-pointer rounded-full w-fit font-2xl text-25'>&larr;</button> */}
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
    {isModalOpen && <EditModal subject={{name: subjectData.name, uuid: subjectData.uuid, category: subjectData.category_id }} onClose={handleModalToggle}/>}
    </>
  );
};

export default ShowSubject;
