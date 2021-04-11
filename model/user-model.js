const mongoose = require("mongoose")


const Schema = mongoose.Schema

exports.UserSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'E-mail is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
})