const nodemailer = require('nodemailer');
require('dotenv').config();
const senderEmail = process.env.SENDER_EMAIL_ID;
const senderPassword = process.env.SENDER_EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: senderEmail,
        pass: senderPassword
    }
});

const sendEmail = (receiverEmail, subject, message) => {
    const mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, information) {
        if (!error) {
            console.log('Email sent to: ' + mailOptions.to);
        }
    })
}

module.exports = {
    sendEmail
};