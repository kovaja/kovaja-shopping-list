require('mongoose').Promise = global.Promise
var Item = require('../schemes/item');
var listModel = require('./listModel');


exports.newItem = function (params) {
    return new Promise(function (resolve, reject) {
        var item = new Item({
            list: params.list_id ? params.list_id : null, 
            name: params.name ? params.name : null,
            category: params.category_id ? params.category_id : null,
            amount: params.amount ? params.amount : null
        });
        item.save()
                .then(function () {
                    return listModel.addItem(params.list_id, item._id);
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.deleteItem = function (params) {
    return new Promise(function (resolve, reject) {
        Item.findOne({'_id': params.item_id})
                .populate('list')
                .then(function (item) {
                    if (item) {
                        var list = item.list;
                        var indexInList = list.items.indexOf(item._id);

                        list.items.splice(indexInList,1);
                        list.save();

                        return item.remove();
                    }
                    return Promise.reject('item not found');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.updateItem = function (params) {
    return new Promise(function (resolve, reject) {
        Item.findOne({'_id': params.item_id})
                .then(function (item) {
                    if (item) {
                        item.name = params.name ? params.name : item.name;
                        item.category = params.category_id ? params.category_id : item.category;
                        item.amount = params.amount ? params.amount : item.amount;
                        return item.save();
                    }
                    return Promise.reject('item not found');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.getListItems = function (params) {
    return new Promise(function (resolve, reject) {
        Item.find({'list': params.list_id})
                .populate('category')
                .then(function (items) {
                    if(items){
                        return Promise.resolve(items);
                    }
                    return Promise.reject('Items not found');
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};