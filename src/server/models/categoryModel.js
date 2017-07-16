var Category = require('../schemes/category');
var defaults = require('../defaults');

var createDefaultCategories = function () {
    var categoryPromises = [];
    defaults.categories.forEach(function (catData) {
        categoryPromises.push(new Category(catData).save());
    });

    return Promise.all(categoryPromises);
};

exports.init = function () {
    return new Promise(function (resolve, reject) {
        Category.find()
                .then(function (data) {
                    if (data.length === 0) {
                        return createDefaultCategories();
                    }
                    if (data.length > 0) {
                        return Promise.resolve();
                    }
                })
                .then(function () {
                    resolve('categories ready');
                })
                .catch(function (e) {
                    reject(e);
                });
    });
};

exports.getAll = function () {
    return new Promise(function (resolve, reject) {
        Category.find()
                .then(function (data) {
                    resolve(data);
                })
                .catch(function () {
                    reject();
                });
    });
};
