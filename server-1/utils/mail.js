const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your mail service
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendMail = async ({ to, subject, text }) => {    
  await transporter.sendMail({
    from: `"Saas-Monitoring-System" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text
  });
};

module.exports = { sendMail };
