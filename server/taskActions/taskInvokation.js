const {logger} = require("../../utils/logger");
const axios = require("axios");
const Timer = require("../models/timer");

const updateTimer = (timer, resourceId, updateValue) => {
    timer.timeOfCompletion = updateValue;
    timer
        .save()
        .then(() => {
            logger.info({resourceId}, 'Timer updated');
        })
        .catch(error => {
            logger.error({error, resourceId}, 'Failed to update timer');
        });
}

/**
 * @param {string} url  syntax: host/resourceID example: http://www.google.com/63c7c6715524c0e4a9ddad72"
 */
const callUrl = (url) => {
    const resourceId = url.substring(url.lastIndexOf('/')+1);
    const now = new Date();
    logger.info({resourceId, url}, 'calling url after the delay');

    axios.post(url)
        .then(function () {
            Timer.findOne({ _id: resourceId }, (err, timer) => {
                if (err) {
                    logger.error({resourceId}, 'Timer not found');
                }
                updateTimer(timer, resourceId, now);
            })
        })
        .catch(function (error) {
            logger.error({error, resourceId}, 'Couldn\'t call url');
            Timer.findOne({_id: resourceId}, (err, timer) => {
                updateTimer(timer, resourceId, -1);
            });
        })
}

module.exports = {
    callUrl
};