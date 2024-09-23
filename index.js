const express = require('express');
const { default: mongoose } = require('mongoose');
const { MONGODB_URL, PORT } = require('./config');

const app = express();

mongoose.connect(MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log('Mongodb Connected Successfully'))
.catch(err => console.log(err))

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})