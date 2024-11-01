import React, { useEffect, useState } from 'react';
import SearchIcon from '../../../components/icons/Search';
import FilterIcon from '../../../components/icons/Filter';
import { Link } from 'react-router-dom';
import UploadIcon from '../../../components/icons/Upload';

// Define the type for a Subject
interface Subject {
  subject: string;
  uuid: string;
  questions: string[];
  topics: string[];
}

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Simulated data fetch (you would replace this with an actual API call)
  useEffect(() => {
    const fetchedSubjects: Subject[] = [
      {
        subject: "Mathematics",
        uuid: "x9dwd-3dnod3-fnd39d-fwj",
        questions: [
          "What is x + 1 = 7? Find x",
          "Solve 299 - (-299)",
          "Solve 390 * (-390)",
          "Solve 105 / 15"
        ],
        topics: ["Algebra", "Calculus", "Geometry", "Number Theory"],
      },
      {
        subject: "English Language",
        uuid: "9fr0j-fe9jd-fwejw-hfid",
        questions: [
          "What is a verb?",
          "What is a clause?",
          "What is a sentence?",
          "What is a word?"
        ],
        topics: ["Vocabulary", "Literature", "Writing", "Linguistics", "Grammar"],
      },
      {
        subject: "Verbal Reasoning",
        uuid: "oefo-30dj-pwi3d-39hd9",
        questions: [
          "Identify the word that is the opposite of 'diligent'",
          "Choose the word that best completes the sentence: 'The politician's speech was _____ and failed to address the concerns of the public.'",
          "Which word is the odd one out in the following group?",
          "Identify the analogy that makes the most sense:",
          "Choose the word that best fits the given definition:"
        ],
        topics: ["Analogies", "Sentence Completion", "Reading Comprehension", "Logical Reasoning", "Vocabulary"],
      },
      {
        subject: "History",
        uuid: "wfhq-3nidw-fwiqd-msl3d",
        questions: [
          "Which ancient civilization is credited with developing one of the earliest writing systems, cuneiform?",
          "What was the primary cause of the American Revolution?",
          "Who was the last monarch of the Russian Empire before the Bolshevik Revolution?",
          "Which battle is considered a turning point in World War II in favor of the Allied forces?",
          "What was the primary goal of the Renaissance humanist movement?",
        ],
        topics: ["Ancient Civilizations", "World Wars", "Renaissance and Reformation", "Revolutions", "Colonial and Post-Colonial Eras"],
      },
    ];

    // Simulating a delay for fetching data
    setTimeout(() => {
      setSubjects(fetchedSubjects);
    }, 1000);
  }, []);

  // Filtering and sorting logic
  const filteredSubjects = subjects.filter(subject => {
    return subject.subject.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (sortBy === 'recent') return 0; // Change this logic based on your sorting needs
    return a.subject.localeCompare(b.subject);
  });

  const handleDelete = async (subjectId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this topic? Yes or No");

    if (confirmDelete) {
      try {
        // Send delete request to the API endpoint
        const response = await fetch(`http://localhost:8000/api/admin/subjects/${subjectId}/delete`, {
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

  return (
    <>
    <p className='text-right'><Link to="/admin/dashboard/upload-subjects" className='text-right p-10 bg-primary text-white rounded-sm'><UploadIcon/> Upload Subjects</Link></p>
    <br />
    <div className="w-full max-sm-w-300 h-auto flex flex-col justify-center items-center text-dark bg-white rounded-sm shadow-md overflow-x-auto">
      <div className="w-full flex justify-end items-center gap-10 p-10">
        <div className="w-20 h-4 flex items-center justify-center gap-5 rounded-xs bg-inputGrey">
          <label htmlFor="searchSubject" className="h-inherit flex items-center">
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
              <th>Subject</th>
              <th>No. of Questions</th>
              <th>No. of Topics</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredSubjects.map((subject, index) => (
              <tr className="even-el-bg" style={{ "--elBg": "rgba(191, 76, 32, 0.10)" } as React.CSSProperties} key={subject.uuid}>
                <td>{index + 1}</td>
                <td>{subject.subject}</td>
                <td>{subject.questions.length}</td>
                <td>{subject.topics.length}</td>
                <td className="p-20 text-right">
                  <Link to={`/admin/dashboard/subject/${subject.uuid}`} className="p-10 bg-primary text-white rounded-sm cursor-pointer">View</Link>
                  <span>{" "}</span>
                  <span onClick={() => handleDelete(subject.uuid)} className="p-10 bg-light-wine text-wine rounded-sm border-none cursor-pointer">Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Subjects;
