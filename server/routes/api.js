const express=require('express');
const resumeRouter = require('./resume/resume.router');
const usersRouter = require('./users/users.router');

const api=express.Router();

api.use('/optimised_resume',resumeRouter)
api.use('/users',usersRouter)

module.exports=api;