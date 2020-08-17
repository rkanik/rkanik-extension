/**
 * @param {number} time - How much time have to sleep
 * @param {string} unit - Unit of time ['s'-seconds,'m'-minute,'h'-houre]
 */
export const sleep = (time, unit) => new Promise((resolve) => {
    const ms = unit === 's' ? time * 1000 : unit === 'm' ? time * 60 * 1000 : unit === 'h' ? time * 60 * 60 * 1000 : time;
    setTimeout(() => resolve(), ms);
});

export const ms = {
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    month: 2592000000,
    year: 31536000000,
};

export const miniId = (len = 3) => 'rk-' + Math.random().toString(36).slice(len < 1 ? 1 : len <= 10 ? -len : -10);
