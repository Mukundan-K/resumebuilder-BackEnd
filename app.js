const express = require('express');
const app = express();
const port = 2000;
const cors = require('cors');
const jwt = require('jsonwebtoken')
const Signupdata = require('./model/Signupdata');
const Userdata = require('./model/userdata');
const Admindata = require('./model/Admindata')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// signin & signup
app.post('/signup',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var item = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }  
    Signupdata.findOne({email: item.email})
    .then(function(data){
        if (data == null){
            var signup = Signupdata(item);
            signup.save(); 
            res.status(200).send('success')
        }
        else{
            res.status(401).send('email already exist')
          }
    })        
});
app.post('/login', (req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    let userData = req.body
    Signupdata.findOne({email: userData.email})
    .then(function(data){
        if (data == null){
            res.status(401).send('Invalid username')
        }
        else if(data.password == userData.password){
            let payload = {subject: data.email+data.password}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token,data})
        }
        else{
            res.status(401).send('Invalid Password')
        }
    })
})
// end of signin & signup

// userloginpage
app.post('/user',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var userdata = {
        data: req.body.data,
        personal: req.body.personal,
        experience: req.body.experience,
        education: req.body.education,
        skill: req.body.skill
    }
    Userdata.findOne({'data._id': userdata.data._id})
    .then(function(userdb){
        if(userdb == null){
            var user = Userdata(userdata);
            user.save(); 
            res.status(200).send('success') 
        }
    })
});
app.post('/checkuser',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var users={
        id: req.body._id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    Userdata.findOne({'data._id': users.id})
    .then(function(userr){
        if(userr == null){
            res.status(401).send('no user found');
        }
        else{
            res.status(200).send({userr})
        }
    })
});
app.delete('/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    const id = req.params.id;
    if(id==null){
        res.status(401).send('noo')
    }
    else{
        Userdata.deleteOne({_id: id})
        .then(function(){
            console.log('success')
        }); 
    }        
});
// end of userloginpage

// admin
app.post('/adminlogin', (req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    let adminData = req.body  
    Admindata.findOne({email: adminData.email})
    .then(function(data){
        if (data == null){
            res.status(401).send('Invalid username')
        }
        else if(data.password == adminData.password){
            let payload = {subject: data.email+data.password}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
        else{
            res.status(401).send('Invalid Password')
        }
    })
})
app.post('/adminsignup',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var item = {
        email: req.body.email,
        password: req.body.password
    }  
    Admindata.findOne({email: item.email})
    .then(function(data){
        if (data == null){
            var signup = Admindata(item);
            signup.save(); 
            res.status(200).send('success')
        }
        else{
            res.status(401).send('email already exist')
        }
    })        
});
app.get('/adminuser',function(req,res){
    Signupdata.find()
    .then(function(data){
        res.send(data);
    })
});
app.get('/admin',function(req,res){
    Admindata.find()
    .then(function(data){
        res.send(data);
    })
});

app.listen(port,()=>{console.log("Server ready at "+ port);});
 