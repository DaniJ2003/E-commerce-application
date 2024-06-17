const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdminCheck,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE_USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      data.password,
      process.env.SECRET_PASSPHRASE
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//DELETE_USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User Deleted");
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//GET_USER
router.get("/find/:id", verifyTokenAndAdminCheck, async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    return res.status(200).json(userData);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//GET_ALL_USERS
router.get("/", verifyTokenAndAdminCheck, async (req, res) => {
  const needOnlyNew = req.query.new;
  try {
    const usersData = needOnlyNew
      ? await User.find().sort({ createdAt: -1 }).limit(5)
      : await User.find();
    return res.status(200).json(usersData);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//GET_USER_STATS
router.get("/stats", verifyTokenAndAdminCheck, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
