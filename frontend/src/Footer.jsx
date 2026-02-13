import './App.css'
import { Routes, Route,Link } from "react-router-dom";
function Footer() {
  return (
    <>

<div className="container-fluid py-5 " style={{ background: "#fff7f4" }}>
    <div className="row gy-4">

    
      <div className="col-lg-5 col-md-6 col-12 px-5">
        <h4 className="fw-bold">Flower Shop</h4>
        <p>
          Welcome to the world of Florist, where flowers come to life with love
          and creativity. Discover our story, our passion for flowers, and our
          commitment to making every moment memorable.
        </p>
      </div>

     
      <div className="col-lg-3 col-md-6 col-12">
        <h4 className="fw-bold">Links</h4>
        <ul className="list-unstyled mt-2">
           <Link to= "/" className="nav-link">Home</Link>
           <Link to= "/About" className="nav-link" >About</Link>
           <Link to= "/Shop" className="nav-link" >Shop</Link>
           <Link to= "/Contact" className="nav-link" >Contact</Link>
        </ul>
      </div>

    
      <div className="col-lg-4 col-md-6 col-12">
        <h4 className="fw-bold">Contact Us</h4>
        <p className="mb-1">Address: 13 Fifth Avenue, New York 101660</p>
        <p className="mb-1">Email: contact@info.com</p>
        <p className="mb-1">Phone: +91 987 654 321</p>
      </div>

    </div>
   
	   <div className="container-fluid border-top ">
		<div className="row mt-5 align-items-center">
		  <div className="col-md-6 col-12 text-center text-md-start">
			<p className="mb-0 px-4">Copyright © 2025 Flower Shop</p>
		  </div>

		  <div className="col-md-6 col-12 text-center text-md-end text-align-center">
			<div className="d-flex gap-3 justify-content-center justify-content-md-end sticky-wrapper">
			   <a href="https://www.facebook.com"target="_blank"className="text-black"><i className="bi bi-facebook"></i></a>
			   <a href="https://twitter-lite.en.softonic.com/"target="_blank"className="text-black"><i className="bi bi-twitter"></i></a>
			   <a href="https://www.instagram.com/" target="_blank"className="text-black"><i className="bi bi-instagram"></i></a>
			   <a href=""className="text-black"><i className="bi bi-youtube"></i></a>

			<a href="#"className="nav-link ">
			   <button className="btn position-fixed bottom-0 end-0 m-4" style={{ background: "#ff7750",color:"white"}}><i className="bi bi-arrow-up"></i>
			  </button></a>
			</div>
		  </div>
		 </div>
    </div>
</div>

    </>
  )
}

export default Footer;
