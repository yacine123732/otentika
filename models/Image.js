let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Images = new Schema ({
    size: String,
    type: String,
    name: String,
    path: String,
})
let Image = mongoose.model('Image',Images,'images');
module.exports = Image;