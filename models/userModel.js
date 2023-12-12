const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        id_pengguna: {
            type: String,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: false,
            default: 'warmindo'
        },
        nama_pengguna: {
            type: String,
            required: true
        },
        id_role: {
            type: String,
            // enum: ['E1', 'E2', 'E3', 'E4'],
            required: true,
            ref: 'Role'
        },
        status: {
            type: String,
            enum: ['aktif', 'tidak aktif'],
            default: 'aktif'
        },
        foto: {
            type: String,  // URL gambar atau path file
            required: false
        }
    }
);


// Middleware untuk mengenkripsi password sebelum menyimpan user
userSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
