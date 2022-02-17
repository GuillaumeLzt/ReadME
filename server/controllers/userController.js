const nodemailer = require('nodemailer');
const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

require("dotenv").config();


exports.home = (req, res) => {

    User.findOne({

        username : req.cookies.username,

    }).exec((err, user) => {

        if (err) {

          res.status(500).send({ message: err });
          return;
          
        }else {   

            res.render('index',{

            user:user

            })
        }
    });    
};

exports.chat = (req, res) => {

    User.findOne({

        username : req.cookies.username,

    }).exec((err, user) => {

        if (err) {

          res.status(500).send({ message: err });
          return;
          
        }   

        res.render('chat',{

            user:user
        })
        
    });
}


exports.register = (req, res) => {

    res.render('register',{

        user: null

    });
};

exports.profil = (req, res) => {

    User.findOne({

        username : req.cookies.username,

    }).exec((err, user) => {

        if (err) {

          res.status(500).send({ message: err });
          return;
          
        }   

        res.render('userProfil',{

            user:user
        })
        
    });

}
exports.photos = (req, res) => {

    User.findOne({

        username : req.cookies.username,

    }).exec((err, user) => {

        if (err) {

          res.status(500).send({ message: err });
          return;
          
        }else {   

            res.render('userPhotos',{

            user: user

            })
        }
    });    
}

exports.login = (req, res) => {

    res.render('login',{

        user: null

    });
};

exports.logout = (req, res) => {

    res.cookie('jwt', '', {expiresIn: 1 });

    res.cookie('username', '', {expiresIn: 1 });

    res.redirect('/');
}

exports.forget = (req, res) => {

    res.render('forgottenPassword',{

        user:null
    });
};

exports.contact = (req, res) => {

    res.render('contact');
    
}

exports.forgetPost = (req, res) => {

    

    User.findOne({
        email : req.body.email,
      }).exec((err, user) => {
        if (err) {

          res.status(500).send({ message: err });
          return;
          
        }else {
        

            const transporter = nodemailer.createTransport({
            
                host: proces.env.HOST,
                port: 587,
                secure: false,
                auth: {
                    user: 'readME-service@hotmail.com',
                    pass: 'AFGPFG04/10',
                },
            });

            let options = {

                    from: 'readME-service@hotmail.com',
                    to: req.body.email,
                    subject: 'Forgotten password',
                    text: 'http://localhost:3000/newpassword',
            }
            transporter.sendMail(options, (err, info) => {
                
                if(err){
                    console.log(err, "email not sent");
                }else{

                    res.cookie('email', req.body.email);
                    res.redirect('/login')
                }
    
             });  
        };

    });
};
 
exports.newpassword = (req, res) => {

    res.render('newpassword');

};
exports.newpasswordPost = (req, res) => {

    User.findOne({

        email : req.cookies.email,

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