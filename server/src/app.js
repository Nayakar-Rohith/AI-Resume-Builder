const express=require('express');
const api=require('../routes/api')
const app=express();
const helmet=require('helmet');
const passport=require('passport');
const {Strategy}=require('passport-google-oauth20')
const cookieSession=require('cookie-session');
const cors=require('cors');

require('dotenv').config()

const config={
    CLIENT_ID:process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET,
    COOKIE_KEY_1:process.env.COOKIE_KEY_1,
    COOKIE_KEY_2:process.env.COOKIE_KEY_2,
}
app.use(helmet());
app.use(cookieSession({
    name:'session',
    maxAge:24*60*60*1000,
    keys:[config.COOKIE_KEY_1,config.COOKIE_KEY_2]
}))
passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((obj,done)=>{
    done(null,obj);
})
app.use(passport.initialize());
app.use(passport.session())
app.use(
    cors({
      origin: 'https://localhost:3000', // Frontend URL
      methods: ['GET', 'POST'], // Allow methods you use
      credentials: true, // Include cookies if needed
    })
  );

function verifyCallback(accessToken, refreshToken, profile, done){
    console.log('Google Profile', profile);
    done(null,profile);
}
passport.use(new Strategy({
    callbackURL:'/auth/google/callback',
    clientID:config.CLIENT_ID,
    clientSecret:config.CLIENT_SECRET
},verifyCallback))

function authenticateUser(req,res,next){
    let loggedin=req.user && req.isAuthenticated();
    if(!loggedin){
        res.status(401).json({
            "Error": "User is not logged in...."
        })
    }
    next();
}
app.get('/auth/google',passport.authenticate('google',{
    scope:['email']
}))
app.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:'/login_failure',
    successRedirect:'https://localhost:3000',
    session:true,
}),(req,res)=>{
    console.log('Google called us back!!!!!')
});
app.get('/auth/logout',(req,res)=>{
    req.logout();
    return res.redirect('https://localhost:3000');
})
app.get('/login_failure',(req,res)=>{
    console.log('Failed to login...........')
})
app.use(express.json());

app.use('/v1',authenticateUser,api)

module.exports=app;