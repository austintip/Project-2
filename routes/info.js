const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_KEY= process.env.API_KEY

router.get('/:id', (req, res) => {
    let dogBreed = req.params.id;
    let dogUrl = `https://api.TheDogAPI.com/v1/images/search?breed_id=${dogBreed}`
    axios.get(dogUrl, { 
        headers: {
            'x-api-key': `${API_KEY}`
    }})
    .then(apiResponse => {
        let dogs = apiResponse.data;
        console.log(dogs);
        console.log('🥶')
        console.log(dogs[0].url);
        res.render('dogs/info',{ dogs });
    }).catch(err => {
        console.log(err)
    });
});


module.exports = router;