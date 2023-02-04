const nodeMailer = require('nodemailer');
const ejs = require('ejs');

let transporter = nodeMailer.createTransport({
    host: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILER_AUTH_USER,
        pass: process.env.MAILER_AUTH_PASS
    }
});

let renderTemplate = function(data, relativePath){
    let mailHTML;
    ejs.renderFile(
        __dirname + '../views/mailers' + relativePath,
        data,
        function(err, template){
            if(err){console.log('Error in rendering template'); return;}
            mailHTML = template;
        }
    );

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}