let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let PaymentDetails = new Schema (
    {
        payment_type: String,
        provider: String,
        account_no: Number,
        amount: Number,
        status: String,
        order: {
            type: Schema.Types.ObjectId, 
            ref: 'Order'
        },
    },
    {
        timestamps: true
    }
);
let PaymentDetail = mongoose.model('PaymentDetail',PaymentDetails,'payment_details');
module.exports = PaymentDetail;