const express=require('express');
const {getResumeController,downloadResumeController}=require('./resume.controller')
const resumeRouter=express.Router();

resumeRouter.post('/',getResumeController)
resumeRouter.post('/download_resume',downloadResumeController)

module.exports=resumeRouter;