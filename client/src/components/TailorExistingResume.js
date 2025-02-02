import React, { useState } from 'react';

function TailorExistingResume(props) {
  const { resumeContent, setResumeContent } = props;
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const extractResumeContent = async (resume) => {
    
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx'].includes(fileExt)) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setUploadedFile(file);
    setError('');
    setLoading(true);
    //Resume content extraction
    extractResumeContent(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/v1/resume', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to process resume');
      }

      setResumeContent(JSON.stringify(result.data, null, 2));
      setError('');
    } catch (error) {
      console.error('Error processing file:', error);
      setError('Error processing file: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-2">Upload Resume:</label>
        <input
          type="file"
          accept=".pdf,.docx"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                   file:rounded-full file:border-0 file:text-sm file:font-semibold 
                   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          onChange={handleFileUpload}
          disabled={loading}
        />
        <p className="mt-1 text-xs text-gray-500">
          Supports PDF and DOCX (max 5MB)
        </p>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {loading && (
        <p className="text-gray-600 text-sm">Processing...</p>
      )}

      {uploadedFile && !error && (
        <p className="text-sm text-gray-600">
          Selected file: {uploadedFile.name}
        </p>
      )}

      <div>
        <label className="block font-semibold mb-2">
          Or Paste Resume Content:
        </label>
        <textarea
          className="w-full h-40 p-2 border rounded-lg" 
          placeholder="Paste your resume content here..."
          value={resumeContent}
          onChange={(e) => setResumeContent(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export default TailorExistingResume;