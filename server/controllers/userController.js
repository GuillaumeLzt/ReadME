const nodemailer = require('nodemailer');
const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.home = (req, res) => {

    res.send('Hello World');
};

exports.register = (req, res) => {

    res.render('register');
};
exports.login = (req, res) => {

    res.render('login');
};
exports.forget = (req, res) => {

    res.render('forgottenPassword');
};

exports.contact = (req, res) => {

    res.render('contact');
    
}

exports.forgetPost = (req, res) => {

    res.cookie('mail', req.body.email);

    User.findOne({
        email : req.body.email,
      }).exec((err, user) => {
        if (err) {

          res.status(500).send({ message: err });
          return;
          
        }else {

            console.log('ok');

    //  const transporter = nodemailer.createTransport({
    
    //     host: 'smtp.office365.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: 'gl40@hotmail.fr',
    //         pass: 'emmaguillaume=0801',
    //     },
    // });

    // let options = {

    //         from: 'gl40@hotmail.fr',
    //         to: req.body.email,
    //         subject: 'Forgotten password',
    //         text: 'http://localhost:3000/newpassword',
    // }
    // transporter.sendMail(options, (err, info) => {
        
    //     if(err){
    //         console.log(err, "email not sent");
    //     }else{
    //     console.log("email sent sucessfully");
    //     }
    
    // });  
 };

    

});
};
 
exports.newpassword = (req, res) => {

    res.render('newpassword');

};
exports.newpasswordPost = (req, res) => {

    User.findOne({

        email : res.cookies.email,

    }).exec((err, user) => {

        if (err) {

          res.status(500).send({ message: err });
          return;
          
        }else {   

        User.findByIdAndUpdate(user.id, { 

        password: bcrypt.hashSync(req.body.password, 8),
        
        },(err, doc) => {
      
          if(!err){
            
              res.redirect('/login');// EO forEach
      
          }
        
        });  
        }
    });

};

exports.allAccess = (req, res) => {
res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
res.status(200).send("Moderator Content.");
};