const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URL, PORT } = require('./config');
const cors = require('cors');
const productRoutes = require('./controllers/productController')
const app = express();


app.use(cors());



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