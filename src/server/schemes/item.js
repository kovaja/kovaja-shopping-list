var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {type: String, required: true},
    category: {type: mongoose.Schema.ObjectId, ref: 'Category'},
    list: {type: mongoose.Schema.ObjectId, ref: 'List'},
    amount: String,
    done: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);
