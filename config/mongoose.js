const mongoose = require("mongoose");

module.exports = (host) => {
    const user = process.env.MDB_USER
    const password = process.env.MDB_PASSWORD
    const uri = 'mongodb+srv://' + user + ':' + password + '@' + host + '/myFirstDatabase?retryWrites=true&w=majority'

    mongoose.Promise = global.Promise;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose;
};