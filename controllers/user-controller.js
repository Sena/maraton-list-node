const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {

    if (req.body.name === undefined) {
        return res.status(400).send({message: 'Field name is required!'});
    }
    if (req.body.email === undefined) {
        return res.status(400).send({message: 'Field email is required!'});
    }
    if (req.body.password === undefined) {
        return res.status(400).send({message: 'Field password is required!'});
    }

    bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
        if (errBcrypt) {
            return res.status(500).send({error: errBcrypt});
        }
        // @todo save in database
        const response = {
            message: 'User created',
            user: {
                name: req.body.name,
                email: req.body.email,
            }
        };
        return res.status(201).send(response);
    });
}