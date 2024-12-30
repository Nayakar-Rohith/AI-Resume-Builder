const express=require('express');
const api=require('../routes/api')
const app=express();
const helmet=require('helmet');

function authenticateUser(req,res,next){
    let loggedin=true;
    if(!loggedin){
        res.status(401).json({
            "Error": "User is not logged in...."
        })
    }
    next();
}
app.get('/auth/google',(req,res)=>{

})
app.get('/auth/google/callback',(req,res)=>{

})
app.get('/auth/logout',(req,res)=>{

})
app.use(express.json());
app.use(helmet());
app.use('/v1',authenticateUser,api)

module.exports=app;