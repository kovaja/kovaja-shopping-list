require('mongoose').Promise = global.Promise
var User = require('../schemes/user');
var defaults = require('../defaults');

var createDefaultUsers = function () {
    var userPromises = [];
    defaults.users.forEach(function (userData) {
        userPromises.push(new User(userData).save());
    });

    return Promise.all(userPromises);
};

exports.init = function () {
    return new Promise(function (resolve, reject) {
        User.find()
                .then(function (data) {
                    if (data.length === 0) {
                        return createDefaultUsers();
                    }
                    if (data.length > 0) {
                        return Promise.resolve();
                    }
                })
                .then(function () {
                    resolve('users ready');
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.getOneByName = function (params) {
    return new Promise(function (resolve, reject) {
        User.findOne({'username': params.username.toLowerCase()})
                .then(function (data) {
                    if(!data){
                        return Promise.reject('user not found');
                    }
                    if (data.password === params.password) {
                        return Promise.resolve(data);
                    }
                    return Promise.reject('user not found*');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.addList = function (_id, list_id) {
    return new Promise(function (resolve, reject) {
        User.findOne({'_id': _id})
                .then(function (user) {
                    if(user){
                        user.lists.push(list_id);
                        return user.save();
                    }
                    return Promise.reject('user not found');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.getUserLists = function (params) {
    return new Promise(function (resolve, reject) {
        User.findOne({'_id': params.user_id})
                .populate('lists')
                .then(function (user) {
                    if(user && user.lists){
                        return Promise.resolve(user.lists);
                    }
                    return Promise.reject('user not found');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};
