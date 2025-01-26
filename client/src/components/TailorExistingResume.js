import React from 'react'

function TailorExistingResume(props) {
const { handleFileUpload, uploadedFile, resumeContent, setResumeContent } = props;
  return (
    <div>
    <label className="block font-semibold mb-2">Upload Resume:</label>
    <input
      type="file"
      value={uploadedFile}
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
  )
}

export default TailorExistingResume