const UserModel = require('../../models/user.model'); 
const bcrypt = require('bcrypt');
const { sendWelcomeEmail } = require('../../utility/mailer');
const JWT = require('jsonwebtoken');

require('dotenv').config();


exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!', success: false });
  }

  try {

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email!', success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password!', success: false });
    }
    const publicIP = req.headers['public_ip']
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    req.session.username = user.username;
    req.session.ipAddress = publicIP; 
    console.log('Session:', req.session);

 
    sendWelcomeEmail(user.email).catch(err => console.error('Email send failed:', err));


    const token = JWT.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: '50m' }
    );

    return res.status(200).json({
      message: 'Login successful!',
      token,
      email: user.email,
      success: true
    });

  } catch (error) {
    console.error('Sign-in error:', error);
    return res.status(500).json({ message: 'Internal server error!', success: false });
  }
};