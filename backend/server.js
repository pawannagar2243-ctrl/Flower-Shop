const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ================= MONGODB CONNECT ================= */

mongoose.connect(process.env.MONGO_URI)
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

app.put("/categories/:id", async (req, res) => {
  res.json(
    await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    )
  );
});

app.delete("/categories/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category Deleted" });
});

/* ================= USER SIGNUP ================= */

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

/* ================= JWT VERIFY ================= */

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) return res.status(403).json({ message: "Token required" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= LOGIN ================= */

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Signup.findOne({ email });
  if (!user) return res.status(401).json({ message: "User not found" });

  if (!user.isActive) return res.status(403).json({ message: "User disabled" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user });
});

/* ================= PROFILE ================= */

app.get("/profile", verifyToken, async (req, res) => {
  const user = await Signup.findById(req.user.id).select("-password");
  res.json(user);
});

/* ================= ORDERS ================= */

const orderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    address: String,
    city: String,
    Image: String,
    pincode: String,
    products: Array,
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
  await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json({ success: true });
});

app.delete("/admin/order/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
