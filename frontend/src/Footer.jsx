import './App.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

function Footer() {
  const [stickyVisible, setStickyVisible] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowArrow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => setStickyVisible(e.detail);
    window.addEventListener("stickyBar", handler);
    return () => window.removeEventListener("stickyBar", handler);
  }, []);

  return (
    <>
      <div className="container-fluid py-5" style={{ background: "#fff7f4" }}>
        <div className="row gy-4">

          <div className="col-lg-5 col-md-6 col-12 px-5">
            <h4 className="fw-bold">Flower Shop</h4>
            <p>Welcome to the world of Florist, where flowers come to life with love and creativity. Discover our story, our passion for flowers, and our commitment to making every moment memorable.</p>
          </div>

          <div className="col-lg-3 col-md-6 col-12">
            <h4 className="fw-bold">Links</h4>
            <ul className="list-unstyled mt-2">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/About" className="nav-link">About</Link>
              <Link to="/Shop" className="nav-link">Shop</Link>
              <Link to="/Contact" className="nav-link">Contact</Link>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <h4 className="fw-bold">Contact Us</h4>
            <p className="mb-1">Address: 13 Fifth Avenue, New York 101660</p>
            <p className="mb-1">Email: contact@info.com</p>
            <p className="mb-1">Phone: +91 987 654 321</p>
          </div>

        </div>

        <div className="container-fluid border-top">
          <div className="row mt-5 align-items-center">

            <div className="col-md-6 col-12 text-center text-md-start">
              <p className="mb-0 px-4">Copyright © 2025 Flower Shop</p>
            </div>

            <div className="col-md-6 col-12 text-center text-md-end">
              <div className="d-flex gap-3 justify-content-center justify-content-md-end">
                <a href="https://www.facebook.com" target="_blank" className="text-black"><i className="bi bi-facebook"></i></a>
                <a href="https://twitter-lite.en.softonic.com/" target="_blank" className="text-black"><i className="bi bi-twitter"></i></a>
                <a href="https://www.instagram.com/" target="_blank" className="text-black"><i className="bi bi-instagram"></i></a>
                <a href="" className="text-black"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

          </div>
        </div>
      </div>

     {/* Arrow Up Button */}
<button
  className="btn"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  style={{
    position: "fixed",
    bottom: stickyVisible ? "90px" : "20px",
    right: "20px",
    zIndex: 1049,
    background: "#ff7750",
    color: "white",
    borderRadius: "20%",
    width: "42px",
    height: "42px",
    opacity: showArrow ? 1 : 0,
    visibility: showArrow ? "visible" : "hidden",
    transition: "opacity 0.4s ease, visibility 0.4s ease, bottom 0.4s ease",
  }}
>
  <i className="bi bi-arrow-up"></i>
</button>
    </>
  );
}

export default Footer;
