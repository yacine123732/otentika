let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ShoppingSessions = new Schema (
    {
        total: Number,
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
);
let ShoppingSession = mongoose.model('ShoppingSession',ShoppingSessions,'shopping_sessions');
module.exports = ShoppingSession;