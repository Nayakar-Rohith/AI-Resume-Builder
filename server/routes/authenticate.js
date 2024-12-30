const express=require('express');

const auth=express.Router();

function authenticateUser(req,res,next){
    let loggedin=true;
    if(!loggedin){
        res.status(401).json({
            "Error": "User is not logged in...."
        })
    }
    next();
}
auth.get('/auth/google',authenticateUser,(req,res)=>{

})


module.export=auth;