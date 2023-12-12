const mongoose = require('mongoose');

const warungSchema = new mongoose.Schema({
  id_warung: { type: String, required: true },
  nama_warung: String,
  lokasi: String,
  logo: String,
  gambar: String,
});

module.exports = mongoose.model('Warung', warungSchema);
