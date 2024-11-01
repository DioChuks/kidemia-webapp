import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UploadIcon from '../../../components/icons/Upload';

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

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/admin/subjects/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message || 'Uploaded Successfully!');
      setFile(null); // Reset the file input after successful upload
    } catch (err) {
        if (err instanceof AxiosError) {
            toast.error(err.response?.data?.message || 'An error occurred while uploading the file.');
        }
        toast.error('Error occurred!');
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between items-start gap-5 flex-wrap">
        <form onSubmit={handleSubmit} className="w-80p flex flex-col gap-5 relative bg-white rounded-xs p-5 shadow-md">
          <h4>CSV or Excel File Allowed</h4>
          <div className="w-full h-4 flex items-center justify-between">
              <input type="file" name="subjects"
              className="w-70p h-4 pl-1 border border-light-grey rounded-xs" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
          </div>

          <div className="w-full p-1 justify-end pr-1 items-center gap-10 inline-flex">
              <div className="justify-start items-center gap-2 flex text-primary">
              <button type='submit' className="flex items-center gap-5 p-10 border-none outline-none bg-primary bg-hover text-white rounded-sm cursor-pointer transition-all" style={{"--bgHoverColor":"var(--infoColor)"} as React.CSSProperties}>
                <UploadIcon/>Upload
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster/>
    </>
  );
};

export default UploadSubjects;
