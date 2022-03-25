let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Discounts = new Schema (
    {
        name: String,
        description: String,
        discount_percent: Number,
        active: Boolean,
    },
    {
        timestamps: true
    }
);
let Discount = mongoose.model('Discount',Discounts,'discounts');
module.exports = Discount;