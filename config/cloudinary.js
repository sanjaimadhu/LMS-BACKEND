const cloudinary = require("cloudinary").v2;
require("dotenv").config();
exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Connection to cloudinary is successfull...");
  } catch (error) {
    console.log(error);
  }
};
