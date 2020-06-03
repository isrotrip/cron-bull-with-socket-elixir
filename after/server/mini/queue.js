"use strict"

function miniNodeMailer(email) {
    return Promise.resolve(`Berhasil kirim email ke: ${email}`);
}

const listEmail = [
    'isro@mail.com',
    'arnold@mail.com',
    'adiel@mail.com',
    'iam@mail.com',
    'ziadi@mail.com'
]

// kasih rules limiter (max 10 dan duration 100000)
// buat consumers yang akan mengirim email menggunakan miniNodeMailer
// buat listener ketika berhasil
// buat producers ke seluruh listEmail

const Bull = require('bull')

const queueSend = new Bull('queue-send', {
    limiter: {
        max: 10,
        duration: 100000
    }
})

// consumers => yang mendefinisikan process
queueSend.process(function(job) {
    // logic nodemailer disini
    const email = job.data.email
    
    return miniNodeMailer(email);
})

// listeners => yang mendengerkan progress
queueSend.on('completed', function(job, result) {
    console.log(result)
})

// producers => yang berfungsi menambahkan job ke antrian
listEmail.forEach(email => {
    queueSend.add({
        email
    }, {
        attempts: 4, // percobaan sampe berhasil
        backoff: 2000// delay antar percobaan yang gagal
    })
})