var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    lists: [{type: mongoose.Schema.ObjectId, ref: 'List'}]
});

module.exports = mongoose.model('User', UserSchema);
