var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var commentsSchema = new Schema({
    "userid":{type:String},
    "message":{type:String},
    "upvotes":{type:Number,default:0},
    "downvotes":{type:Number,default:0},
    "date":{type:Date, default:new Date()}
});
module.exports = mongoose.model('Comment',commentsSchema);