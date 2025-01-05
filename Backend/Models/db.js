const mongoose = require('mongoose');
require('dotenv').config();
const create = process.env.MONGODB_URI;

mongoose.connect(create)
.then(()=>{
    console.log('MongoDB conneted...');

}).catch((err)=>{
console.log('MongoDB Connection ERROR:', err);
})


