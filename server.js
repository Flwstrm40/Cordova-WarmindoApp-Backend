const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Role = require('./models/roleModel');
const Warung = require('./models/warungModel');
const Transaksi = require('./models/transactionModel');
const bcrypt = require('bcryptjs');
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

        const role = await Role.findOne({ id_role: user.id_role });

        // Jika login berhasil, kirim data user beserta rolenya
        res.status(200).json({ user: { ...user.toObject(), role } });
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
// Create user
app.post('/user', async (req, res) => {
    try {
        const { id_role } = req.body;

        // Check if the specified role exists
        const roleExists = await Role.exists({ id_role });

        if (!roleExists) {
            return res.status(400).json({ message: 'Role does not exist' });
        }

        const user = await User.create(req.body);
        res.status(200).json({ user });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// update user
// Update user
app.put('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { id_role } = req.body;

        // Check if the specified role exists
        const roleExists = await Role.exists({ id_role });

        if (!roleExists) {
            return res.status(400).json({ message: 'Role does not exist' });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// delete user
app.delete('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json({ user: deletedUser });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

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
app.put('/role/:id', async (req, res) => {
    try {
        const roleId = req.params.id;
        const updatedRole = await Role.findByIdAndUpdate(roleId, req.body, { new: true });
        res.status(200).json({ role: updatedRole });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// delete role
app.delete('/role/:id', async (req, res) => {
    try {
        const roleId = req.params.id;
        // Delete the role and find associated users to delete them as well
        const deletedRole = await Role.findByIdAndDelete(roleId);
        await User.deleteMany({ id_role: roleId });
        res.status(200).json({ role: deletedRole });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});



// ------------------------------------------ CRUD WARUNG ----------------------------------------

// Read all warung
app.get('/warung', async (req, res) => {
    try {
        const warung = await Warung.find({});
        res.status(200).json({ warung });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get total number of warung
app.get('/total_warung', async (req, res) => {
    try {
        const total_warung = await Warung.countDocuments({});
        res.status(200).json({ total_warung });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Create warung
app.post('/warung', async (req, res) => {
    try {
        const warung = await Warung.create(req.body);
        res.status(200).json({ warung });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Update warung
app.put('/warung/:id', async (req, res) => {
    try {
        const warungId = req.params.id;
        const updatedWarung = await Warung.findByIdAndUpdate(warungId, req.body, { new: true });
        res.status(200).json({ warung: updatedWarung });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Delete warung
app.delete('/warung/:id', async (req, res) => {
    try {
        const warungId = req.params.id;
        const deletedWarung = await Warung.findByIdAndDelete(warungId);
        res.status(200).json({ warung: deletedWarung });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// ---------------------------------------- CRUD TRANSAKSI ----------------------------------------

// Read all transaksi
app.get('/transaksi', async (req, res) => {
    try {
        const transaksi = await Transaksi.find({});
        res.status(200).json({ transaksi });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get total number of transaksi
app.get('/total_transaksi', async (req, res) => {
    try {
        const total_transaksi = await Transaksi.countDocuments({});
        res.status(200).json({ total_transaksi });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Create transaksi
app.post('/transaksi', async (req, res) => {
    try {
        const transaksi = await Transaksi.create(req.body);
        res.status(200).json({ transaksi });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Update transaksi
app.put('/transaksi/:id', async (req, res) => {
    try {
        const transaksiId = req.params.id;
        const updatedTransaksi = await Transaksi.findByIdAndUpdate(transaksiId, req.body, { new: true });
        res.status(200).json({ transaksi: updatedTransaksi });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Delete transaksi
app.delete('/transaksi/:id', async (req, res) => {
    try {
        const transaksiId = req.params.id;
        const deletedTransaksi = await Transaksi.findByIdAndDelete(transaksiId);
        res.status(200).json({ transaksi: deletedTransaksi });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


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