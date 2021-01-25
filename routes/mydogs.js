const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('profile')
});

// router.post('/mydogs', (req, res) => {
//     db.findOrCreate({
//         where: {
//             name: req.body.name,
//         }
//     })
// })

module.exports = router;