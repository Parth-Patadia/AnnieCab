const nodemailer = require('nodemailer');

exports.sendEmail = async (firstName, lastName, email, pass) => {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anniecab6532@gmail.com',
            pass: 'wlea dqzx dysh yqjz'
        }
    });

    const mailOptions = {
        from: 'anniecab6532@gmail.com',
        to: `${email}`,
        subject: 'Annie Cab Password',
        text: `Hello ${firstName} ${lastName} Your Reset Password is ${pass}`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}