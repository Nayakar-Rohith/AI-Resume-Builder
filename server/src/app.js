const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const cors = require('cors');
const api = require('../routes/api');
const UserModel=require('../models/users/users.mongo')
const path=require('path')
require('dotenv').config();

const app = express();

// Configuration object
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

// 1. Security Middleware (should come first)
app.use(helmet());

// 2. Parse JSON bodies (before any routes that need it)
app.use(express.json());

// 3. Session configuration (before passport)
app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
    secure: false,
    // sameSite:'none'
}));

// 4. Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(async (user, done) => {
    try {
        // Check if the user exists in the database
        let existingUser = await UserModel.findOne({ _id: user._json.sub }); // Use sub as the unique ID
        if (!existingUser) {
            // Create a new user if they don't exist
            const newUser = new UserModel({
                _id: user._json.sub, // Set _id to sub
                email: user._json.email,
                name: user._json.name || '',
                resumeOptimizations: 0, // Initialize to 0
            });
            existingUser = await newUser.save();
        }
        done(null, existingUser._id); // Serialize the user's ID
    } catch (error) {
        done(error, null);
    }
});

passport.deserializeUser(async (id, done) => {
    try {
        // Fetch the user by _id from the database
        const user = await UserModel.findById(id); // Use id directly
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google Profile', profile);
    done(null, profile);
}

passport.use(new Strategy({
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}, verifyCallback));

// 6. CORS configuration (before routes)
app.use(cors({
    origin: ['https://localhost:3000', 'http://localhost:3000', 'http://localhost:4000'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

// 7. Authentication middleware
function authenticateUser(req, res, next) {
    const loggedin = req.user && req.isAuthenticated();
    if (!loggedin) {
        return res.status(401).json({
            "Error": "User is not logged in...."
        });
    }
    next();
}

// 8. Auth routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['email']
}));


app.get('/auth/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/login_failure',
        session: true,
    }), 
    (req, res) => {
        if (!req.user) {
            return res.redirect('/login_failure');
        }
        res.redirect('https://localhost:4000');
    }
);

app.get('/auth/logout', (req, res) => {
    req.session = null;  // Destroy the session
    console.log('logout initiated out');
    req.logout((err) => {
        console.log('Error logging out', err);
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }
    });
    res.redirect('https://localhost:4000');

});

app.get('/login_failure', (req, res) => {
    console.log('Failed to login...........');
});

app.get('/v1/login_status', (req, res) => {
    console.log("req.isAuthenticated()", req.isAuthenticated());
    console.log("req.session", req.session);
    console.log("req.body", req.body);
    
    if (req.isAuthenticated() && req.user) {
        return res.status(200).json({
            authenticated: true,
            user: req.user,
        });
    }
    
    res.status(200).json({
        authenticated: false,
        user: null
    });
});

// 9. Protected API routes (should come last)
// app.use('/v1', authenticateUser, api);
app.use('/v1', api);
// Serve static files from the React build
const publicPath = path.join(__dirname,'..', 'public');
app.use(express.static(publicPath));

// Catch-all handler to serve React's index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
module.exports = app;