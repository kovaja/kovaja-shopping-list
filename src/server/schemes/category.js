var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    default: String,
    name: String,
    order: Number
});

module.exports = mongoose.model('Category', CategorySchema);
