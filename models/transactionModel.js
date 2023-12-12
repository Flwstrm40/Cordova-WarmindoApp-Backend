const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
  id_transaksi: { type: String, required: true, unique: true},
  tanggal: Date,
  waktu: String,
  shift: { type: Number, enum: [1, 2] },
  id_pengguna: { type: String, ref: 'Pengguna' },
  id_pelanggan: { type: String, default: null },
  status: { type: String, enum: ['baru', 'diproses', 'disajikan', 'selesai'] },
  kode_meja: String,
  nama_pelanggan: String,
  total: Number,
  metode_pembayaran: { type: String, enum: ['cash', 'kartu debit', 'kartu kredit', 'qris'] },
  total_diskon: Number,
  id_promosi: { type: String, ref: 'Promosi', default: null },
});

module.exports = mongoose.model('Transaksi', transaksiSchema);
