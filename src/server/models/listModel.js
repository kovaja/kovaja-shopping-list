require('mongoose').Promise = global.Promise
var List = require('../schemes/list');
var userModel = require('./userModel');


exports.newList = function (params) {
    return new Promise(function (resolve, reject) {
        var list = new List({
            user: params.user_id ? params.user_id : null,
            shop: params.shop ? params.shop : null,
            date: params.date ? params.date : null,
            items: []
        });
        list.save()
                .then(function () {
                    return userModel.addList(params.user_id, list._id);
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
        List.find({'user': params.user_id})
                .then(function (lists) {
                    if (lists) {
                        return Promise.resolve(lists);
                    }
                    return Promise.reject('Lists not found');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.addItem = function (_id, item_id) {
    return new Promise(function (resolve, reject) {
        List.findOne({'_id': _id})
                .then(function (list) {
                    if (list) {
                        list.items.push(item_id);
                        return list.save();
                    }
                    return Promise.reject('list not found');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.deleteList = function (params) {
    return new Promise(function (resolve, reject) {
        List.findOne({'_id': params.list_id})
                .populate('user')
                .then(function (list) {
                    if (list) {
                        var user = list.user;
                        var indexInUser = user.lists.indexOf(list._id);

                        user.lists.splice(indexInUser, 1);
                        user.save();

                        return list.remove();
                    }
                    return Promise.reject('list not found');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.updateList = function (params) {
    return new Promise(function (resolve, reject) {
        List.findOne({'_id': params.list_id})
                .then(function (list) {
                    if (list) {
                        list.shop = params.shop ? params.shop : list.shop;
                        list.date = params.date ? params.date : list.date;
                        return list.save();
                    }
                    return Promise.reject('list not found');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};