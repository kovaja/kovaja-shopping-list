var categoryModel = require('./models/categoryModel');
var userModel = require('./models/userModel');
var listModel = require('./models/listModel');
var itemModel = require('./models/itemModel');

module.exports = {
    '/categories/all': {
        method: categoryModel.getAll
    },
    '/login': {
        method: userModel.getOneByName,
        params: ['username', 'password']
    },
    '/list/new': {
        method: listModel.newList,
        params: ['user_id', 'shop', 'date']
    },
    '/list/delete': {
        method: listModel.deleteList,
        params: ['list_id']
    },
    '/list/update': {
        method: listModel.updateList,
        params: ['list_id', 'shop', 'date']
    },
    '/list': {
        method: listModel.getUserLists,
        params: ['user_id']
    },
    '/item/new': {
        method: itemModel.newItem,
        params: ['list_id', 'name', 'category_id', 'amount']
    },
    '/item/delete': {
        method: itemModel.deleteItem,
        params: ['item_id']
    },
    '/item/update': {
        method: itemModel.updateItem,
        params: ['item_id', 'name', 'category_id', 'amount']
    },
    '/item/all': {
        method: itemModel.getListItems,
        params: ['list_id']
    },
    '/': {
        method: function () {
            console.log('Api initialization...');
            return Promise.all([
                categoryModel.init(),
                userModel.init()
            ]);
        }
    }
};