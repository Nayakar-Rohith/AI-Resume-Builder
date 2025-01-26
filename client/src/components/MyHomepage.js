import React from 'react';
import Header from './Header';
import JobDescription from './JobDescription';
import ResumeSelection from './ResumeSelection';

const Myhomepage = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header/>
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Welcome to My App</h2>
        <div className="grid grid-cols-3 gap-6">
        <JobDescription/>
        <ResumeSelection/>
        </div>
      </main>
    </div>
  );
};

export default Myhomepage;
