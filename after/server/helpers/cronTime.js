'use strict';

const CronJob = require('cron').CronJob;
const moment = require('moment-timezone');

module.exports = (inputTime, work) => {
  let jakarta = moment.tz(inputTime, 'Asia/Jakarta');
  const job = new CronJob(jakarta, () => {
    work(new Date());
    job.stop();
  }, null, true, 'Asia/Jakarta');

  job.start();
};