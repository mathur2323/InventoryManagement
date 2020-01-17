const express = require('express');
const router = express.Router();
const Category = require('./../../models/Category');
const User = require('./../../models/User');

router.post('/', (req, res) => {
    const { userUuid, categories } = req.body;
    User.findById({ _id: userUuid })
        .then(user => {
            Category.findOneAndUpdate({ userUuid }, { $push: { categories } }, {
                new: true,
                upsert: true
            })
                .then(resp => res.json(resp))
                .catch(err => res.status(400).json("Error"))
        })
        .catch(err => res.status(400).json("User does not exist"))
})

router.get('/', (req, res) => {
    const { userUuid } = req.query
    if (!userUuid) return res.status(400).json({ msg: 'Couldn\'t load records' })
    Category.find({ userUuid })
        .then(resultObject => {
            res.json({ categories: resultObject })
        })
        .catch(err => res.status(400).json({ msg: 'No Categories added' }))
})

router.put('/', (req, res) => {
    const { userUuid, category: { name, slug, status, createdDate } } = req.body;
    Category.findOne({ userUuid })
        .then(resp => {
            resp.categories.forEach(categoryItem => {
                if (categoryItem._id == req.body.replace._id) {
                    categoryItem.name = name;
                    categoryItem.slug = slug;
                    categoryItem.status = status;
                    categoryItem.createdDate = createdDate;
                }
            })
            resp.save()
                .then((success) => res.json(success))
                .catch(err => res.status(400).json({ msg: "Record couldn't be updated" }))
        })
        .catch(err => res.status(400).json({ msg: "Record couldn't be updated" }))
})

router.delete('/', (req, res) => {
    const { _id, userUuid } = req.query;

    Category.findOne({ userUuid })
        .then(resp => {
            let newCategory = resp.categories.filter(categoryItem => categoryItem._id != _id)
            resp.categories = newCategory;
            resp.save()
                .then((success) => res.json(success))
                .catch(err => res.status(400).json({ msg: "Record couldn't be deleted" }))
        })
        .catch(err => res.status(400).json({ msg: "Record couldn't be deleted" }))
})

module.exports = router