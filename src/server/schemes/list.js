var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    shop: {type: String, required: true},
    date: Date,
    items: [{type: mongoose.Schema.ObjectId, ref: 'Item'}]
});

module.exports = mongoose.model('List', ListSchema);
