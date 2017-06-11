var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: 'WebsiteModel', require:true},
    name: String,
    title: String,
    description: String,
    //widgets: [Widget]
    dateCreated: {type: Date, default: Date.now()},
    dateUpdates: {type: Date, default: Date.now()}
}, {collection:"page"});

module.exports = pageSchema;