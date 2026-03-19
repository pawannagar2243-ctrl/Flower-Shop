require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
const allowedOrigins = [
  "https://flower-shop-1-ji4c.onrender.com",
  "https://addmin-penal.onrender.com", 
  "http://localhost",
  "http://127.0.0.1"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS from Rakesh Server"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ================= MONGODB CONNECT ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

/* ================= MULTER ================= */

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, "uploads/");
},
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const JWT_SECRET = process.env.JWT_SECRET;

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

app.post("/productForm", upload.single("image"), async (req, res) => {
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

app.put("/productForm/:id", upload.single("image"), async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);

    const updateData = {
      ...req.body,
      Image: req.file ? req.file.filename : existing.Image
    };

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
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

  res.json({ token,  success: true,
  user: user });
});

/* ================= PROFILE ================= */

app.get("/profile", verifyToken, async (req, res) => {
  const user = await Signup.findById(req.user.id).select("-password");
  res.json(user);
});

/* ================= ORDERS ================= */

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signup",
      required: true,
    },
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        Name: String,
        qty: Number,
		Image: String,
        Price: Number,
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
  try {
    const order = new Order(req.body);
    await order.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/admin/orders", async (req, res) => {
  res.json(await Order.find().sort({ createdAt: -1 }));
});
app.get("/my-orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.get("/my-orders", verifyToken, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});


app.put("/admin/order-status/:id", async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json({ success: true });
});

app.delete("/admin/order/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
const ContactSchema = new mongoose.Schema({
  first: String,
  last: String,
  email: String,
  message: String,
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


const Contact = mongoose.model("Contact", ContactSchema);

app.post("/Contact", async (req, res) => {
  try {
    const data = await Contact.create(req.body);
	const user = await Contact.create({
      name: req.body.name,
      last: req.body.last,
      email: req.body.email,
      message: req.body.message
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/Contact", (req, res) => {
  res.send("Server running");
});
/* ================= FORGOT PASSWORD SYSTEM ================= */

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* SEND OTP */
app.post("/send-otp", async (req, res) => {
	console.log("Send OTP route hit");
  const { email } = req.body;

  try {
    const user = await Signup.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000, // 5 min expiry
    };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

/* VERIFY OTP */
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
console.log("Received:", email, otp);        // ← add karo
  console.log("Stored:", otpStore[email]);      // ← add karo
  const stored = otpStore[email];

  if (!stored)
    return res.status(400).json({ message: "OTP not found" });

  if (Date.now() > stored.expires)
    return res.status(400).json({ message: "OTP expired" });

  if (stored.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  res.json({ success: true, message: "OTP verified" });
});

/* RESET PASSWORD */
app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const stored = otpStore[email];
    if (!stored)
      return res.status(400).json({ message: "OTP not verified" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await Signup.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    delete otpStore[email];

    res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend working" });
});
/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
