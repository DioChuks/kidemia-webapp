import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import UploadIcon from '../../../components/icons/Upload';
import { fetchSubjectsByCategory } from '../../../lib/admin/api-subjects';
import { fetchTopicsBySubjectId } from '../../../lib/admin/api-topics';
import { handleRequestError } from '../../../lib/api-error-handler';
import { importQuestions } from '../../../lib/admin/api-questions';

interface IForm {
    topic_id: number;
    name: string;
    subject_id: number;
    description: string | null;
}


const UploadQuestions: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const [topicData, setTopicData] = useState<IForm>({
        topic_id: 0,
        name: '',
        subject_id: 0,
        description: null,
    });

    const [subjectCategory, setSubjectCategory] = useState<number>(0);
    const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([]);
    const [topics, setTopics] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        // Fetch subjects when the category changes
        if (subjectCategory !== 0) {
            fetchSubjectsByCategory(subjectCategory)
                .then((data) => {
                    setSubjects(data); // Update subjects with filtered list
                    setTopicData((prevData) => ({ ...prevData, subject_id: 0 })); // Reset selected subject
                })
                .catch((error) => {
                    toast.error('Failed to load subjects.');
                    console.error('Error fetching subjects:', error);
                });
        }
    }, [subjectCategory]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = parseInt(e.target.value);
        setSubjectCategory(selectedCategory); // Update category and trigger useEffect
    };

    const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTopicData((prevData) => ({
            ...prevData,
            [name]: name === "subject_id" ? parseInt(value) : value,
        }));

        // Fetch topics when a subject is selected
        if (value !== "0") {
            fetchTopicsBySubjectId(parseInt(value))
                .then((data) => {
                    setTopics(data); // Update topics with filtered list
                    setTopicData((prevData) => ({ ...prevData, id: 0 })); // Reset selected topic
                })
                .catch((error) => {
                    toast.error('Failed to load topics.');
                    console.error('Error fetching topics:', error);
                });
        }
    };

    const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTopicData((prevData) => ({
            ...prevData,
            [name]: name === "topic_id" ? parseInt(value) : value,
        }));
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            // Check file type (CSV or Excel)
            const fileType = selectedFile.type;
            if (
                fileType !== 'text/csv' &&
                fileType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
                fileType !== 'application/vnd.ms-excel'
            ) {
                toast.error('Please upload a valid CSV or Excel file.');
                setFile(null);
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            toast.error('Please select a file to upload.');
            return;
        }
        const target = event.target as typeof event.target & {
            subject_id: { value: string };
            topic_id: { value: string };
        };
        const subject_id = target.subject_id.value;
        const topic_id = target.topic_id.value;

        console.log(subject_id, topic_id);

        const formData = new FormData();
        formData.append('upload_file', file);
        formData.append('subject_id', subject_id);
        formData.append('topic_id', topic_id);

        const toastId = toast.loading('Uploading...');

        try {
            const response = await importQuestions(formData);
            toast.success(response || 'Uploaded Successfully!', { id: toastId });
            setFile(null); // Reset the file input after successful upload
        } catch (err) {
            handleRequestError(err, toastId);
        }
    };

    return (
        <>
            <div className="w-full flex flex-col justify-between items-start gap-5 flex-wrap">
                <form onSubmit={handleSubmit} className="w-80p flex flex-col gap-5 relative bg-white rounded-xs p-5 shadow-md">
                    <h3 className='text-primary font-bold text-center'>Import Questions</h3>
                    <h4 className='text-red-800'>CSV or Excel File Allowed</h4>
                    <select
                        className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
                        name="subject_category"
                        id="subjectCategory"
                        value={subjectCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value={0}>Select Category of Subjects</option>
                        <option value={1}>Common Entrance</option>
                        <option value={2}>Junior WAEC</option>
                        <option value={3}>Senior WAEC</option>
                    </select>
                    <select
                        className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
                        name="subject_id"
                        id="subjectId"
                        value={topicData.subject_id}
                        onChange={handleSubjectChange}
                        required
                    >
                        <option value={0}>Select Subject</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-3-quarts h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm"
                        name="topic_id"
                        id="topicId"
                        value={topicData.topic_id}
                        onChange={handleTopicChange}
                        required
                    >
                        <option value={0}>Select Topic</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div className="w-full h-4 flex items-center justify-between">
                        <input type="file" name="subjects"
                            className="w-70p h-4 pl-1 border border-light-grey rounded-xs" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
                    </div>

                    <div className="w-full p-1 justify-end pr-1 items-center gap-10 inline-flex">
                        <div className="justify-start items-center gap-2 flex text-primary">
                            <button type='submit' className="flex items-center gap-5 p-10 border-none outline-none bg-primary bg-hover text-white rounded-sm cursor-pointer transition-all" style={{ "--bgHoverColor": "var(--infoColor)" } as React.CSSProperties}>
                                <UploadIcon />Upload
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster />
        </>
    );
};

export default UploadQuestions;
