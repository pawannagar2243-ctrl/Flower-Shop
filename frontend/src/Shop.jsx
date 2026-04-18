import "./App.css";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";

function Shop() {
  const [datafetch, setDatafetch] = useState([]);
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
  const [product, setProduct] = useState([null]);
  const [qty, setQty] = useState(1);
  
  const handleAddToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find(
    (cartItem) => cartItem._id === item._id
  );

  if (existingProduct) {
    existingProduct.qty += 0;
  } else {
    cart.push({
      _id: item._id,
      Name: item.Name,
      Price: item.Price,
      Image: item.Image,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
  alert("Product added to cart 🛒");  
};

  return (
    <>
      <div className="container border-bottom">
        <h5 className="fw-bold fs-5">Shop</h5>
      </div>

      <div className="container">
        <p className="pt-4">
          Showing all {datafetch.length} results
        </p>

        <div className="row g-4 py-4">
          {datafetch.map((item) => (
            <div className="col-6 col-md-3" key={item._id}>
              <div className="position-relative product-card">

                {/* SALE BADGE */}
                <span
                  className="badge bg-white text-dark position-absolute"
                  style={{
                    top: "10px",
                    left: "10px",
                    padding: "8px 14px",                    
                    borderRadius: "20px",
                    fontSize: "14px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  Sale!
                </span>
				<span className="badge cart-icon bg- text-dark position-absolute"style={{
                    padding: "5px 5px",                    
                    borderRadius: "70px",
                    fontSize: "14px",
                   
                  }}><i className="bi bi-cart3" onClick={() => handleAddToCart(item)}></i></span>

                <Link to={`/product/${item._id}`}className="nav-link p-0">
                  <img src={`https://flower-shop-3b6m.onrender.com/uploads/${item.Image}`}
                   className="card-img-top product-img"alt={item.Name}style={{height: "320px",objectFit: "cover",borderRadius: "12px",}}/></Link>
              </div>

              {/* PRODUCT INFO */}
              <div className="text-center py-2">
                <p className="my-0 text-muted">{item.Category}</p>
                <p className="my-0 fw-semibold">{item.Name}</p>
                <p className="my-0 text-muted">☆ ☆ ☆ ☆ ☆</p>
                <p className="fw-bold text-muted">
                  <span className="fw-bold text-decoration-line-through px-2">
                    ₹{item.discount}
                  </span>
                  ₹{item.Price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Shop;
