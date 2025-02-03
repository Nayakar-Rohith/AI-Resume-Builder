import React, { useState } from 'react';
import TailorExistingResume from './TailorExistingResume';
import axios from 'axios';

function ResumeSelection() {
    const [resumeType, setResumeType] = useState('new');
    const [resumeContent, setResumeContent] = useState('');

    const handleResumeTypeChange = (event) => {
        setResumeType(event.target.value);
        setResumeContent('');
    };

    const handleResumeGeneration = async () => {
      try {
          const response = await axios.post('v1/resume/download_resume', {}, {
              responseType: 'blob', // Ensure the response is treated as a Blob
          });
  
          // Log the response to verify its content
          console.log('Response Data:', response.data);
  
          // Create a downloadable link for the PDF
          const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'resume.pdf'); // Set the filename for the download
          document.body.appendChild(link);
          link.click(); // Trigger the download
          document.body.removeChild(link); // Clean up
          window.URL.revokeObjectURL(url); // Free up memory
      } catch (error) {
          console.error('Error downloading the PDF:', error);
      }
  };

    return (
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
                <TailorExistingResume resumeContent={resumeContent} setResumeContent={setResumeContent} />
            )}
            <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                onClick={handleResumeGeneration}
            >
                Generate High ATS Resume
            </button>
        </div>
    );
}

export default ResumeSelection;