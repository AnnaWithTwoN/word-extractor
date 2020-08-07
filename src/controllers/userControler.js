var userModel = require('../models/userModel.js');
var bcrypt = require('bcrypt');
const { NotExtended } = require('http-errors');
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
        console.log("user is being created", req.body);

        userModel.find({ username: req.body.username })
            .then(u => {
                console.log(u)
                if(u.length !== 0){
                    return res.status(409).json({
                        message: `Username '${ req.body.username }' is already taken`,
                        error: 'Error in create user'
                    })
                }

                var user = new userModel({
                    username : req.body.username,
                    password : req.body.password,
                    email : req.body.email
                });
                console.log(user);
        
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

            })
            .catch(err => {
                console.log(err)
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

    addKnownWords: function (req, res) {
        var id = req.params.id;
        console.log("adding new words");
        console.log(id)
        userModel.findOne({_id: id})
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'No such user'
                    });
                }

                user.known_words = [...user.known_words, ...req.body.checked_known_words];
                
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

    deleteKnownWords: function (req, res) {
        var id = req.params.id;
        console.log("deleting words");
        userModel.findOne({_id: id})
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'No such user'
                    });
                }

                //user.username = req.body.username ? req.body.username : user.username;
                user.known_words = user.known_words.filter(word => {
                    return req.body.checked_unknown_words.find(word) === undefined
                })
                console.log(user.known_words)
                
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
    },

    login: function (req, res) {
        userModel.findOne({ username: req.body.username })
            .then(user => {
                console.log(user)
                if (!user) {
                    return res.status(404).json({
                        message: 'No such user'
                    });
                }

                if(user.password === req.body.password){
                    res.status(200).json(user)
                } else {
                    return res.status(403).json({
                        message: 'Wrong password'
                    });
                }
                
            })
            .catch(err => {
                console.log(err)
            })
    }

};
