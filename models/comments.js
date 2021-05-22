var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comments = new Schema ({
    comment: String,
    user_id: mongoose.Types.ObjectId(),
    recept_id :  mongoose.Types.ObjectId()

})
var Comment = mongoose.model('comments', Comments);
module.exports = Comment;