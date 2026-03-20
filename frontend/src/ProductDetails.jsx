import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();
  const [datafetch, setDatafetch] = useState([]);
  const { id } = useParams();    
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  
  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      const isHidden = !entry.isIntersecting;
      setShowSticky(isHidden);
      // ← Footer ko batao
	  window.dispatchEvent(new CustomEvent("stickyBar", { detail: isHidden }));
    },
    { threshold: 0 }
  );

  const target = document.getElementById("product-main-section");
  if (target) observer.observe(target);

  return () => observer.disconnect();
}, [product]);

  useEffect(() => {
    axios.get(`https://flower-shop-3b6m.onrender.com/productForm/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  
  const fetchData = async () => {
    try {
      const res = await axios.get("https://flower-shop-3b6m.onrender.com/productForm");
      setDatafetch(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
   const handleAddToCart = (item = null) => {  // ← item = null add karo
  const selectedProduct = item || product;
  const selectedQty = item ? 1 : qty;

  if (selectedQty === 0) {
    alert("Please select quantity first!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((c) => c._id === selectedProduct._id);

  if (existingProduct) {
    existingProduct.qty += selectedQty;
  } else {
    cart.push({
      _id: selectedProduct._id,
      Name: selectedProduct.Name,
      Price: selectedProduct.Price,
      Image: selectedProduct.Image,
      qty: selectedQty,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
  alert("Product added to cart 🛒");
};

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <>
      <div className="container-fluid my-5" id="product-main-section"> 
        <div className="row g-2">
          <div className="col-lg-6 px-5">
            <span className="badge bg-light text-dark position-absolute m-3">
              Sale!
            </span>
            <img
              src={`https://flower-shop-3b6m.onrender.com/uploads/${product.Image}`}
              className="w-100"
              alt={product.Name}
            />
          </div>

         <div className="col-lg-6 ">
          <p className="text-danger fw-semibold">{product.Category}, ROSE</p>

          <h2 className="fw-bold mb-3">{product.Name}</h2>

          <h4 className="mb-3">
            <del className="text-muted me-2">₹{product.discount}</del>
            <span className="fw-bold">₹{product.Price}</span>
            <span className="text-muted fs-6"> & Free Shipping</span>
          </h4>

          <p className="text-muted">
            Whether it’s a gesture of love, a token of appreciation, or a
            moment of celebration, our stunning flower bouquet is the perfect
            embodiment of nature’s finest artistry.
          </p>

          <div className="d-flex flex-wrap align-items-center gap-3 my-4">
            <div className="d-flex border">
              <button className="btn btn-outline-secondary"onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
              <input type="text"className="form-control text-center border-0"style={{ width: "50px" }} value={qty}readOnly/>
              <button className="btn btn-outline-secondary"onClick={() => setQty(qty + 1)}
              >+</button>
            </div>

            <button className="btn btn-danger px-4 text-white fw-semibold"   onClick={() => handleAddToCart()}> ADD TO CART</button>
            <button className="btn btn-primary px-4 text-white fw-semibold" onClick={() =>
			   navigate("/Checkout", {
			    state: {
			      product: product,
			      qty: qty,
			    },
			  })
}> Buy Now</button>
          </div>

          <p className="mb-2">
            Categories: <span className="text-danger">{product.Category}, Rose</span>
          </p>

          <p className="fw-semibold">Free shipping on orders over $50!</p>

          <ul className="list-unstyled text-muted">
            <li><i className="bi bi-check-circle me-2"></i>No-Risk Money Back Guarantee</li>
            <li><i className="bi bi-check-circle me-2"></i>No Hassle Refunds</li>
            <li><i className="bi bi-check-circle me-2"></i>Secure Payments</li>
          </ul>

          <div className="border rounded-3 p-3 text-center ">
            <h6 className="fw-semibold mb-4">Guaranteed Safe Checkout</h6>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" height="35" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" height="35" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" height="35" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" height="35"/>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div className="container-fluid px-5 ">
        <ul className="nav border-top mb-4">
          <li className="nav-item">
            <button className={`nav-link ${!showReview ? "active" : ""}`}onClick={() => setShowReview(false)}>Description</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${showReview ? "active" : ""}`}onClick={() => setShowReview(true)}>Reviews (0)</button>
          </li>
        </ul>

        {!showReview && (
          <p className="text-muted">Discover the essence of elegance with our exquisite flower bouquet. Each bloom in this carefully crafted arrangement is a testament to nature’s beauty, meticulously handpicked to create a symphony of colors and fragrances. Whether it’s a gesture of love, a token of appreciation, or a moment of celebration, our stunning flower bouquet is the perfect embodiment of nature’s finest artistry.</p>
        )}

        {showReview && (
		<div className="container-fluid my-5">
		  <div className="row border">
			<div className="col-lg-10">

			  <h4 className="fw-semibold mb-2">
				Be the first to review <span className="fw-bold">“Winkle Flower Bouquet”</span>
			  </h4>

			  <p className="text-muted">
				Your email address will not be published. Required fields are marked *
			  </p>
			  
			  <div className="mb-4">
				<label className="form-label fw-semibold">
				  Your rating <span className="text-danger">*</span>
				</label>
				<div>
				  {[1, 2, 3, 4, 5].map((star) => (
					<i
					  key={star}
					  className={`bi ${
						star <= rating ? "bi-star-fill text-warning" : "bi-star"
					  } fs-3 me-1`}
					  style={{ cursor: "pointer" }}
					  onClick={() => setRating(star)}
					></i>
				  ))}
				</div>
			  </div>

			  <div className="mb-4">
				<label className="form-label fw-semibold">
				  Your review <span className="text-danger">*</span>
				</label>
				<textarea className="form-control"rows="5"placeholder="Write your review..."
				></textarea>
			  </div>
			  
			  <div className="row mb-4">
				<div className="col-md-6 mb-3 mb-md-0">
				  <label className="form-label fw-semibold">Name <span className="text-danger">*</span>
				  </label>
				  <input type="text" className="form-control" />
				</div>

				<div className="col-md-6">
				  <label className="form-label fw-semibold">Email <span className="text-danger">*</span>
				  </label>
				  <input type="email" className="form-control" />
				</div>
			  </div>

			  <div className="form-check mb-4">
				<input className="form-check-input" type="checkbox" />
				<label className="form-check-label text-muted">
				  Save my name, email, and website in this browser for the next time I comment.
				</label>
			  </div>
			  <button className="btn btn-danger px-5 py-2 fw-semibold">SUBMIT</button>

			</div>
		  </div>
		 </div>

		)}
		</div>
		
		<div className="container-fluid px-5 py-5">
        <h5 className="fw-bold mb-3">Related Products</h5>
        <div className="row g-4">
          {datafetch.slice(0, 4).map((item) => (
            <div className="col-6 col-md-3 position-relative product-card" key={item._id}>
			<span className="badge cart-icon bg- text-dark position-absolute"style={{
					right:"20px",
                    padding: "5px 5px",                    
                    borderRadius: "70px",
                    fontSize: "14px",
                   
                  }}><i className="bi bi-cart3" onClick={() => handleAddToCart(item)}></i></span>
               <Link to={`/product/${item._id}`}className="nav-link p-0">
                  <img src={`https://flower-shop-3b6m.onrender.com/uploads/${item.Image}`}
                   className="card-img-top"alt={item.Name}style={{height: "320px",objectFit: "cover",borderRadius: "12px",}}/></Link>
              <div className="text-center py-2">
                <p className="my-0 text-muted">{item.Category}</p>
                <p className="my-0 fw-semibold">{item.Name}</p>
                <p className="my-0 text-muted">☆ ☆ ☆ ☆ ☆</p>
                <p className="fw-bold text-muted "><span className="fw-bold text-decoration-line-through px-2"> ₹{item.discount}</span>₹{item.Price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
	  
<div className="position-fixed bottom-0 start-0 w-100 bg-white shadow-lg border-top py-3 px-4"
	  style={{
		zIndex: 1050,
		transform: showSticky ? "translateY(0)" : "translateY(100%)",
		transition: "transform 0.4s ease",  // ← smooth animation
	  }}
	>
  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">

    {/* Product Name */}
    <div className="d-flex align-items-center gap-3">
      <img
        src={`https://flower-shop-3b6m.onrender.com/uploads/${product && product.Image}`}
        alt={product && product.Name}
        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
      />
      <div>
        <p className="mb-0 fw-bold">{product && product.Name}</p>
        <p className="mb-0 text-danger fw-semibold">₹{product && product.Price}</p>
      </div>
    </div>

    {/* Quantity */}
    <div className="d-flex border align-items-center">
      <button className="btn btn-outline-secondary btn-sm" onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
      <input type="text" className="form-control text-center border-0" style={{ width: "50px" }} value={qty} readOnly />
      <button className="btn btn-outline-secondary btn-sm" onClick={() => setQty(qty + 1)}>+</button>
    </div>

    {/* Add to Cart */}
    <button className="btn btn-danger px-4 fw-semibold" onClick={() => handleAddToCart()}>
      ADD TO CART
    </button>

  </div>
</div>
    </>
  );
}

export default ProductDetails;
