let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Addresses = new Schema (
    {
        address_line1: String,
        address_line2: String,
        city: String,
        postal_code: String,
        country: String,
        telephone: String,
    },
    {
        timestamps: true
    }
);
let Address = mongoose.model('Address',Addresses,'addresses');
module.exports = Address;