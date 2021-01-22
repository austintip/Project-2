const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', (req, res) => {
    let dogBreed = req.params.id;
    let dogUrl = `https://api.TheDogAPI.com/v1/images/search?breed_ids=${dogBreed}`
    axios.get(dogUrl).then(apiResponse => {
        let dogs = apiResponse.data;
        console.log(dogs);
        console.log('🥶')
        console.log(dogs[0].url);
        res.render('dogs/info',{ dogs });
    });
});


module.exports = router;