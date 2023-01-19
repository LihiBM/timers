const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db')
const taskRouter = require('./routes/taskRouter')
const { registerAllScheduledTasks } = require('./taskActions/taskRegistration');
const { logger } = require('../utils/logger.js');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use('/', taskRouter);

db.on('error', logger.error.bind({console}, 'MongoDB connection error'))
app.listen(apiPort, () => {
    registerAllScheduledTasks();
    logger.info(`Server running on port ${apiPort}`);
});
