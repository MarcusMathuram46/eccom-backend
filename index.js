const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URL, PORT } = require('./config');
const cors = require('cors');
const productRoutes = require('./controllers/productController')
const app = express();


const corsOptions = {
    origin: 'http://localhost:5173', // Change this to the actual origin of your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust methods as necessary
    credentials: true // Allow cookies if needed
};

app.use(cors(corsOptions));

app.use(express.json())
app.use('/', productRoutes);

mongoose.connect(MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log('Mongodb Connected Successfully'))
.catch(err => console.log(err))


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})