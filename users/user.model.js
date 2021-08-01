const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, text: true, unique: true, required: true},
    contact: { type: String, text: true, minLength: 6, maxLength: 10, pattern:"^[0-9]$", required: true},
    address: { type: String, required: true},
    gender: { type: String, required: true},
    country: { type: String, required: true},
    hash: { type: String, required: true},
    oldhash: { type: Array, required: true},
    key: { type: Number, default: () => { return Math.floor(Math.random() * 1000) }},
    creatDate: { type: Date, default: Date.now}
})

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
})

schema.index( { username: 1, contact: 2 } )

module.exports = mongoose.model('User', schema);