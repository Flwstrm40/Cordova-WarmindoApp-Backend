const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000; // Port bisa disesuaikan

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost/nama-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi MongoDB gagal:'));
db.once('open', function() {
  console.log('Terhubung ke MongoDB');
});

app.get('/', (req, res) => {
  res.send('Selamat datang di proyek Express.js dengan MongoDB!');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
