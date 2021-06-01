const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://resume:resume@ictakfiles.kialy.mongodb.net/RESUMEBUILDER?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
const schema = mongoose.Schema;

const UserSchema = new schema({
        data: {
            _id: String,
            username: String,
            email: String,
            password: String
        },
        personal: {
            firstname: String,
            lastname: String,
            address: String,
            city: String,
            zipcode: String,
            state: String,
            email: String,
            phone: String
        },
        experience: {
            employer: String,
            jobtitle: String,
            city: String,
            state: String,
            startdate: String,
            enddate: String
        },
        education: {
            scname: String,
            city: String,
            state: String,
            degree: String,
            study: String,
            pass: String
        },
        skill: {
            skill1: String,
            level1: String,
            skill2: String,
            level2: String,
            skill3: String,
            level3: String,
            skill4: String,
            level4: String,
            skill5: String,
            level5: String
        }
});

var Userdata = mongoose.model('Userdata',UserSchema);

module.exports = Userdata;