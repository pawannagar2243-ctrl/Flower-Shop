import './App.css'
import React, { useState } from "react";
import axios from 'axios';
function Contact() {
	
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.first.trim()) newErrors.first = "First name is required";
    if (!form.last.trim()) newErrors.last = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const res = await axios.post("http://localhost:5000/contact", form);
        console.log("Success:", res.data);
        setForm({
          first: "",
          last: "",
          email: "",
          message: ""
        });

      } catch (err) {
        if (err.response) {
          console.log(err.response.status, err.response.data);
        } else {
          console.log(err.message);
        }
      }
    }
  };

  return (
    <>
    <section className="d-flex align-items-center justify-content-center text-center text-white"
        style={{height:"550px",
        backgroundImage:
          "linear-gradient(rgba(0.5,0,0.9,0.5), rgba(0,0,0,0.5)), url(' contact-hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="container px-3">

        <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>

        <h1 className="fw-bold display-1">
          Get in Touch with Our Experts Team
        </h1>
        <p className="lead mx-auto justify-content-center text-center" style={{ maxWidth: "900px" }}>
         Share some details here. This is Flexible section where you can share anything you want. It could be details or some information.
        </p>
      </div>
    </section>
	
	  <div className="container py-5">

		  <div className="row g-5">
			<div className="col-12 col-md-6">

			  <h1 className="fw-bold" style={{color:"#2d1a19"}}>
				Get In Touch With Us
			  </h1>

			  <p className="text-muted">
				Share some details here. This is flexible section where you can share anything you want.
				It could be details or some information.
			  </p>

			  <h5 className="fw-bold mt-4">Address</h5>
			  <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>

			  <hr />

			  <div className="row">
				<div className="col-6">
				  <h6 className="fw-bold">Phone</h6>
				  <p>(+91) 823 953 7689</p>
				</div>
				<div className="col-6">
				  <h6 className="fw-bold">Email</h6>
				  <p>info@contact.com</p>
				</div>
			  </div>

			  <hr />

			  <h5 className="fw-bold">Social Media</h5>
			  <div className="d-flex gap-4 fs-4">
				<i className="bi bi-facebook"></i>
				<i className="bi bi-instagram"></i>
				<i className="bi bi-twitter"></i>
				<i className="bi bi-youtube"></i>
			  </div>

			</div>
			<div className="col-12 col-md-6">

			  <div className="row pt-3">
			   <form onSubmit={handleSubmit}>
				<label className="fw-bold">Name *</label>
				<div className="d-flex gap-2 mb-2">
				  <div className="w-50">
					<input
					  type="text"
					  name="first"
					  placeholder="First name"
					  className={`form-control ${errors.first ? "is-invalid" : ""}`}
					  value={form.first}
					  onChange={handleChange}
					/>
					{errors.first && (
					  <small className="text-danger">{errors.first}</small>
					)}
				  </div>

				  <div className="w-50">
					<input
					  type="text"
					  name="last"
					  placeholder="Last name"
					  className={`form-control ${errors.last ? "is-invalid" : ""}`}
					  value={form.last}
					  onChange={handleChange}
					/>
					{errors.last && (
					  <small className="text-danger">{errors.last}</small>
					)}
				  </div>
				</div>
				<div className="mb-3">
				  <label className="fw-bold">Email *</label>
				  <input
					type="email"
					placeholder="Enter your email"
					name="email"
					className={`form-control ${errors.email ? "is-invalid" : ""}`}
					value={form.email}
					onChange={handleChange}
				  />
				  {errors.email && (
					<small className="text-danger">{errors.email}</small>
				  )}
				</div>

				<div className="mb-3 pt-3">
				  <label className="fw-bold">Comment or Message</label>
				  <textarea
				  placeholder="Message"
					name="message"
					rows="4"
					className={`form-control ${errors.message ? "is-invalid" : ""}`}
					value={form.message}
					onChange={handleChange}
				  ></textarea>
				  {errors.message && (
					<small className="text-danger">{errors.message}</small>
				  )}
				</div>
				<button className="btn fw-bold text-white"style={{backgroundColor:"#FF6E4E"}} type="submit">
				  SUBMIT
				</button>
			  </form>
			</div>
			</div>
		  </div>
		</div>
		
		<div className="container-fluid py-5" style={{ backgroundColor: "#FEF7F5" }}>
        <div className="row ">
          <div className="col-lg-6 col-md-12 px-5">
            <h1 style={{ fontSize: "60px", fontWeight: "600", color: "#3d1d14" }}>
              FAQs
            </h1>
            <p style={{ fontSize: "15px", color: "#4b3b36" }}>
              Share some details here. This is flexible section where you can
              share anything you want. It could be details or some information.
            </p>
          </div>
          <div className="col-lg-6 col-md-12">

            {/* Q1 */}
            <div className="pb-4 mb-4" style={{ borderBottom: "1px solid #bda8a0" }}>
              <h5 style={{color: "#3d1d14" }}>
                How do I order flowers and choose delivery options?
              </h5>
              <p style={{ fontSize: "18px", color: "#4b3b36" }}>
                Simply browse our shop, select your bouquet, and follow the checkout process.
                You can choose the delivery date and time during checkout.
              </p>
            </div>

            {/* Q2 */}
            <div className="pb-4 mb-4" style={{ borderBottom: "1px solid #bda8a0" }}>
              <h5 style={{color: "#3d1d14" }}>
                What areas do you deliver to, and can I track my delivery?
              </h5>
              <p style={{ fontSize: "18px", color: "#4b3b36" }}>
                We deliver to [Service Areas], and you’ll receive a tracking number once the order is dispatched.
              </p>
            </div>

            {/* Q3 */}
            <div className="pb-4 mb-4" style={{ borderBottom: "1px solid #bda8a0" }}>
              <h5 style={{color: "#3d1d14" }}>
                How can I make my flowers last longer, and what if they arrive damaged?
              </h5>
              <p style={{ fontSize: "18px", color: "#4b3b36" }}>
                For longer-lasting blooms, trim stems, change water, and keep in a cool place.
                Contact us if your flowers arrive damaged for a replacement or refund.
              </p>
            </div>

            {/* Q4 */}
            <div>
              <h5 style={{color: "#3d1d14" }}>
                What is your return policy and cancellation policy?
              </h5>
              <p style={{ fontSize: "18px", color: "#4b3b36" }}>
                Contact us within [X days] for returns or exchanges.  
                Orders can be canceled up to [X hours/days] before the delivery date.
              </p>
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

export default Contact;
