const express=require('express');
const {getResumeController}=require('./resume.controller')
const resumeRouter=express.Router();

resumeRouter.post('/',getResumeController)

module.exports=resumeRouter;