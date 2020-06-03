'use strict';

const CronJob = require('cron').CronJob;

module.exports = (work) => {
  const job = new CronJob('*/3 * * * * *', () => {
    work(new Date());
  }, null, true, 'Asia/Jakarta');

  job.start();
};