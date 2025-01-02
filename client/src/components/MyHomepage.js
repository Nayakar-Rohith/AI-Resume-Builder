import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; 

const Myhomepage = () => {
  const [resumeType, setResumeType] = useState('new');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resumeContent, setResumeContent] = useState('');

  const handleResumeTypeChange = (event) => {
    setResumeType(event.target.value);
    setUploadedFile(null);
    setResumeContent('');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold">My App</h1>
        <button
          onClick={() => (window.location.href = 'https://localhost:4000/auth/logout')}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Welcome to My App</h2>
        <div className="grid grid-cols-3 gap-6">
          <textarea
            className="col-span-2 p-4 w-full h-96 border rounded-lg"
            placeholder="Write the job description here..."
          ></textarea>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Resume Options:</label>
              <div className="space-y-2 mt-2">
                <label className="block">
                  <input
                    type="radio"
                    name="resumeType"
                    value="new"
                    checked={resumeType === 'new'}
                    onChange={handleResumeTypeChange}
                  />
                  <span className="ml-2">Create a New Resume</span>
                </label>
                <label className="block">
                  <input
                    type="radio"
                    name="resumeType"
                    value="existing"
                    checked={resumeType === 'existing'}
                    onChange={handleResumeTypeChange}
                  />
                  <span className="ml-2">Tailor Existing Resume</span>
                </label>
              </div>
            </div>
            {resumeType === 'existing' && (
              <div>
                <label className="block font-semibold mb-2">Upload Resume:</label>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 border rounded-lg"
                  onChange={handleFileUpload}
                />
                <label className="block font-semibold mt-4">Or Paste Resume Content:</label>
                <textarea
                  className="mt-2 p-2 w-full h-40 border rounded-lg"
                  placeholder="Paste your resume content here..."
                  value={resumeContent}
                  onChange={(e) => setResumeContent(e.target.value)}
                ></textarea>
              </div>
            )}
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
              onClick={() => alert('High ATS Resume is being generated!')}
            >
              Generate High ATS Resume
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Myhomepage;
