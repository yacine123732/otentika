let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserPayments = new Schema (
    {
        payment_type: String,
        provider: String,
        account_no: Number,
        expiry: {
            type: Date, 
            default: Date.now
        },
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
);
let UserPayment = mongoose.model('UserPayment',UserPayments,'user_payments');
module.exports = UserPayment;