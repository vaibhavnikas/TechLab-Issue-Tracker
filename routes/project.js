const express = require('express');
const router = express.Router();
const passport = require('passport');
const projectController = require('../controllers/project_controller');

router.get('/', projectController.createProjectForm);
router.post('/create', projectController.create);
router.get('/:projectId', projectController.projectIssues);
router.post('/create-issue/:projectId', projectController.createIssue);

module.exports = router;