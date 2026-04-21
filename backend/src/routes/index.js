const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const statusController = require('../controllers/statusController');
const githubController = require('../controllers/githubController');
const blogController = require('../controllers/blogController');

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Contact Route
router.post('/contact', contactController.handleContact);

// Live Status Routes
router.get('/status', statusController.getStatus);
router.post('/status', statusController.updateStatus);

// GitHub Proxy
router.get('/github/stats/:username', githubController.getUserStats);
router.get('/github/repos/:username', githubController.getTopRepos);

// Blog / Knowledge Hub
router.get('/blog', blogController.getAllPosts);

module.exports = router;
