const express = require('express');
const router = express.Router();
const passport = require('passport');
const projectController = require('../controllers/project_controller');

router.get('/', projectController.createProjectForm);
router.post('/create', projectController.create);
router.get('/:projectId', projectController.projectIssues);
router.get('/issue/:projectId', projectController.createIssueForm);
router.post('/issue/create/:projectId', projectController.createIssue);

router.post('/issue/search/:projectId', projectController.searchIssues);

module.exports = router;