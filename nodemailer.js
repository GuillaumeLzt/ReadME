const nodemailer = require('nodemailer');


    const transporter = nodemailer.createTransport({
    
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'readMEApp@hotmail.com',
            pass: 'AFGPFG04/01',
        },
    });

    let options = {

            from: 'readMEApp@hotmail.com',
            to: 'larrazetguillaume@gmail.com',
            subject: 'azerty',
            text: 'azerty',
    }
    transporter.sendMail(options, (err, info) =>{
        if(err){
            console.log(err, "email not sent");
        }else{
        console.log("email sent sucessfully");
        
        }
    });