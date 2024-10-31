import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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
    <div>
      <h1>Upload CSV or Excel File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <Toaster/>
    </div>
  );
};

export default UploadSubjects;
