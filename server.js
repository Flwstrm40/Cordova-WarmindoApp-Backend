const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Role = require('./models/roleModel');
const Warung = require('./models/warungModel');
const Transaksi = require('./models/transactionModel');
const bcrypt = require('bcrypt');
const cors = require('cors'); 
const app = express();


app.use(express.json())
app.use(cors({
    origin: '*',  // Ganti dengan origin yang sesuai
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// routes

// ---------------------------------------- HOME ----------------------------------------
app.get('/', (req, res) => {
    res.send('Selamat datang di proyek Express.js dengan MongoDB!!!!');
})
app.get('/blog', (req, res) => {
    res.send('halo ini blog');
})


// ---------------------------------------- LOGIN ----------------------------------------
// Endpoint untuk login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Jika login berhasil, kirim data user yang berhasil login
        res.status(200).json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ---------------------------------------- CRUD USER ----------------------------------------
// Read all user
app.get('/user', async(req, res) => {
    try{
        const user = await User.find({});
        res.status(200).json({user});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})
// Create user
app.post('/user', async(req, res) =>{
    try{
        const user = await User.create(req.body);
        res.status(200).json({user});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})
// update user

// delete user

// ---------------------------------------- CRUD ROLE ----------------------------------------
// Read all role
app.get('/role', async(req, res) => {
    try{
        const user = await Role.find({});
        res.status(200).json({user});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})
// Create role
app.post('/role', async(req, res) =>{
    try{
        const user = await Role.create(req.body);
        res.status(200).json({user});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})
// update role

// delete role




mongoose.set("strictQuery", false);
mongoose
.connect('mongodb+srv://flwstrm:Vanitas_40@cluster0.he7vqbb.mongodb.net/node-API?retryWrites=true&w=majority')
.then(async () => {
    // Update existing documents with null id_pengguna
    await User.updateMany({ id_pengguna: null }, { id_pengguna: 'someUniqueValue' });
    // Drop the index on id_pengguna
    await User.collection.dropIndex("id_pengguna_1");
    // Recreate the unique index on id_pengguna
    await User.collection.createIndex({ id_pengguna: 1 }, { unique: true });


    app.listen(3000, () => {
        console.log('Server berjalan di http://localhost:3000')
    });
    console.log('Connected to mongoDB!');
}).catch(() => {
    console.log(error);
})