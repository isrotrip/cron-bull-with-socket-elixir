"use strict"

// 1. coba jalankan kata hallo setiap detik menggunakan cron
// 2. coba jalankan kata hallo setiap 3 detik menggunakan cron sebanyak 10 kali

const { CronJob } = require('cron');

const job = new CronJob('*/1 * * * * *', function() {
  console.log('hallo');

  // hint gunakan job.stop();
}, null, false, 'Asia/Jakarta');

job.start();