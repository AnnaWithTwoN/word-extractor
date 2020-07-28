var express = require('express');
var router = express.Router();
var userController = require('../controllers/userControler.js')

/* GET users listing. */
router.get('/', userController.list);
router.get('/:id', userController.show);

router.post('/', userController.create);

router.put('/:id', userController.update);

router.delete('/:id', userController.remove);

module.exports = router;