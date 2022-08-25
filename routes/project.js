const express = require('express');
const router = express.Router();
const passport = require('passport');
const projectController = require('../controllers/project_controller');

router.get('/', projectController.project);
router.post('/create', projectController.create);
router.get('/:id', projectController.projectIssues);

module.exports = router;