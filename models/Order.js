let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Orders = new Schema (
    {
        total: Number,
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        payment_details: {
            type: Schema.Types.ObjectId, 
            ref: 'PaymentDetails'
        },
        address: {
            type: Schema.Types.ObjectId, 
            ref: 'Address'
        },
    },
    {
        timestamps: true
    }
);
let Order = mongoose.model('Order',Orders,'orders');
module.exports = Order;