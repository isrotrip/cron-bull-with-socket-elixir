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

// hint:
// buat template producers
// consumers => yang mendefinisikan process
// listeners => yang mendengerkan progress
// producers => yang berfungsi menambahkan job ke antrian
