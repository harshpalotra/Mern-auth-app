const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./Models/db.js'); // Use `require` for importing
const AuthRouther = require('./Routes/AuthRouther.js')
const PORT = process.env.PORT || 8080;
const ProductRouther = require('./Routes/ProductRouther.js')

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors())

app.use('/auth', AuthRouther);
app.use('/Product',ProductRouther)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
