const express=require('express');
const resumeRouter = require('./resume/resume.router');

const api=express.Router();

api.use('/answer',resumeRouter)

module.exports=api;