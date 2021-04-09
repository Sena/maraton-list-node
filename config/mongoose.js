const mongoose = require("mongoose");

const user = process.env.MDB_USER
const password = process.env.MDB_PASSWORD
const host = process.env.MDB_HOST_USER
const uri = 'mongodb+srv://' + user + ':' + password + '@' + host + '/myFirstDatabase?retryWrites=true&w=majority'

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
module.exports = mongoose;