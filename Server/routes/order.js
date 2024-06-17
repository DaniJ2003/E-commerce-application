const Order = require("../models/Order");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdminCheck,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE_ORDER
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const createdOrder = await newOrder.save();
    return res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

//UPDATE_ORDER
router.put("/:id", verifyTokenAndAdminCheck, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//DELETE_ORDER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json("Order Deleted");
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//GET_USER_ORDER
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orderData = await Order.find({ userId: req.params.id });
    return res.status(200).json(orderData);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//GET_ALL_ORDERS
router.get("/", verifyTokenAndAdminCheck, async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

//GET_MONTHLY_INCOME
router.get("/income", verifyTokenAndAdminCheck, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const secondLastMonth = new Date(
    lastMonth.setMonth(lastMonth.getMonth() - 1)
  );

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: secondLastMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
