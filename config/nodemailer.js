const nodeMailer = require('nodemailer');
const ejs = require('ejs');

let transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'alchemy.cn18',
        pass: 'codingninjas'
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