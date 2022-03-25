let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let CartItems = new Schema (
    {
        quantity: Number,
        shopping_session: {
            type: Schema.Types.ObjectId, 
            ref: 'ShoppingSession'
        },
        product:{
            type: Schema.Types.ObjectId, 
            ref: 'Product'
        },
        
    },
    {
        timestamps: true
    }
);
let CartItem = mongoose.model('CartItem',CartItems,'cart_items');
module.exports = CartItem;