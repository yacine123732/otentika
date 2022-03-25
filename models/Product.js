let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Products = new Schema (
    {
        name: String,
        description: String,
        price: Number,
        discount : {
            type: Schema.Types.ObjectId, 
            ref: 'Discount'
        },
        inventory : {
            type: Schema.Types.ObjectId, 
            ref: 'Inventory'
        },
        category : {
            type: Schema.Types.ObjectId, 
            ref: 'Category'
        },
        images: [{
            type: Schema.Types.ObjectId, 
            ref: 'Image'
        }]

    },
    {
        timestamps: true
    }
);
let Product = mongoose.model('Product',Products,'products');
module.exports = Product;