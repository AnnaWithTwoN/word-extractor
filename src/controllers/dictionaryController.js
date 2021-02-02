const axios = require('axios');
var config = require('../../config.js')
var token = ''

/**
 * dictionaryController.js
 *
 * @description :: Server-side logic for working with dictionary
 */


const authorizate = () => {
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
            console.log(error)
            reject(error)
        })
    })
}

const translate_inner = (req, res) => {
    let word = req.params.word
    console.log('funct translate is called for', word)
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
            authorizate().then(data => { translate_inner(req, res) })
        } else {
            res.status(500).json({
                message: "Problem with dictionary request",
                error
            })
        }
    })
}

module.exports = {
    translate: translate_inner
};
