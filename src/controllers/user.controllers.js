const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const uploadCloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");

const createAccessOrRefreshToken = async (userId) => {
  try {
    const refreshToken = await ()=>{

    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "Something is missing" });
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const username = email.split("@")[0];

    const hashedPass = await bcrypt.hashSync(password, 10);

    const avatarImageLink = req.files?.avatar[0].path;
    let coverImageLink = req.files.coverImage[0].path;

    const avatarImage = await uploadCloudinary(avatarImageLink);
    const coverImage = await uploadCloudinary(coverImageLink);

    const resUser = await User.create({
      username,
      fullName: name,
      email,
      password: hashedPass,
      avatar: avatarImage?.url,
      coverImage: coverImage?.url,
    });

    const getUser = await User.findOne({ _id: resUser._id });
    if (!getUser) {
      return res.status(400).json({ message: "User Creation failed" });
    }
    res
      .status(201)
      .json({ message: "User Created Successfully", user: getUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ((!username || !email) && !password) {
      throw new Error("Username or email or password is not available");
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      throw new Error("User not available");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
