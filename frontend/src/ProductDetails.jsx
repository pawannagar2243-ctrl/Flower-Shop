import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";

function ProductDetails() {
  const [datafetch, setDatafetch] = useState([]);
  const { id } = useParams();    
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);

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
  
    const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
	window.dispatchEvent(new Event("cartUpdated"));


    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      existingProduct.qty += qty;
    } else {
      cart.push({
        ...product,
        qty: qty,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart 🛒");
  };

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row g-2">
          <div className="col-lg-6 px-5">
            <span className="badge bg-light text-dark position-absolute m-3">
              Sale!
            </span>
            <img
              src={`https://flower-shop-3b6m.onrender.com/uploads/${item.Image}`}
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

            <button className="btn btn-danger px-4 text-white fw-semibold"  onClick={handleAddToCart}> ADD TO CART</button>
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
                <p className="fw-bold text-muted "><span className="fw-bold text-decoration-line-through px-2">₹127.00</span>₹{item.Price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
