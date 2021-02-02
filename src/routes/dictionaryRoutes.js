var express = require('express');
var router = express.Router();
const dictionaryController = require('../controllers/dictionaryController.js')


router.get('/:word', dictionaryController.translate);

module.exports = router;