import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSubjectsByCategory } from '../../../lib/admin/api-subjects';

interface Subjects {
  id: number;
  name: string;
  uuid: string;
  category_id: number;
}

const SubjectSelection: React.FC = () => {
  const [category, setCategory] = useState<number>(0);
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (category !== 0) {
      const fetchedSubjects = async () => {
        setLoading(true);
        try {
          const response = await fetchSubjectsByCategory(category);
          setSubjects(response);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        } finally {
          setLoading(false);
        }
      }


      fetchedSubjects();
    }
  }, [category]);

  return (
    <div className="w-full flex justify-between items-center gap-5 flex-wrap">
      <div className="w-80p max-sm-w-full pt-1 flex flex-col items-center gap-10 bg-white rounded-sm">
        <h1 className="text-center text-primary font-bold text-xl">Select a Subject</h1>
        <select className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
          name="subject_category"
          id="subjectCategory"
          onChange={(e) => setCategory(Number(e.target.value))}
        >
          <option value={0}>Category of subject</option>
          <option value={1}>Common Entrance</option>
          <option value={2}>Junior WAEC</option>
          <option value={3}>Senior WAEC</option>
        </select>
        <div className="w-full flex flex-wrap bg-semi-transparent items-center gap-10 p-10">
          {!loading ? subjects.map((subject) => (
            <Link
              to={`/admin/dashboard/new-question/${subject.id}?category=${subject.category_id}`}
              key={subject.uuid}
              className="w-20 p-10 border border-light-grey rounded-xs bg-grey-200 shadow-md-hover transition-all"
            >
              <span className="text-center text-dark">{subject.name}</span>
            </Link>
          )) : <p className='text-green'>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
