var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Images = new Schema ({
    images: String,
    type: String,
    assoc_id :  mongoose.Types.ObjectId()

})
var Image = mongoose.model('images', Images);
module.exports = Image;