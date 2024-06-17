const Cart = require("../models/Cart");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdminCheck,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE_CART
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const createdCart = await newCart.save();
    return res.status(201).json(createdCart);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

//UPDATE_CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedCart);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//DELETE_CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("Cart Deleted");
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//GET_USER_CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cartData = await Cart.find({ userId: req.params.id });
    return res.status(200).json(cartData);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//GET_ALL_CARTS
router.get("/", verifyTokenAndAdminCheck, async (req, res) => {
  try {
    const carts = await Cart.find();
    return res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
