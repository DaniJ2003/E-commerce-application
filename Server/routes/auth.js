const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

// REGISTER
router.post("/register", async (req, res) => {
  let missingInput = false;
  const data = req.body;

  if (!data.userName || !data.email || !data.password) missingInput = true;

  const newUser = new User({
    userName: data.userName,
    email: data.email,
    password: CryptoJS.AES.encrypt(
      data.password,
      process.env.SECRET_PASSPHRASE
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json("User added!");
  } catch (err) {
    if (missingInput) res.status(400).json(err.toString());
    else res.status(500).json(err.toString());
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const requestData = req.body;
  const key = requestData.userName.includes("@") ? "email" : "userName";

  try {
    const userData = await User.findOne({
      [key]: requestData.userName,
    });

    if (!userData) return res.status(401).json("Wrong Credentials!");

    const originalPassword = CryptoJS.AES.decrypt(
      userData.password,
      process.env.SECRET_PASSPHRASE
    ).toString(CryptoJS.enc.Utf8);

    if (originalPassword !== requestData.password)
      return res.status(401).json("Wrong Credentials!");

    const accessToken = jwt.sign(
      {
        id: userData._id,
        isAdmin: userData.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...otherData } = userData._doc;
    res.status(200).json({ ...otherData, accessToken });
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
