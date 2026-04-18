import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Shop from "./Shop";
import Contact from "./Contact";
import ProductDetails from "./ProductDetails";
import Login from "./Login";
import Signup from "./Signup";
import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";
import ProtectedRoute from "./ProtectedRoute";

// ShoppingCart (Right Side Offcanvas)
function ShoppingCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.qty > 0 ? { ...item, qty: item.qty - 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.Price * item.qty, 0);

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartCanvas">
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-bold">Shopping Cart</h5>
        <button className="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>

      <div className="offcanvas-body">
        {cartItems.length === 0 && (
          <p className="text-center text-muted">Cart is empty 🛒</p>
        )}

        {cartItems.map((item) => (
          <div key={item._id} className="d-flex gap-2 mb-3">
            <img
              src={`https://flower-shop-3b6m.onrender.com/uploads/${item.Image}`}
              alt={item.Name}
              className="img-fluid rounded"
              style={{ maxWidth: "60px" }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-1">{item.Name}</h6>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => decreaseQty(item._id)}>-</button>
                <span>{item.qty}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => increaseQty(item._id)}>+</button>
              </div>
            </div>
            <div className="text-end">
              <p className="fw-bold mb-1">₹{item.Price * item.qty}</p>
              <button className="btn btn-sm text-danger" onClick={() => removeItem(item._id)}>✕</button>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-between fw-bold mt-3">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <button className="btn w-100 mt-3 text-white" style={{ background: "#ff6f4f" }} data-bs-dismiss="offcanvas" onClick={() => navigate("/Cart")}>VIEW CART</button>
        <button className="btn w-100 mt-2 text-white" style={{ background: "#ff6f4f" }} data-bs-dismiss="offcanvas" onClick={() => navigate("/Checkout")}>CHECKOUT</button>
      </div>
    </div>
  );
}

// NAVBAR
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const u = localStorage.getItem("loginUser");
      setUser(u ? JSON.parse(u) : null);
    };
    const loadCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((acc, item) => acc + item.qty, 0);
      setCartCount(count);
    };

    loadUser();
    loadCartCount();

    window.addEventListener("userLoggedIn", loadUser);
    window.addEventListener("cartUpdated", loadCartCount);

    return () => {
      window.removeEventListener("userLoggedIn", loadUser);
      window.removeEventListener("cartUpdated", loadCartCount);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  // ✅ Function to Manually Close Mobile Menu
  const closeMobileMenu = () => {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      const instance = window.bootstrap.Offcanvas.getInstance(mobileMenu);
      if (instance) instance.hide();
    }
    setMenuOpen(false);
  };

  // Function to open User Profile
  const handleUserClick = () => {
    closeMobileMenu(); // Close menu first

    if (!user) {
      navigate("/Login");
    } else {
      setTimeout(() => {
        const offcanvas = new window.bootstrap.Offcanvas(document.getElementById("userCanvas"));
        offcanvas.show();
      }, 300);
    }
  };

  // Function to open Cart
  const handleCartClick = () => {
    closeMobileMenu(); // Close menu first

    setTimeout(() => {
      const cartCanvas = new window.bootstrap.Offcanvas(document.getElementById("cartCanvas"));
      cartCanvas.show();
    }, 300);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Shop", path: "/Shop" },
    { name: "Contact", path: "/Contact" },
  ];

  return (
    <>
      <style>
        {`
          .toggler-icon { display: block; width: 25px; height: 2px; background: #333; position: relative; transition: all 0.3s ease-in-out; }
          .toggler-icon::before, .toggler-icon::after { content: ''; width: 25px; height: 2px; background: #333; position: absolute; left: 0; transition: all 0.3s ease-in-out; }
          .toggler-icon::before { top: -8px; }
          .toggler-icon::after { top: 8px; }
          .toggler-icon.open { background: transparent; }
          .toggler-icon.open::before { transform: rotate(45deg); top: 0; }
          .toggler-icon.open::after { transform: rotate(-45deg); top: 0; }
        `}
      </style>

      <nav className="navbar navbar-expand-lg bg-white sticky-top px-4 py-3 shadow-sm">
        <div className="container-fluid position-relative">
          
          {/* 1. LEFT: LOGO */}
          <Link to="/" className="navbar-brand fw-bold fs-3">
            Flower Shop
          </Link>

          {/* 2. CENTER: DESKTOP MENU */}
          <div className="d-none d-lg-flex position-absolute start-50 translate-middle-x">
            <ul className="navbar-nav flex-row gap-4 fw-bold">
              {navLinks.map((link) => (
                <li key={link.path} className="nav-item">
                  <Link 
                    to={link.path} 
                    className={`nav-link ${isActive(link.path) ? 'text-danger' : 'text-dark'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. RIGHT: ICONS & TOGGLER */}
          <div className="d-flex align-items-center gap-3 ms-auto">
            
            {/* ICONS: Sirf Desktop par dikhenge */}
            <div className="d-none d-lg-flex gap-3">
                {/* User Icon */}
                <button className="btn p-0 border-0 bg-transparent" onClick={handleUserClick}>
                  {user ? (
                    <img src={`https://flower-shop-3b6m.onrender.com/uploads/${user.image}`} alt="profile" className="rounded-circle" style={{ width: "35px", height: "35px", objectFit: "cover" }} />
                  ) : (
                    <i className="fas fa-user-circle fs-3"></i>
                  )}
                </button>

                {/* Cart Icon */}
                <button className="btn position-relative" onClick={handleCartClick}>
                  <i className="bi bi-cart3 fs-4"></i>
                  {cartCount > 0 && (
                    <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{ fontSize: "10px", top: "5px", right: "-5px" }}>
                      {cartCount}
                    </span>
                  )}
                </button>
            </div>

            {/* TOGGLER: Sirf Mobile par dikhega */}
            <button
              className="navbar-toggler border-0 d-lg-none"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)} // Only handle state, Offcanvas handled by data-bs-toggle
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileMenu"
            >
              <span className=""><i className="fa fa-bars"></i></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OFFCANVAS MENU */}
      <div className="offcanvas offcanvas-end d-lg-none" tabIndex="-1" id="mobileMenu" style={{ width: "300px" }}>
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-bold">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" onClick={() => setMenuOpen(false)}></button>
        </div>
        
        <div className="offcanvas-body p-0">
            
            {/* PROFILE & CART SECTION */}
            <div className="p-3 bg-light border-bottom">
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-outline-dark w-50 d-flex align-items-center justify-content-center gap-2"
                        onClick={handleUserClick}
                    >
                        <i className="fas fa-user"></i> 
                        {user ? "Profile" : "Login"}
                    </button>

                    <button 
                        className="btn btn-outline-danger w-50 d-flex align-items-center justify-content-center gap-2"
                        onClick={handleCartClick}
                    >
                        <i className="bi bi-cart3"></i> 
                        Cart ({cartCount})
                    </button>
                </div>
            </div>

            {/* ✅ NAV LINKS - Fixed Click Issue */}
            <ul className="navbar-nav fw-bold">
                {navLinks.map((link, index) => (
                <li key={link.path} className="nav-item border-bottom">
                    <Link
                      to={link.path}
                      className={`nav-link p-3 ${isActive(link.path) ? 'text-white bg-danger' : 'text-dark'}`}
                      onClick={closeMobileMenu} // ✅ Use manual close function instead of data-bs-dismiss
                    >
                      {link.name}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
      </div>

      {/* USER POPUP */}
      <div className="offcanvas offcanvas-end" id="userCanvas">
        <div className="offcanvas-header">
          <h5>User Profile</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body text-center">
          {user ? (
            <>
              <img src={`https://flower-shop-3b6m.onrender.com/uploads/${user.image}`} alt="user" className="rounded-circle mb-3" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
              <h5>{user.username}</h5>
              <p className="text-muted">{user.email}</p>
              <p className="text-muted">{user.Number}</p>
              <button className="btn w-50 mt-2 text-white" style={{ background: "#ff6f4f" }} data-bs-dismiss="offcanvas" onClick={() => navigate("/OrderSuccess")}>My Orders</button>
              <button className="btn btn-danger w-100 mt-3" onClick={logout}>Logout</button>
            </>
          ) : (
             <div className="mt-5">
                <p>Please login to view profile</p>
                <button className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={() => navigate("/Login")}>Login</button>
             </div>
          )}
        </div>
      </div>

      <ShoppingCart />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/OrderSuccess" element={<OrderSuccess />} />
      </Routes>
    </>
  );
}

export default Navbar;
