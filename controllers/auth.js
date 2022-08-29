const userModel = require("../models/user");
const CryptoJs = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await userModel.findOne({ username: username });

  if (exists) return res.status(403).json({ message: "User already exists" });

  const newUser = new userModel({
    username: username,
    email: email,
    password: CryptoJs.AES.encrypt(password, process.env.CRYPTO_KEY).toString(),
  });

  try {
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username: username });

    !user && res.status(401).json({ message: "Invalid Credentials" });

    const hashedPass = CryptoJs.AES.decrypt(
      user.password,
      process.env.CRYPTO_KEY
    );

    if (password === hashedPass.toString(CryptoJs.enc.Utf8)) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },

        process.env.JWT_KEY,
        { expiresIn: "1d" }
      );

      const { password, ...other } = user._doc; // dont send password info

      res.status(200).json({...other,accessToken});
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
