var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type:String, require:true},
    password: {type:String, require:true},
    firstName: String,
    roles: [{type: String, default:'USER', enum: ['USER', 'STUDENT', 'FACULTY', 'ADMIN']}],
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: 'WebsiteModel'}],
    dateCreated: {type:Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;