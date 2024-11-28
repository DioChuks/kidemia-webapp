import React, { useState } from 'react';
import { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UploadIcon from '../../../components/icons/Upload';
import { importSubjects } from '../../../lib/admin/api-subjects';

const UploadSubjects: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

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
      category_id: { value: string };
    };
    const category_id = target.category_id.value;

    const formData = new FormData();
    formData.append('upload_file', file);
    formData.append('category_id', category_id);

    const toastId = toast.loading('Uploading...');

    try {
      const response = await importSubjects(formData);
      toast.success(response || 'Uploaded Successfully!', { id: toastId });
      setFile(null); // Reset the file input after successful upload
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'An error occurred while uploading the file.', { id: toastId });
      }
      toast.error('Error occurred!', { id: toastId });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between items-start gap-5 flex-wrap">
        <form onSubmit={handleSubmit} className="w-80p flex flex-col gap-5 relative bg-white rounded-xs p-5 shadow-md">
          <h3 className='text-primary font-bold text-center'>Import Subjects</h3>
          <h4 className='text-red-800'>CSV or Excel File Allowed</h4>
          <select className="w-70p h-4 pl-1 bg-primary-grad2 border-none outline-none rounded-sm" name="category_id" id="subjectCategory" required>
            <option value={0}>Category of subject</option>
            <option value={1}>Common Entrance</option>
            <option value={2}>Junior WAEC</option>
            <option value={3}>Senior WAEC</option>
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

export default UploadSubjects;
