const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://resume:resume@ictakfiles.kialy.mongodb.net/RESUMEBUILDER?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
const schema = mongoose.Schema;

const SignupSchema = new schema({
    username: String,
    email: String,
    password: String
});

var Signupdata = mongoose.model('Signupdata',SignupSchema);

module.exports = Signupdata;