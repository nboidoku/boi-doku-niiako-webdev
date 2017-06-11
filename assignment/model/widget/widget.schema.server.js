var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: 'PageModel', required:true},
    type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: {type:String, default: '100%'},
    height: {type:String, default: '100%'},
    rows: {type: Number, default: 0},
    size: {type: Number, default: 1},
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: 'widget'});

module.exports = widgetSchema;