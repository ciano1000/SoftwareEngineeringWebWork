var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://*PASSWORD AND MONGODB NAME');
exports.connection = connection;
