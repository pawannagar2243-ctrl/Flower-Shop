import './App.css'
import { useEffect, useState } from "react";
import { Routes, Route,Link } from "react-router-dom";
import ProductDetails from './ProductDetails';
import axios from "axios";
function Home() {
	 const API = import.meta.env.VITE_API_URL;
	 const data = [
    {
      num: "01",
      title: "Order Online",
      desc: "Share some details here. This is Flexible section where you can share anything you want."
    },
    {
      num: "02",
      title: "Free Shipping",
      desc: "Share some details here. This is Flexible section where you can share anything you want."
    },
    {
      num: "03",
      title: "More Freshness",
      desc: "Share some details here. This is Flexible section where you can share anything you want."
    },
    {
      num: "04",
      title: "Safe Payment",
      desc: "Share some details here. This is Flexible section where you can share anything you want."
    }
  ];
    const [datafetch, setDatafetch] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/productForm`);
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
    existingProduct.qty += 1;
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
  alert("Product added to cart 🛒");
};
  return (
    <>
     <section className="d-flex align-items-center justify-content-center text-center text-white"
      style={{height:"550px",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(' background image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="container px-3">

        <h6 className="text-uppercase fw-bold mb-4">Welcome to Florist</h6>

        <h1 className="fw-bold display-1">
          Let's Make Beautiful Flowers a Part of Your Life.
        </h1>
        <p className="lead mx-auto justify-content-center text-center" style={{ maxWidth: "900px" }}>
          Explore a vibrant tapestry of blooms and arrangements that add color, fragrance, and elegance to your life. Discover the perfect floral expression for every moment and occasion.
        </p>
        <div className=" d-flex justify-content-center Text-white">
           <button className="btn " style={{backgroundColor:"#FF6E4E"}}><a className="nav-link" href="#"> SHOP NOW</a></button>
        </div>
      </div>
    </section>
	
    <div className="container-fluid py-5 "style={{backgroundColor:"#FEF7F5" }} >
      <div className="container-fluid">
		  <div className="row">

			{data.map((item, i) => (
			  <div className="col-md-3 col-sm-6 mb-4"key={i}>
				<div className="px-3 border-start border-danger">
				  
				  <h6 className="fw-bold mb-3" style={{ color: "#e26c5a" }}>
					{item.num}
				  </h6>

				  <h5 className="fw-bold mb-3">
					{item.title}
				  </h5>

				  <p style={{ color: "#666" }}>
					{item.desc}
				  </p>
				</div>
			  </div>
			))}

		  </div>
	  </div>
    </div>
	
	
	 <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 d-flex gap-4 justify-content-center mb-4 mb-md-0">
          <img
            src="https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/about-01.jpg"
            alt="flowers"
            style={{
              width: "45%",
			  marginTop:"70px",
              height: "350px",
              objectFit: "cover",
              borderRadius: "150px 150px 10px 10px" 
            }}
          />

          <img
            src="https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/about-02.jpg"
            alt="florist"
            style={{
              width: "55%",
              height: "420px",
              objectFit: "cover",
              borderRadius: "200px 200px 10px 10px"
            }}
          />

        </div>
        <div className="col-md-6"style={{ marginTop:"80px" }}>

          <h6 className="fw-bold mb-3" style={{ color: "#d56a47" }}>
            ABOUT FLORIST
          </h6>

          <h2 className="fw-bold mb-4" style={{ fontSize: "2.5rem" }}>
            Blossoming Your Special Moments with Nature's Finest
          </h2>

          <p className="text-muted mb-4">
            Welcome to Florist, where floral artistry meets passion for nature's
            beauty. Our story is rooted in a deep love for flowers and a
            commitment to creating unforgettable moments for our customers.
          </p>

          <button className="btn text-white px-4 py-2" style={{ backgroundColor: "#ff7d5a", borderRadius: "8px" }}><a className="nav-link" href="#">READ MORE</a></button>

        </div>
      </div>
    </div>
	
<div className="container-fluid py-5 "style={{backgroundColor:"#FEF7F5" }} >
	<div className="container py-5"style={{backgroundColor:"#FEF7F5"}}>
     
      
      <div className="text-center mb-5">
        <h6 className="fw-bold" style={{ color: "#d46a4b", letterSpacing: "2px", }}>
          NEW ARRIVAL</h6>

        <h1 className="fw-bold" style={{ fontSize: "2.8rem" }}>
          Discover the Latest Additions at Your Top <br /> Choice Flower Shop
        </h1>

        <p className="text-muted mt-3">
          Share some details here. This is Flexible section where you can share anything you want.
        </p>
      </div>

     
      <div className="row g-4">

       {datafetch.slice(0, 6).map((item) => (
        <div className="col-md-4 col-sm-6 col-12" key={item._id}>
          <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <div className="position-relative product-card">
              <span
                className="badge bg-white text-dark position-absolute"
                style={{
                  top: "10px",
                  left: "10px",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                }}
              >
                Sale!
              </span>
			  <span className="badge cart-icon bg- text-dark position-absolute"style={{
                    padding: "5px 5px",                    
                    borderRadius: "70px",
                    fontSize: "14px",
                   
                  }}><i className="bi bi-cart3" onClick={() => handleAddToCart(item)}></i></span>


              <Link to= {`/product/${item._id}`} className="nav-link"><img
               src={`${API}/uploads/${item.Image}`}

                  className="card-img-top"
                  alt={item.Name}
                style={{ height: "380px", objectFit: "cover", borderRadius: "12px" }}
              /></Link>
            </div>
          </div>
		   <div className="text-center py-2 ">
		    <p className="my-0 text-muted">{item.Category}</p>
			<p className="my-0 fw-semibold">{item.Name}</p>
			<p className="my-0 text-muted">☆ ☆ ☆ ☆ ☆</p>
			<p className="fw-bold text-muted "><span className="fw-bold text-decoration-line-through px-2"> ₹{item.discount}</span>₹{item.Price}</p>
          </div>
        </div>
		 ))}

       
        
      </div>
    </div>
    </div>

   <div className="container-fluid py-3 " style={{backgroundColor:"#180000" }}>
      <div className="row align-items-center">
        <div className="col-md-6 d-flex gap-4 justify-content-center mb-4 mb-md-0">
          <img
            src="https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/offer.jpg"
            alt="florist"
            style={{
              width: "90%",
              height: "500px",
              objectFit: "cover",
			  position:"relative",
			  top:"17px",
              borderRadius: "280px 280px 0 0"
            }}
          />

        </div>
        <div className="col-md-6">

          <h6 className="fw-bold mb-3" style={{ color: "#d56a47" }}>
           SPECIAL OFFER
          </h6>

          <h2 className="fw-semibold mb-6 text-white" style={{fontSize: "3.0rem" }}>
            Your Floral Journey Begins Here: Get 20% Off Your First Order!
          </h2>

         

          <button className="btn text-white px-4 py-2" style={{ backgroundColor: "#ff7d5a", borderRadius: "8px" }}><a className="nav-link" href="#">SHOP NOW</a></button>

        </div>
      </div>
    </div>



<div className="container-fluid py-5 "style={{backgroundColor:"#FEF7F5" }} >
	<div className="container py-5"style={{backgroundColor:"#FEF7F5"}}>
     
      
      <div className="text-center mb-5">
        <h6 className="fw-bold" style={{ color: "#d46a4b", letterSpacing: "2px", }}>
          BEST SELLING
        </h6>

        <h1 className="fw-bold" style={{ fontSize: "2.8rem" }}>
         Blossom with the Best Our Top-Selling <br/>Flowers
        </h1>

        <p className="text-muted mt-3">
          Share some details here. This is Flexible section where you can share anything you want.
        </p>
      </div>

     
      <div className="row g-4">

       
     {datafetch.slice(0, 6).map((item) => (
        <div className="col-md-4 col-sm-6 col-12" key={item._id}>
          <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <div className="position-relative product-card">
              <span
                className="badge bg-white text-dark position-absolute"
                style={{
                  top: "10px",
                  left: "10px",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                }}
              >
                Sale!
              </span>
			  <span className="badge cart-icon bg- text-dark position-absolute"style={{
                    padding: "5px 5px",                    
                    borderRadius: "70px",
                    fontSize: "14px",
                   
                  }}><i className="bi bi-cart3" onClick={() => handleAddToCart(item)}></i></span>


              <Link to= {`/product/${item._id}`} className="nav-link"><img
                src={`http://localhost:5000/uploads/${item.Image}`}
                  className="card-img-top"
                  alt={item.Name}
                style={{ height: "380px", objectFit: "cover", borderRadius: "12px" }}
              /></Link>
            </div>
          </div>
		   <div className="text-center py-2 ">
		    <p className="my-0 text-muted">{item.Category}</p>
			<p className="my-0 fw-semibold">{item.Name}</p>
			<p className="my-0 text-muted">☆ ☆ ☆ ☆ ☆</p>
			<p className="fw-bold text-muted "><span className="fw-bold text-decoration-line-through px-2"> ₹{item.discount}</span>₹{item.Price}</p>
          </div>
        </div>
		 ))}
      </div>
    </div>
</div>

	
	<div className="container-fluid py-5" style={{ width: "100%" }}>
		  
		  <div className="text-center mb-5">
			<h6 className="fw-bold" style={{ color: "#d46a4b", letterSpacing: "2px" }}>
			  TESTIMONIAL
			</h6>

			<h1 className="fw-semibold" style={{ fontSize: "2.8rem" }}>
			  Hear From Our Happy Customers
			</h1>

			<p className="text-muted mt-3">
			  Share some details here. This is a flexible section where you can share anything you want.
			</p>
		  </div>

		  <div className="row g-4 px-3">
			
			{/* CARD 1 */}
			<div className="col-lg-4 col-md-6 col-12">
			  <div className="p-3  text-center w-100 h-100 ">
				<p className="stars fs-4">⭐⭐⭐⭐⭐</p>
				<p>
				  I've been a loyal customer of Florist for years, and they never cease to amaze me.
				  The flowers are always fresh, the arrangements are stunning, and the service is top-notch.
				</p>

				<div className="d-flex justify-content-center align-items-center mt-3">
				  <img
					src="https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/testimonial-skip-01.jpg"
					style={{ borderRadius: "50%", height: "55px", width: "55px" }}
				  />
				  <div className="text-start px-3">
					<p className="fw-bold m-0">Steve Smith</p>
					<p className="text-muted" style={{ marginTop: "-2px" }}>Wedding Planner</p>
				  </div>
				</div>
			  </div>
			</div>

			{/* CARD 2 */}
			<div className="col-lg-4 col-md-6 col-12">
			  <div className="p-3  text-center h-100 ">
				<p className="stars fs-4">⭐⭐⭐⭐⭐</p>
				<p>
				  I've been a loyal customer of Florist for years, and they never cease to amaze me.
				  The flowers are always fresh, the arrangements are stunning, and the service is top-notch.
				</p>

				<div className="d-flex justify-content-center align-items-center mt-3">
				  <img
					src="https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/testimonial-skip-01-1.jpg"
					style={{ borderRadius: "50%", height: "55px", width: "55px" }}
				  />
				  <div className="text-start px-3">
					<p className="fw-bold m-0">Wade Warren</p>
					<p className="text-muted" style={{ marginTop: "-2px" }}>Designer</p>
				  </div>
				</div>
			  </div>
			</div>

			{/* CARD 3 */}
			<div className="col-lg-4 col-md-6 col-12">
			  <div className="p-3 text-center h-100">
				<p className="stars fs-4">⭐⭐⭐⭐⭐</p>
				<p>
				  I've been a loyal customer of Florist for years, and they never cease to amaze me.
				  The flowers are always fresh, the arrangements are stunning, and the service is top-notch.
				</p>

				<div className="d-flex justify-content-center align-items-center mt-3">
				  <img
					src="https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/testimonial-skip-02-1.jpg"
					style={{ borderRadius: "50%", height: "55px", width: "55px" }}
				  />
				  <div className="text-start px-3">
					<p className="fw-bold m-0">Mila Kunis</p>
					<p className="text-muted" style={{ marginTop: "-2px" }}>Business Owner</p>
				  </div>
				</div>
			  </div>
			</div>

		  </div>
		</div>	
	     
		 
    <div className="container-fluid py-3 " style={{backgroundColor:"#180000" }}>
      <div className="row align-items-center">
        <div className="col-md-6 d-flex gap-3 justify-content-center mb-4 mb-md-0">
          <img
            src="https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/cta.jpg"
            alt="florist"
            style={{
              width: "90%",
              height: "590px",
              objectFit: "cover",
			  position:"relative",
			  top:"16px",
              borderRadius: "280px 280px 0 0"
            }}
          />

        </div>
        <div className="col-md-6 px-0" style={{marginTop:"120px"}}>

          <h6 className="fw-bold mb-3" style={{ color: "#d56a47" }}>
          Call to action
          </h6>

          <h2 className="fw-semibold mb-6 text-white" style={{fontSize: "3.0rem" }}>
           Explore Our Exquisite Floral Collections & Shop Now for the Perfect Blooms
          </h2>

         

          <button className="btn text-white px-4 py-2" style={{ backgroundColor: "#ff7d5a", borderRadius: "8px" }}><a className="nav-link" href="#">SHOP NOW</a></button>

        </div>
      </div>
    </div>
    </>
  )
}

export default Home; 
