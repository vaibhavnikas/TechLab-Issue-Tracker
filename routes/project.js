const express = require('express');
const router = express.Router();
const passport = require('passport');
const projectController = require('../controllers/project_controller');

router.get('/', projectController.displayCreateProjectForm);
router.post('/create', projectController.create);
router.get('/:projectId', projectController.projectIssues);
router.get('/delete/:projectId', projectController.delete);

router.use('/issue', require('./issue'));

module.exports = router;