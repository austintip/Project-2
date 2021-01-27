const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');


router.get('/', (req, res) => {
    db.dog.findAll()
    .then(dog => {
        res.render('mydogs', {dog})
    }).catch(err => {
        console.log(err);
    })
});

router.post('/', (req, res) => {
    console.log(req.body)
    db.dog.findOrCreate({
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
        res.redirect('/mydogs')
    }).catch(err => {
        // console.log(err)
    });
});

module.exports = router;