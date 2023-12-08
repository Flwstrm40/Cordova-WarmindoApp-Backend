const express = require('express');
const app = express();
// const mongoose = require('mongoose');


// routes

app.get('/', (req, res) => {
    res.send('Selamat datang di proyek Express.js dengan MongoDB!');
})

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000, silahkan buka di browser!!!')
});