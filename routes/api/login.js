const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./../../models/User');
const jwt = require('jsonwebtoken')
const jwtSecretKey = require('./../../config/keys').jwtSecreyKey;
const auth = require('./../../middleware/auth');

router.post('/', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ msg: 'Please enter all fields' })

    User.findOne({ email })
        .then(user => {
            if (!user)
                return res.status(400).json({ msg: 'User does not exist' })

            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch)
                return res.status(400).json({ msg: 'Invalid credentials' })
                jwt.sign(
                    { id: user.id },
                    jwtSecretKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                email: user.email
                            }
                        })
                    })
            })
        })
})

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router