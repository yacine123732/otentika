var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Categories = new Schema ({
    name: String,
    description: String

})
var Category = mongoose.model('categories', Categories);
module.exports = Category;