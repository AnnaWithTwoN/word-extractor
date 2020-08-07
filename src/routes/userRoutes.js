var express = require('express');
var router = express.Router();
var userController = require('../controllers/userControler.js')

router.get('/', userController.list);
router.get('/:id', userController.show);

router.post('/', userController.create);
router.post('/login', userController.login);
router.post('/addknown/:id', userController.addKnownWords);
router.post('/deleteknown/:id', userController.deleteKnownWords);

router.put('/:id', userController.update);

router.delete('/:id', userController.remove);

module.exports = router;