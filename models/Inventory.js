let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Inventories = new Schema (
    {
        quantity: Number,
    },
    {
        timestamps: true
    }
);
let Inventory = mongoose.model('Inventory',Inventories,'inventories');
module.exports = Inventory;