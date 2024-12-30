const express=require('express');
const {getResumeController}=require('./resume.controller')
const resumeRouter=express.Router();

resumeRouter.get('/',getResumeController)

module.exports=resumeRouter;