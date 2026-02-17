const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "https://flower-shop-1-ji4c.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);



app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ================= MONGODB CONNECT ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

/* ================= MULTER ================= */

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const JWT_SECRET = "MY_SECRET_KEY_123";

/* ================= PRODUCT ================= */

const productSchema = new mongoose.Schema({
  ID: String,
  Name: String,
  Image: String,
  Price: Number,
  discount: Number,
  Stock: Number,
  Category: String,
});

const Product = mongoose.model("Product", productSchema);

app.post("/productForm", upload.single("Image"), async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      Image: req.file ? req.file.filename : "",
    });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/productForm", async (req, res) => {
  res.json(await Product.find());
});
app.get("/productForm/:id", async (req, res) => {
  res.json(await Product.findById(req.params.id));
});

app.put("/productForm/:id", upload.single("Image"), async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) updateData.Image = req.file.filename;

  const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updated);
});

app.delete("/productForm/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
});
/* ================= CATEGORY ================= */

const categorySchema = new mongoose.Schema({
  name: String,
});

const Category = mongoose.model("Category", categorySchema);

app.post("/categories", async (req, res) => {
  const cat = new Category({ name: req.body.name });
  await cat.save();
  res.json(cat);
});

app.get("/categories", async (req, res) => {
  res.json(await Category.find());
});

/* ================= USER ================= */

const signupSchema = new mongoose.Schema({
  username: String,
  email: String,
  Number:String,
  password: String,
  image: String,
  isActive: { type: Boolean, default: true },
});

const Signup = mongoose.model("Signup", signupSchema);

app.post("/signup", upload.single("image"), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new Signup({
      username: req.body.username,
      email: req.body.email,
	  Number:req.body.Number,
      password: hashedPassword,
      image: req.file ? req.file.filename : "",
      isActive: true,
    });

    await user.save();

    res.json({
      success: true,
      message: "User saved successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

/* ================= USERS ================= */

app.get("/users", async (req, res) => {
  res.json(await Signup.find());
});

app.delete("/users/:id", async (req, res) => {
  await Signup.findByIdAndDelete(req.params.id);
  res.json({ message: "User Deleted" });
});

app.put("/toggleUsers/:id", async (req, res) => {
  const user = await Signup.findById(req.params.id);
  user.isActive = !user.isActive;
  await user.save();

  res.json({
    success: true,
    isActive: user.isActive,
  });
});


/* ================= ORDERS ================= */

const orderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,

    products: [
      {
        Name: String,
        Price: Number,
        qty: Number,
        Image: String,
        returnStatus: {
          type: String,
          default: null,
        },
      },
    ],

    total: Number,
    paymentMethod: String,
    paymentStatus: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

app.post("/place-order", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ success: true });
});

app.get("/admin/orders", async (req, res) => {
  res.json(await Order.find().sort({ createdAt: -1 }));
});

app.put("/admin/order-status/:id", async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
  });
  res.json({ success: true });
});

app.delete("/admin/order/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.put("/cancel-order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    if (order.status === "Delivered") {
      return res.status(400).json({
        message: "Delivered order cannot be cancelled",
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* ================= RETURN SYSTEM (FIXED) ================= */

/* User Return Request */
app.post("/return-product", async (req, res) => {
  const { orderId, productId } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    const product = order.products.find(
      (p) => p._id.toString() === productId
    );

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.returnStatus = "Requested";

    await order.save();

    res.json({ message: "Return requested successfully" });
  } catch (error) {
    console.error("Return Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* Admin Approve / Reject */
app.put("/admin/return-action", async (req, res) => {
  const { orderId, productId, action } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    const product = order.products.find(
      (p) => p._id.toString() === productId
    );

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.returnStatus = action;

    await order.save();

    res.json({ message: "Return updated successfully" });
  } catch (error) {
    console.error("Admin Return Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
