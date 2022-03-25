let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let OrderItems = new Schema (
    {
        quantity: Number,
        order: {
            type: Schema.Types.ObjectId, 
            ref: 'Order'
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
let OrderItem = mongoose.model('OrderItem',OrderItems,'order_items');
module.exports = OrderItem;