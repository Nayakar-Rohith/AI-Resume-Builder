const User = require('./users.mongo');

// Save or Update a User
async function saveOrUpdateUser(userData) {
    return await User.findOneAndUpdate(
        { email: userData.email }, // Match by email
        { $set: userData },       // Update or set fields
        { upsert: true, new: true } // Create if not exists
    );
}

// Fetch User by Email
async function getUserByEmail(email) {
    return await User.findOne({ email });
}

// Fetch All Users
async function getAllUsers(skip = 0, limit = 10) {
    return await User.find({})
        .skip(skip)
        .limit(limit);
}

// Increment Resume Optimization Count
async function incrementResumeOptimizations(email) {
    return await User.findOneAndUpdate(
        { email },
        { $inc: { resumeOptimizations: 1 } },
        { new: true }
    );
}

// Delete User
async function deleteUser(email) {
    return await User.findOneAndDelete({ email });
}

module.exports = {
    saveOrUpdateUser,
    getUserByEmail,
    getAllUsers,
    incrementResumeOptimizations,
    deleteUser,
};
