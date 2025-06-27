const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.C_NAME,
  api_key: process.env.C_API,
  api_secret: process.env.C_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "ImageFromFrontEnd",
    });

    console.log("File upload successfully ", res.url);

    fs.unlinkSync(localFilePath);

    return res;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
