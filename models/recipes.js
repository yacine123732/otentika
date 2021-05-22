var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Recipes = new Schema ({
    name: String,
    description: String

})
var Recipe = mongoose.model('recipes', Recipes);
module.exports = Recipe;