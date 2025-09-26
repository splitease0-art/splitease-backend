const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const path = require('path');




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD, // Use App Password here
  },
});

exports.sendWelcomeEmail = async (userEmail) => {
  const htmlTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'welcome.html'), 'utf8'); // assuming you save the HTML in a separate file

  try {
    await transporter.sendMail({
      from: `"Fascom" <${process.env.ADMIN_EMAIL}>`,
      to: userEmail,
      subject: 'Login Successful!',
      html: htmlTemplate,
    });
    console.log('Email sent to:', userEmail);
  } catch (err) {
    console.error('Failed to send email:', err);
  }
};