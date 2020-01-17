const express = require('express');
const router = express.Router();
const User = require('./../../models/User');
const Product = require('./../../models/Product');

router.post('/', (req, res) => {
    const {userUuid, product: {title, quantity, category}} = req.body;
    User.findById({ _id: userUuid })
    .then(user => {
        const newProduct = new Product({
            userUuid,
            products: [product]
        })
        newProduct.save()
        Product.findOneAndUpdate({ userUuid }, {$push: {product}}, {
            new: true,
            upsert: true
        })
        .then(resp => res.json(resp))
        .catch(err => res.status(400).json("Error"))
    })
    .catch(err => res.status(400).json({msg:"User does not exist" , err}))
})

module.exports = router