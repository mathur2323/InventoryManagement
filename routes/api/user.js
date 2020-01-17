const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./../../models/User');
const jwt = require('jsonwebtoken')
const jwtSecretKey = require('./../../config/keys').jwtSecreyKey;

router.post('/', (req, res) => {
    const { email, password, country } = req.body;
    if (!email || !password || !country)
        return res.status(400).json({ msg: 'Please enter all fields' })

    User.findOne({ email })
        .then(user => {
            if (user)
                return res.status(400).json({ msg: 'User already exists!' })

            const newUser = new User({
                email,
                password,
                country
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                jwtSecretKey,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token
                                    })
                                })
                        });
                })
            })
        })
})

module.exports = router