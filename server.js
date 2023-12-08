const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
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

app.get('/', (req, res) => {
    res.send('Selamat datang di proyek Express.js dengan MongoDB!!!!');
})
app.get('/blog', (req, res) => {
    res.send('Blog!!! halo ini blog');
})

app.get('/user', async(req, res) => {
    try{
        const user = await User.find({});
        res.status(200).json({user});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

app.post('/user', async(req, res) =>{
    try{
        const user = await User.create(req.body);
        res.status(200).json({user});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})


mongoose.set("strictQuery", false);
mongoose
.connect('mongodb+srv://flwstrm:Vanitas_40@cluster0.he7vqbb.mongodb.net/node-API?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, () => {
        console.log('Server berjalan di http://localhost:3000')
    });
    console.log('Connected to mongoDB!');
}).catch(() => {
    console.log(error);
})