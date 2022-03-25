let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Categories = new Schema (
    {
        name: String,
        description: String
    },
    {
        timestamps: true
    }
);
let Category = mongoose.model('Category',Categories,'categories');
module.exports = Category;