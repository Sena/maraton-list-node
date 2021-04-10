const bcrypt = require('bcrypt')
const mongoose = require('../config/mongoose')
const jsonwebtoken = require("jsonwebtoken")
const {UserSchema} = require('../model/user-model')

const User = mongoose.model('user', UserSchema)

exports.signup = async (req, res) => {

    if (req.body.name === undefined) {
        return res.status(400).send({message: 'Field name is required!'})
    }
    if (req.body.email === undefined) {
        return res.status(400).send({message: 'Field email is required!'})
    }
    if (req.body.password === undefined) {
        return res.status(400).send({message: 'Field password is required!'})
    }

    bcrypt.hash(req.body.password, 10, async (errBcrypt, hash) => {
        if (errBcrypt) {
            return res.status(500).send({error: errBcrypt})
        }

        const new_user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        })

        const user = await User.findOne({email: new_user.email})

        if (user !== null) {
            return res.status(409).send({message: 'E-mail already registered'})
        }

        new_user.save((err) => {
            if (err) {
                return res.status(500).send(err)
            }

            return res.status(201).send({
                message: 'User created',
                user: {
                    name: new_user.name,
                    email: new_user.email,
                    created_date: new_user.created_date,
                }
            })
        })
    })
}

exports.login = async (req, res) => {

    const user = await User.findOne({email: req.body.email})

    bcrypt.compare(req.body.password, user.password, (bError, bResult) => {
        if (bError) {
            return res.status(401).send({message: 'Auth failed'})
        }

        if (!bResult) {
            return res.status(401).send({message: 'Password mismatch'})
        }

        const token = jsonwebtoken.sign({
                _id: user._id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES
            })

        return res.status(200).send({
            name: user.name,
            email: user.email,
            token: token,
        })
    })
}