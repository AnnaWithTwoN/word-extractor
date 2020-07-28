var userModel = require('../models/userModel.js');
var bcrypt = require('bcrypt');
//var ObjectId = require('mongoose').Types.ObjectId; 

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find()
            .then(users => {
                return res.json(users);
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        console.log(id)
        userModel.findOne({_id: id})
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'No such user'
                    });
                }
                return res.json(user);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            })
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        console.log("user id being created");
        var user = new userModel({
			username : req.body.username,
			password : req.body.password,
			email : req.body.email
        });
        //console.log(user.password);

        //user.password = bcrypt.hashSync(user.password, 10);
        //console.log(user.password);

        user.save()
            .then(user => {
                return res.status(201).json(user)
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            })
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        console.log("updating");
        userModel.findOne({_id: id})
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'No such user'
                    });
                }

                user.username = req.body.username ? req.body.username : user.username;
                user.password = req.body.password ? req.body.password : user.password;
                user.email = req.body.email ? req.body.email : user.email;
                
                user.save()
                    .then(user => {
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: 'Error when updating user.',
                            error: err
                        });
                    })
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            })
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id)
            .then(_ => { return res.status(204).json(); })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            })
    }

};
