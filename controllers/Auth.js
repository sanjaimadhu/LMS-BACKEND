const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    //extracting data from req body
    const { username, email, password, confirmPassword, role } = req.body;

    //validating data
    if (!username || !email || !password || !confirmPassword) {
      return res.status(502).json({
        success: false,
        message: "Fill all details",
      });
    }

    //match password
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Password doesn't matched",
      });
    }

    //checking user already exists or not
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(405).json({
        success: false,
        message: "User already registered",
      });
    }

    //hashing password

    const saltRoundes = process.env.BCRYPT_SALT_ROUNDS || 10;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userEntry = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    //returning resonse
    return res.status(200).json({
      success: true,
      message: "User signed up successfully",
      user: userEntry,
    });
  } catch (err) {
    console.log("Error in user signup", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    //extracting data from request
    const { email, password } = req.body;

    //validating email and password;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please fill all fields while login",
      });
    }
    //checking if user exists or not
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(402).json({
        success: false,
        message: `Unable to find user registered with ${email}`,
      });
    }

    //matching password
    if (await bcrypt.compare(password, user.password)) {
      //generate jwt token
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "2h",
      });

      user.password = undefined;
      user.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("jwtToken", token, options).json({
        success: true,
        token: token,
        user: user,
        message: "User logged in successfully",
      });
    } else {
      return res.status(402).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({
      success: false,
      message: "Unable to logged in",
      error: err.message,
    });
  }
};
