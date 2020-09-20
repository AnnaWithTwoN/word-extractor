var express = require('express');
var router = express.Router();
const axios = require('axios');
var config = require('../../config.js')
var token = ''


router.get('/:word', (req, res) => {
    console.log("requesting abby lingvo for ", (req.params.word))
    translate(req.params.word, req, res)
});

let authorizate = () => {
    return new Promise((resolve, reject) => {
        console.log("trying to authorizate at abby lingvo")
        axios.post(`https://developers.lingvolive.com/api/v1.1/authenticate`, {}, {
            headers: { 'Authorization': `Basic ${ config.ABBY_LINGVO_KEY }` }
        })
        .then(responce => {
            token = responce.data
            console.log('received token ', token)
            resolve()
        })
        .catch(error => {
            reject(error)
        })
    })
}

let translate = (word, req, res) => {
    console.log('funct translate is called')
    axios.get(`https://developers.lingvolive.com/api/v1/Minicard?text=${word}&srcLang=1033&dstLang=1049&isCaseSensitive=false`, {
        headers: {'Authorization': `Bearer ${ token }`},
    })
    .then(responce => {
        console.log(responce.data)
        res.json(responce.data.Translation)
    })
    .catch(error => {
        console.log(error.response.status)
        if(error.response.status == 401) { //means tokes has already expired
            //get new token
            authorizate().then(data => { translate(word, req, res) })
        } else {
            res.status(500).json({
                message: "Problem with dictionary request",
                error
            })
        }
    })
}


module.exports = router;