import React,{useState} from 'react'
import TailorExistingResume from './TailorExistingResume';

function ResumeSelection() {
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
        <TailorExistingResume handleFileUpload={handleFileUpload} uploadedFile={uploadedFile} resumeContent={resumeContent} setResumeContent={setResumeContent}/>
    )}
    <button
      className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
      onClick={() => alert('High ATS Resume is being generated!')}
    >
      Generate High ATS Resume
    </button>
  </div>
  )
}

export default ResumeSelection