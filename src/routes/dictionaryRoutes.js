var express = require('express');
var router = express.Router();
const axios = require('axios');


router.get('/:word', (req, res) => {
    console.log("requesting abby longvo for ", (req.params.word))
    axios.get(`https://developers.lingvolive.com/api/v1/Minicard?text=${req.params.word}&srcLang=1033&dstLang=1049&isCaseSensitive=false`, {
    headers: {'Authorization': `Bearer ${ABBY_LINGVO_TOKEN}`},
    })
    .then(responce => {
        console.log(responce.data)
        res.json(responce.data.Translation)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Problem with dictionary request",
            error
        })
    })
});


module.exports = router;