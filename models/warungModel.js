const mongoose = require('mongoose');

const warungSchema = new mongoose.Schema({
  idwarung: { type: mongoose.Schema.Types.ObjectId, required: true }, // Mengizinkan id diatur manual
  namawarung: String,
  logo: String,
  gambar: String,
});

module.exports = mongoose.model('Warung', warungSchema);
