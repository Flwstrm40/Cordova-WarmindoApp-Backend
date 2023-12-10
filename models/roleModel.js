const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    id_role: { type: String, required: true, unique: true },
    role: String,
    status: { type: String, enum: ['aktif', 'tidak'] },
});

module.exports = mongoose.model('Role', roleSchema);