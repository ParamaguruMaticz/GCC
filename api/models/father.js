import mongoose from 'mongoose';
// require('mongoose-double')(mongoose);
const Double = require('@mongoosejs/double');

import jwt from 'jsonwebtoken';
// import Double from 'bson';
import config from '../config/config';

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types
const ObjectId = Schema.ObjectId;

var FatherNFT = mongoose.Schema({
    image: {
        type: String,
        default:'',
    },
    tokenName: {
        type: String,
        required: true,
    },
    minthashValue: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: '',
    },
    timestamp: { type: Date, default: Date.now }
});

FatherNFT.virtual("id").get(function () {
    return this._id.toHexString();
});

FatherNFT.set("toJSON", {
    virtuals: true,
});

FatherNFT.methods.generateJWT = function (payload) {
    var token = jwt.sign(payload, config.secretOrKey);
    return `Bearer ${token}`;
};

var FatherNFT = mongoose.model("FatherNFT", FatherNFT);
module.exports = FatherNFT;



