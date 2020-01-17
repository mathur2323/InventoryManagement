const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const user = require('./routes/api/user');
const login = require('./routes/api/login');
const category = require('./routes/api/categories');
const product = require('./routes/api/product');
const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
.connect(db)
.then(()=>{
    console.log('Connected..!')
})
.catch((err)=>{
    console.log('Error in connecting', err)
})

app.use('/api/items', items);
app.use('/api/signup', user);
app.use('/api/login', login);
app.use('/api/category', category);
app.use('/api/product', product);

const PORT = process.env.PORT || 5000;

app.listen(PORT);