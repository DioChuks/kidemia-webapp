import React, { useEffect, useState } from 'react';
import SearchIcon from '../../../components/icons/Search';
import FilterIcon from '../../../components/icons/Filter';
import { Link } from 'react-router-dom';
import UploadIcon from '../../../components/icons/Upload';
import toast, { Toaster } from 'react-hot-toast';
import { deleteSubject, fetchSubjectStats } from '../../../lib/admin/api-subjects';

interface SubjectStats {
  id: number;
  uuid: string;
  name: string;
  category_id: number;
  no_of_questions: number;
  no_of_topics: number;
}

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectStats[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('1');
  const [sortBy, setSortBy] = useState('recent');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedSubjectStats = async () => {
      setLoading(true);
      const toastId = toast.loading("Loading subjects...");
      try {
        const response = await fetchSubjectStats();
        setSubjects(response.data);
        toast.success("Subjects loaded successfully!", { id: toastId });
      } catch (error) {
        toast.error("Failed to load subjects.", { id: toastId });
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchedSubjectStats();
  }, []);

  // Filtering and sorting logic
  const filteredSubjects = subjects.filter(subject => {
    return subject.name.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (sortBy === 'recent') return 0;
    return a.name.localeCompare(b.name);
  });

  // pagination logic to show only a max of 5
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubjects = filteredSubjects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page > totalPages || page < 1) return;
    setCurrentPage(page);
  };

  const handleDelete = async (subjectId: string) => {
    await deleteSubject(subjectId);
  };

  return (
    <>
      <div className='flex justify-end'>
        <Link to="/admin/dashboard/upload-subjects" className='flex gap-6 w-fit items-center p-10 bg-primary text-white rounded-sm'>
          <UploadIcon /> Upload Subjects
        </Link>
      </div>
      <br />
      <div className="w-full max-sm-w-300 h-auto flex flex-col justify-center items-center text-dark bg-white rounded-sm shadow-md overflow-x-auto">
        <div className="w-full flex justify-end items-center gap-10 p-10">
          <div className="w-20 h-4 flex items-center justify-center gap-5 rounded-xs bg-inputGrey">
            <label htmlFor="searchSubject" className="h-inherit flex items-center">
              <SearchIcon />
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
                <option value="1">C.E</option>
                <option value="2">JSCE</option>
                <option value="3">SSCE</option>
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
              <option value="recent">Most recent</option>
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
                <th>Subject</th>
                <th>No. of Questions</th>
                <th>No. of Topics</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {!loading ? currentSubjects.map((subject, index) => (
                <tr className="even-el-bg" style={{ "--elBg": "rgba(191, 76, 32, 0.10)" } as React.CSSProperties} key={subject.uuid}>
                  <td>{index + 1}</td>
                  <td>{subject.name}</td>
                  <td>{subject.no_of_questions}</td>
                  <td>{subject.no_of_topics}</td>
                  <td className="p-20 text-right">
                    <Link to={`/admin/dashboard/subject/${subject.uuid}`} className="p-10 bg-primary text-white rounded-sm cursor-pointer">View</Link>
                    <span>{" "}</span>
                    <span onClick={() => handleDelete(subject.uuid)} className="p-10 bg-light-wine text-wine rounded-sm border-none cursor-pointer">Delete</span>
                  </td>
                </tr>
              )) : <tr className='py-3 mb-3'>Loading...</tr>}
            </tbody>
          </table>
          {/* handle pagination buttons */}
          <div className='flex items-center justify-end gap-8 w-full'>
            <p>{currentPage}/<span className='font-bold text-teal-600'>{totalPages}</span></p>
            <p className='p-5 flex gap-5'>
              <button className={`p-1 rounded-sm ${currentPage === 1 ? "cursor-not-allowed border text-black" : "bg-teal-800 text-white cursor-pointer"}`} onClick={() => handlePageChange(currentPage - 1)}>back</button>
              <button className={`p-1 rounded-sm ${currentPage === totalPages ? "cursor-not-allowed border text-black" : "bg-teal-800 text-white cursor-pointer"}`} onClick={() => handlePageChange(currentPage + 1)}>next</button>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Subjects;
