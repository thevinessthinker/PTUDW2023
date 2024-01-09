const nodemailer = require('nodemailer');
const env = require('../config/environment');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'luuthienvi.app@gmail.com',
        pass: 'dpztsigfcilmqjdy',
    },
});

const sendEmail = (recipientAddress, subject, htmlBody) => {
    const info = {
        from: `QLBH <${env.NODEMAILER_USER}>`,
        to: recipientAddress,
        subject: subject,
        html: htmlBody,
    };

    transporter.verify((err, success) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    transporter.sendMail(info, (err, info) => {
        if (err) {
            console.log(err);
        }
        console.log('Message sent: ' + info.messageId);
    });
};

module.exports = {
    sendEmail,
};
