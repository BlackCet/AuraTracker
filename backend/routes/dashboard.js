const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/test', requireAuth, (req, res) => {
    res.json({ message: `Welcome to the dashboard, user ID: ${req.user._id}` });
});

module.exports = router;
