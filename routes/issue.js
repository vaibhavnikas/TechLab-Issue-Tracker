const express = require('express');
const router = express.Router();
const passport = require('passport');
const issueController = require('../controllers/issue_controller');


router.get('/:projectId', issueController.displayCreateIssueForm);
router.post('/create/:projectId', issueController.create);
router.post('/search/:projectId', issueController.search);
router.get('/delete/:issueId', issueController.delete);

module.exports = router;