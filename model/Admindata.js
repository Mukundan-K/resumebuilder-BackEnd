const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://resume:resume@ictakfiles.kialy.mongodb.net/RESUMEBUILDER?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
const schema = mongoose.Schema;

const AdminSchema = new schema({
    email: String,
    password: String
});

var Admindata = mongoose.model('Admindata',AdminSchema);

module.exports = Admindata;