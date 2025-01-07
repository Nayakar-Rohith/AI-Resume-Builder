const express = require('express');
const {
    saveOrUpdateUser,
    getUserByEmail,
    getAllUsers,
    incrementResumeOptimizations,
    deleteUser,
} = require('../../models/users.model');

const router = express.Router();

// POST/PUT: Save or Update a User
router.post('/', async (req, res) => {
    try {
        const user = await saveOrUpdateUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET: Fetch User by Email
router.get('/:email', async (req, res) => {
    try {
        const user = await getUserByEmail(req.params.email);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET: Fetch All Users
router.get('/', async (req, res) => {
    const { skip, limit } = req.query;
    try {
        const users = await getAllUsers(parseInt(skip), parseInt(limit));
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PATCH: Increment Resume Optimization Count
router.patch('/:email/increment', async (req, res) => {
    try {
        const user = await incrementResumeOptimizations(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE: Delete User
router.delete('/:email', async (req, res) => {
    try {
        const user = await deleteUser(req.params.email);
        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
