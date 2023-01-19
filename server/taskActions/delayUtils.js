
const getDelay = (hrs,min,sec) => {
    return (hrs*60*60+min*60+sec)*1000;
}

const getRunTime = (delay) => {
    const now = new Date();
    return new Date(now.getTime() + delay).getTime();
}

const getSecondsLeft = (runTime) => {
    const run = new Date(runTime);
    const now = new Date();
    let timeLeftInMilliseconds = new Date(run.getTime() - now.getTime());
    return timeLeftInMilliseconds>0 ? Math.round(timeLeftInMilliseconds / 1000) : 0;
}

module.exports = {
    getRunTime,
    getDelay,
    getSecondsLeft
};