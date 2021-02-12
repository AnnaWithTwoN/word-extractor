const axios = require('axios');
var config = require('../../config.js')
var token = ''

const dictionary = {
    a: require('../../dictionary/DA.json'),
    b: require('../../dictionary/DB.json'),
    c: require('../../dictionary/DC.json'),
    d: require('../../dictionary/DD.json'),
    e: require('../../dictionary/DE.json'),
    f: require('../../dictionary/DF.json'),
    g: require('../../dictionary/DG.json'),
    h: require('../../dictionary/DH.json'),
    i: require('../../dictionary/DI.json'),
    j: require('../../dictionary/DJ.json'),
    k: require('../../dictionary/DK.json'),
    l: require('../../dictionary/DL.json'),
    m: require('../../dictionary/DM.json'),
    n: require('../../dictionary/DN.json'),
    o: require('../../dictionary/DO.json'),
    p: require('../../dictionary/DP.json'),
    q: require('../../dictionary/DQ.json'),
    r: require('../../dictionary/DR.json'),
    s: require('../../dictionary/DS.json'),
    t: require('../../dictionary/DT.json'),
    u: require('../../dictionary/DU.json'),
    v: require('../../dictionary/DV.json'),
    w: require('../../dictionary/DW.json'),
    x: require('../../dictionary/DX.json'),
    y: require('../../dictionary/DY.json'),
    z: require('../../dictionary/DZ.json'),
}

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
    console.log('function translate is called for', word)
    axios.get(`https://developers.lingvolive.com/api/v1/Minicard?text=${word}&srcLang=1033&dstLang=1049&isCaseSensitive=false`, {
        headers: {'Authorization': `Bearer ${ token }`},
    })
    .then(responce => {
        console.log(responce.data)
        return res.json(responce.data.Translation)
    })
    .catch(error => {
        console.log(error.response.status)
        if(error.response.status == 401) { //means tokes has already expired
            //get new token
            authorizate().then(data => { translate_inner(req, res) })
        } else {
                return res.status(500).json({
                message: "Problem with dictionary request",
                error
            })
        }
    })
}

module.exports = {
    translate: translate_inner,

    getDefinition: function(req, res) {
        let word = req.params.word
        console.log('function definition is called for', word)

        let dict = dictionary[word[0]]

        if(!(word in dict)){
            console.log("didn't find")
            return res.status(404).json({
                message: "This word was not found"
            })
        } else {
            let card = dict[word]
            //console.log(card)
            return res.json(card)
        }
    }
};
