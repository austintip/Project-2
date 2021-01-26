const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');


router.get('/', (req, res) => {
    res.render('mydogs')
});

router.post('/', (req, res) => {
    console.log(req.body)
    let dogs = db.dog.findOrCreate({
        where: {
            name: req.body.name,
            bredfor: req.body.bredfor,
            lifespan: req.body.lifespan,
            temperament: req.body.temperament,
            url: req.body.url
        },
        defaults: { bredfor: req.body.bredfor }
    }).then(([dogs, wasCreated]) => {
        console.log('🤢', dogs)
        res.redirect('/mydogs', { dogs })
    }).catch(err => {
        // console.log(err)
    });
});

module.exports = router;