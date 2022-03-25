let User = require('../models/User.js');
let Address = require('../models/Address.js');
let bcrypt = require('bcrypt');
let Image = require('../models/Image.js');
exports.updateUser = async function(req,res){
    let id = req.params.id
    const filter = {
        _id : id
    }
    const update = {
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
    }
    await User.findOneAndUpdate(filter, update).then(function(result,err){
        if(err) console.log(err)
        else {
            console.log("succesfuly updated user")
            res.sendStatus(200)
        }
    });

}
exports.getUser = async function(req,res){
    let user = await User.findById(req.params.id).exec();
    if(user){
        res.json(user);
    }
    else{
        res.sendStatus(204);
    }
}
exports.deleteUser = async function(req,res){
    let del = await User.deleteOne( { _id: req.params.id }).exec();
    if(del.deletedCount > 0){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(204);
    }
}
exports.getAllUsers = async function(req,res){
    let users = await User.find({}).exec();
    res.json(users);
}
exports.updatePassword = async function(req,res){
    let user = await User.findById(req.params.id).exec();
    if(user){
        user.comparePassword(req.body.old_password, async (err,match) => {
            if(err) return console.error(err);
            if(match){
                user.password = req.body.new_password;
                await user.save();
                res.sendStatus(200);
            }
        });
    }
}
exports.register = async function(req,res){
    let user = new User({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : req.body.password,
    });
    user.save(function(err, user) {
        if (err) return console.error(err);
        console.log(`user with id: ${user._id} is registered succussfully!`);
        res.sendStatus(200);
    });
};
/** Address functions */
exports.addAddress = async function(req,res){
    let address = new Address({
        address_line1: req.body.address_line1,
        address_line2: req.body.address_line2,
        city: req.body.city,
        postal_code: req.body.postal_code,
        country: req.body.country,
        telephone: req.body.telephone,
    });
    address.save( async function(err, address){
        if (err) return console.error(err);
        const update = { address : address._id};
        const filter = { _id : req.params.id};
        await User.updateOne(filter, update).then(function(result,err){
            if(err) return console.error(err);
            else {
                console.log("succesfuly added address to user")
                console.log(result);
                res.sendStatus(200);
            }
        });
        
    });

};
exports.updateAddress = async (req,res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        
    }).
    populate('address').exec( async (err, user) => {
        if (err) return console.error(err);
        let address = user.address;
        const filter = { _id : address._id};
        const update = {
            address_line1: req.body.address_line1,
            address_line2: req.body.address_line2,
            city: req.body.city,
            postal_code: req.body.postal_code,
            country: req.body.country,
            telephone: req.body.telephone,
        }
        for(let prop in update) if(!update[prop]) delete update[prop];
        await Address.updateOne(filter, update).then(function(result,err){
            if(err) return console.error(err);
            else {
                console.log("succesfuly updated address of user")
                console.log(result);
                res.sendStatus(200);
            }
        });
    });
}
exports.deleteAddress = async (req,res) => {
    let user = User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        
    }).
    populate('address').exec( async (err, user) => {
        if (err) return console.error(err);
        let address = user.address;
        await Address.deleteOne({_id: address._id }).then( async function(result,err){
            if(err) return console.error(err);
            else {
                user.address = undefined;
                await user.save(function(err,result,rows){
                    if(err) return console.error(err);
                    console.log("succesfuly deleted address of user");
                    console.log(res);
                    res.sendStatus(200);
                });
            }
        });
    });
}
exports.getAddress = async (req,res) => {
    console.log(req.session);
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        
    }).
    populate('address').exec((err, user) => {
        if (err) return console.error(err);
        res.json(user.address);
    });
}
/** Profile Image functions */
exports.addImage = async function(req,res){
    let image = new Image({
        type: req.body.type,
        name: req.body.name,
        size: req.body.size,
        path: req.body.path,
    });
    image.save( async function(err, image){
        if (err) return console.error(err);
        const update = { image : image._id};
        const filter = { _id : req.params.id};
        await User.updateOne(filter, update).then(function(result,err){
            if(err) return console.error(err);
            else {
                console.log("succesfuly added image to user")
                console.log(result);
                res.sendStatus(200);
            }
        });
        
    });

};
exports.updateImage = async (req,res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        
    }).
    populate('image').exec( async (err, user) => {
        if (err) return console.error(err);
        let image = user.image;
        const filter = { _id : image._id};
        const update = {
            type: req.body.type,
            name: req.body.name,
            size: req.body.size,
            path: req.body.path,
        }
        for(let prop in update) if(!update[prop]) delete update[prop];
        await Image.updateOne(filter, update).then(function(result,err){
            if(err) return console.error(err);
            else {
                console.log("succesfuly updated image of user")
                console.log(result);
                res.sendStatus(200);
            }
        });
    });
}
exports.deleteImage = async (req,res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        
    }).
    populate('image').exec( async (err, user) => {
        if (err) return console.error(err);
        let image = user.image;
        await Image.deleteOne({_id: image._id }).then( async function(result,err){
            if(err) return console.error(err);
            else {
                user.address = undefined;
                await user.save(function(err,result,rows){
                    if(err) return console.error(err);
                    console.log("succesfuly deleted image of user");
                    console.log(res);
                    res.sendStatus(200);
                });
            }
        });
    });
}
exports.getImage = async (req,res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        
    }).
    populate('image').exec((err, user) => {
        if (err) return console.error(err);
        res.json(user.image);
    });
}
