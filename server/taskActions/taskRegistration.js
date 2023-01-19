const ScheduledTask = require('../models/timer');
const {logger} = require('../../utils/logger');
const {callUrl} = require('./taskInvokation');

/**
 * Description: registers all timers that are incomplete on this instance to be called when the timer elapses
 */
const registerAllScheduledTasks = () => {
    ScheduledTask.find({timeOfCompletion : 0}, (err, tasks) => {
        if (err) {
            logger.error({err}, 'Could not complete registration of previous timers');
        }
        if (!tasks.length) {
            logger.info(`No timers to register`);
        }

        for (const task in tasks) {
            logger.info({id:tasks[task]._id.toString()}, 'registering task upon startup');
            const now = new Date();
            const date = new Date(tasks[task].runAtTime);
            const delay = date - now;
            let url = new URL(tasks[task].url);
            url += `${tasks[task]._id.toString()}`;
            registerTask(url, delay);
        }
    });
}


/**
 * Description: registers a single task with the specified url and delay on this instance to be called
 * when the timer elapses
 */
const registerTask = (url, delay) => {
    logger.info({url, delay}, 'registering new timer');
    if (delay < 0) {
        callUrl(url.toString());
    } else {
        setTimeout(function () {
            callUrl(url.toString());
        }, delay);
    }
}

module.exports = {
    registerTask,
    registerAllScheduledTasks
};