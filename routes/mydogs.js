const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models')


router.get('/', (req, res) => {
    res.render('mydogs')
});

router.post('/', (req, res) => {
    console.log(req.body)
    db.dog.findOrCreate({
        where: {
            name: req.body.name
        }
    }).then(res.redirect('/mydogs'))
})

module.exports = router;