var express = require('express');
var router = express.Router();
const dictionaryController = require('../controllers/dictionaryController.js')


router.get('/translation/:word', dictionaryController.translate);
router.get('/definition/:word', dictionaryController.getDefinition);

module.exports = router;