var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type:mongoose.Schema.ObjectId, ref: "UserModel", require:true},
    name: {type: String, require: true},
    description: String,
    pages: [{type: mongoose.Schema.ObjectId, ref: 'PageModel'}],
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now}
}, {collection: 'website'});


module.exports = websiteSchema;

