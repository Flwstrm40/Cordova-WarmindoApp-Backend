const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
  tanggal: Date,
  waktu: String,
  shift: { type: Number, enum: [1, 2] },
  idpengguna: { type: mongoose.Schema.Types.ObjectId, ref: 'Pengguna' },
  idpelanggan: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelanggan', default: null },
  status: { type: String, enum: ['baru', 'diproses', 'disajikan', 'selesai'] },
  kodemeja: String,
  namapelanggan: String,
  total: Number,
  metodepembayaran: { type: String, enum: ['cash', 'kartu debit', 'kartu kredit', 'qris'] },
  totaldiskon: Number,
  idpromosi: { type: mongoose.Schema.Types.ObjectId, ref: 'Promosi', default: null },
});

module.exports = mongoose.model('Transaksi', transaksiSchema);
