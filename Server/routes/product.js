const Product = require("../models/Product");
const { verifyTokenAndAdminCheck } = require("./verifyToken");

const router = require("express").Router();

//CREATE_PRODUCT
router.post("/", verifyTokenAndAdminCheck, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const createdProduct = await newProduct.save();
    return res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

//UPDATE_PRODUCT
router.put("/:id", verifyTokenAndAdminCheck, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//DELETE_PRODUCT
router.delete("/:id", verifyTokenAndAdminCheck, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json("Product Deleted");
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//GET_PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const productData = await Product.findById(req.params.id);
    return res.status(200).json(productData);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

//GET_ALL_PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategories = req.query.categories;
  try {
    let products;
    if (qNew) products = await Product.find().sort({ createdAt: -1 }).limit(5);
    else if (qCategories) {
      products = await Product.find({
        categories: {
          $in: [qCategories],
        },
      });
    } else products = await Product.find();

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

module.exports = router;
