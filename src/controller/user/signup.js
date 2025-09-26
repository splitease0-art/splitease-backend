const bcrypt = require('bcrypt');
const UserModel = require('../../models/user.model'); // Adjust path

/**
 * @desc    User Signup Controller
 * @route   POST /api/auth/signup
 * @access  Public
 */
exports.userSignUp = async (req, res) => {
  try {
   
    const {
      username,
      email,
      password,
      gender,
      address,
      phone_number,
      city,
      state,
      country,
      zip,
      bio,
      description,
      title,
    } = req.body;

 
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required.",
      });
    }


    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

   
    const lastUser = await UserModel.findOne().sort({ _id: -1 });
    const id = lastUser ? lastUser.id + 1 : 1;

 
    const hashedPassword = await bcrypt.hash(password, 12);

 
    const newUser = new UserModel({
      id,
      username,
      email,
      password: hashedPassword,
      gender,
      address,
      phone_number,
      city,
      state,
      country,
      zip,
      bio,
      description,
      title,

    });

    await newUser.save();

    console.log("user created:", newUser._id);


    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: userResponse,
    });

  } catch (error) {
    console.error("Signup error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
