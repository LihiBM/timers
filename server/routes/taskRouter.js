const express = require('express');

const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/timers', taskController.setTimer);
router.get('/timers/:id', taskController.getTimerById);
router.get('/timers', taskController.getAllTimers);

module.exports = router;