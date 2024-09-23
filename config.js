require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

if(!MONGODB_URL){
    console.error("MONGODB is not defined in env")
}
module.exports={
    MONGODB_URL,
    PORT,
}