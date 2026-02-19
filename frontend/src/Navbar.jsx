import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
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

// ShoppingCart
function ShoppingCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const updateCart = (cart) => {
    setCartItems(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (id) => {
    updateCart(
      cartItems.map((i) =>
        i._id === id ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  const decreaseQty = (id) => {
    updateCart(
      cartItems.map((i) =>
        i._id === id && i.qty > 0 ? { ...i, qty: i.qty - 1 } : i
      )
    );
  };

  const removeItem = (id) => {
    updateCart(cartItems.filter((i) => i._id !== id));
  };

  const subtotal = cartItems.reduce(
    (t, i) => t + i.Price * i.qty,
    0
  );

  return (
    <div
      className="offcanvas offcanvas-end w-50 w-md-75 w-lg-50"
      id="cartCanvas"
    >
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
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => decreaseQty(item._id)}
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => increaseQty(item._id)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-end">
              <p className="fw-bold mb-1">
                ₹{item.Price * item.qty}
              </p>
              <button
                className="btn btn-sm text-danger"
                onClick={() => removeItem(item._id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        <br />

        <div className="d-flex justify-content-between fw-bold">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <button
          className="btn w-100 mt-3 text-white"
          style={{ background: "#ff6f4f" }}
          data-bs-dismiss="offcanvas"
          onClick={() => navigate("/Cart")}
        >
          VIEW CART
        </button>

        <button
          className="btn w-100 mt-2 text-white"
          style={{ background: "#ff6f4f" }}
          data-bs-dismiss="offcanvas"
          onClick={() => navigate("/Checkout")}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

// NAVBAR 
 function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("loginUser");
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleUserClick = () => {
    if (!user) {
      navigate("/Login");
    } else {
      const offcanvas = new window.bootstrap.Offcanvas(
        document.getElementById("userCanvas")
      );
      offcanvas.show();
    }
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-white sticky-top px-4">

        {/* LEFT LOGO */}
		  <Link to="/" className="navbar-brand fw-bold fs-3">
			Flower Shop
		  </Link>

		  {/* MOBILE TOGGLER */}
		  <button
			className="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navMenu"
		  >
			<span className="navbar-toggler-icon"></span>
		  </button>

		  <div className="collapse navbar-collapse" id="navMenu">

			{/* CENTER MENU */}
			<ul className="navbar-nav ms-auto fw-bold gap-lg-5 text-center">

			  <li className="nav-item">
				<Link to="/" className="nav-link text-black">Home</Link>
			  </li>

			  <li className="nav-item">
				<Link to="/About" className="nav-link text-black">About</Link>
			  </li>

			  <li className="nav-item">
				<Link to="/Shop" className="nav-link text-black">Shop</Link>
			  </li>

			  <li className="nav-item">
				<Link to="/Contact" className="nav-link text-black">Contact</Link>
			  </li>

			</ul>

		  {/* RIGHT SIDE ICONS */}
		  <div className="ms-lg-auto d-flex align-items-center gap-3 justify-content-center mt-3 mt-lg-0">

            {/* USER ICON */}
            <button
              className="btn p-0 border-0 bg-transparent"
              onClick={handleUserClick}
            >
            {user ? (
				<img
				  src={`https://flower-shop-3b6m.onrender.com/uploads/${user.image}`}
				  alt="profile"
				  className="rounded-circle"
				  style={{
					width: "40px",
					height: "40px",
					objectFit: "cover"
				  }}
				/>
			  ) : (
				<i className="fas fa-user-circle fs-3"></i>
			  )}
			</button>
           

            {/* CART */}
            <button
              className="btn position-relative"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartCanvas"
            >
              <i className="bi bi-cart3 fs-5"></i>
            </button>

          </div>
        </div>
      </nav>

      {/* USER POPUP */}
      <div className="offcanvas offcanvas-end" id="userCanvas">
        <div className="offcanvas-header">
          <h5>User Profile</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body text-center">
          {user && (
            <>
              <img
                src={`https://flower-shop-3b6m.onrender.com/uploads/${user.image}`}
                alt="user"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />

              <h5>{user.username}</h5>
              <p className="text-muted">{user.email}</p>
              <p className="text-muted">{user.Number}</p>
			  <button
				  className="btn w-50 mt-2 text-white"data-bs-dismiss="offcanvas"
				  style={{ background: "#ff6f4f" }}onClick={() => navigate("/OrderSuccess")}>
				  My Orders
			  </button>
              <button
                className="btn btn-danger w-100 mt-3"
                onClick={logout}
              >
                Logout
              </button>
            </>
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
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/OrderSuccess" element={<OrderSuccess />} />
      </Routes>
    </>
  );
}
export default Navbar
