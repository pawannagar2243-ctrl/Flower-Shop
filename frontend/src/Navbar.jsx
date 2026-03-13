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
	import ProtectedRoute from "./ProtectedRoute";

	// ShoppingCart
	function ShoppingCart() {
	  const navigate = useNavigate();
		const [cartItems, setCartItems] = useState([]);
	  
	 useEffect(() => {
	  const loadCart = () => {
		setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
	  };

	  loadCart();

	  window.addEventListener("cartUpdated", loadCart); // ← listen karo

	  return () => window.removeEventListener("cartUpdated", loadCart);
	}, []);

	  const increaseQty = (id) => {	
		const updated = cartItems.map(item =>
		  item._id === id ? { ...item, qty: item.qty + 1 } : item
		);
		setCartItems(updated);
		localStorage.setItem("cart", JSON.stringify(updated));
		window.dispatchEvent(new Event("cartUpdated")); // ← add karo
	  };

	  const decreaseQty = (id) => {
		const updated = cartItems.map(item =>
		  item._id === id && item.qty > 0
			? { ...item, qty: item.qty - 1 }
			: item
		);
		setCartItems(updated);
		localStorage.setItem("cart", JSON.stringify(updated));
		window.dispatchEvent(new Event("cartUpdated")); // ← add karo
	  };

	  const removeItem = (id) => {
		const updated = cartItems.filter(item => item._id !== id);
		setCartItems(updated);
		localStorage.setItem("cart", JSON.stringify(updated));
		window.dispatchEvent(new Event("cartUpdated")); // ← add karo
	  };

	  const subtotal = cartItems.reduce(
		(acc, item) => acc + item.Price * item.qty,
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
	  const [cartCount, setCartCount] = useState(0); // ← add karo
      const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
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
	   loadCartCount(); // ← add karo

	  window.addEventListener("userLoggedIn", loadUser); // ← custom event listen karo
	  window.addEventListener("cartUpdated", loadCartCount); // ← add karo

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
		  setShowLogoutConfirm(false);
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
				   onClick={() => window.dispatchEvent(new Event("cartUpdated"))} // ← yeh add karo
				>
				  <i className="bi bi-cart3 fs-5"></i>
				   {cartCount > 0 && (
						<span
						   className="position-absolute translate-middle badge rounded-pill bg-danger"
						   style={{ fontSize: "10px", top: "10px ", right: "-7px" }}
						>
						  {cartCount}
						</span>  
						  )}
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
					src={`https://flower-shop-3b6m.onrender.com/${user.image}`}
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
					  onClick={() => setShowLogoutConfirm(true)}  // ← confirm dikhao
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
			<Route path="/Checkout" element={
			 <ProtectedRoute>
			  <Checkout />
			 </ProtectedRoute>
			 }
			 />
			<Route path="/OrderSuccess" element={<OrderSuccess />} />
		  </Routes>
		  {showLogoutConfirm && (
			  <div style={{
				position: "fixed",
				top: "20px",
				right: "20px",
				zIndex: 9999,
				minWidth: "300px",
				background: "white",
				borderRadius: "12px",
				boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
				overflow: "hidden",
				borderLeft: "5px solid #ff7750",
				animation: "slideIn 0.4s ease",
			  }}>
				<div className="d-flex align-items-center gap-3 px-3 py-3">
				  <div style={{
					background: "#ff7750",
					borderRadius: "50%",
					width: "36px", height: "36px",
					display: "flex", alignItems: "center", justifyContent: "center",
					flexShrink: 0,
				  }}>
					<i className="bi bi-exclamation-circle-fill text-white" style={{ fontSize: "16px" }}></i>
				  </div>
				  <span style={{ flex: 1, fontWeight: "500", color: "#333", fontSize: "15px" }}>
					Are you sure you want to logout?
				  </span>
				</div>

				<div className="d-flex gap-2 px-3 pb-3">
				  <button
					className="btn btn-danger w-50"
					onClick={logout}
				  >
					Yes, Logout
				  </button>
				  <button
					className="btn btn-outline-secondary w-50"
					onClick={() => setShowLogoutConfirm(false)}
				  >
					Cancel
				  </button>
				</div>

				<div style={{ height: "3px", background: "#f0f0f0" }}>
				  <div style={{
					height: "100%",
					background: "#ff7750",
					animation: "progress 5s linear forwards",
				  }} />
				</div>
			  </div>
)}
		</>
	  );
	}
	export default Navbar
