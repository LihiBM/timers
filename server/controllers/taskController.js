const Timer = require('../models/timer')
const {getRunTime, getDelay, getSecondsLeft} = require('../taskActions/delayUtils');
const {registerTask} = require('../taskActions/taskRegistration');
const {logger} = require('../../utils/logger');

setTimer = (req, res) => {
    const body = req.body;

    if (!body) {
        logger.error('Bad request, no timer data');
        return res.status(400).json({
            success: false,
            error: 'Please provide timer data',
        });
    }

    if ((body.hours && isNaN(body.hours))
        || (body.minute && isNaN(body.minutes))
        || (body.seconds && isNaN(body.seconds))) {
        logger.error('Bad request, invalid timer data');
        return res.status(400).json({
            success: false,
            error: 'Please provide valid timer data',
        });
    }

    const delayParams = {
        hours: body.hours || 0,
        minutes: body.minutes || 0,
        seconds: body.seconds || 0
    }
    const delay = getDelay(delayParams.hours, delayParams.minutes, delayParams.seconds);

    const taskObj = {
        runAtTime: getRunTime(delay),
        url: body.url || '',
        timeOfCompletion: 0
    }
    const timer = new Timer(taskObj);
    let timerUrl;

    try {
        const id = timer._id.toString();
        timerUrl = new URL(`${taskObj.url}/${id}`);
    } catch (e) {
        logger.error({e, timerUrl}, 'invalid url');
        return res.status(400).json({
            message: 'Invalid url',
        })
    }

    if (!timer) {
        return res.status(400).json({ success: false, error: err })
    } else {
        registerTask(timerUrl, delay);
    }

    logger.info({timer}, 'timer registered');

    timer
        .save()
        .then(() => {
            return res.status(201).json({
                id: timer._id,
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Timer not set',
            })
        })
}

getTimerById = async (req, res) => {
    await Timer.findOne({ _id: req.params.id }, (err, timer) => {
        if (err || !timer) {
            return res
                .status(400)
                .json({ success: false, msg: 'timer not found' })
        }

        const timerResObj = {
            time_left: getSecondsLeft(timer.runAtTime),
            id: timer._id
        }
        return res.status(200).json(timerResObj)
    }).clone().catch(err => {
        logger.error({err}, 'timer not found')
    })
}

getAllTimers = async (req, res) => {
    await Timer.find({}, (err, timers) => {
        if (err || !timers.length) {
            return res
                .status(400)
                .json({ success: false, msg: 'no timers found' })
        }
        return res.status(200).json({ success: true, data: timers })
    }).clone().catch(err => console.log(err))
}

module.exports = {
    setTimer,
    getTimerById,
    getAllTimers
}
