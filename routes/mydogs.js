const express = require('express');
const router = express.Router();
const db = require('../models');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/', (req, res) => {
    db.dog.findAll({
        where: {
            userId: req.user.id
        }
    })
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
            lifespan: req.body.lifespan,
            temperament: req.body.temperament,
            url: req.body.url,
            userId: req.user.id,
            dogId: req.body.dogId
        },
        defaults: { bredfor: req.body.bredfor ? req.body.bredfor : 'Companionship', temperament: req.body.temperament ? req.body.temperament : 'fun-loving, silly, loyal' }
    }).then(([dogs, wasCreated]) => {
        console.log('🤢', dogs)
        req.flash('success', `Added ${req.body.name} to My Dogs!`)
        res.redirect('/mydogs')
    }).catch(err => {
        console.log(err)
    });
});



router.delete('/:id', (req, res) => {
    db.dog.destroy({
        where: {
            id: req.params.id
        }
    }).then(destroyed => {
        req.flash('success', 'You let the dog out!')
        res.redirect('/mydogs')
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;