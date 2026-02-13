import './App.css'
import { Routes, Route,Link } from "react-router-dom";
function About() {
  return (
    <>
    <section
      className="d-flex align-items-center justify-content-center text-center text-white"
      style={{
        height: "550px",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('about-hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container px-3 ">

        <h6 className="text-uppercase fw-bold mb-3">About Us</h6>

        <h1 className="fw-bold display-4">
          Embarking on the Path to 
        </h1>

        <h2 className="fw-semibold mb-4">Our Dreams</h2>

        <p className="lead mx-auto" style={{ maxWidth: "920px" }}>
          Share some details here. This is a flexible section where you can
          share anything you want. It could be details or some information.
        </p>
      </div>
    </section>
	
	<div className="container py-5 "style={{paddingBottom:"50px"}}>
		  <div className="row align-items-center">
			<div className="col-md-6 d-flex gap-4 justify-content-center mb-3 mb-md-0">
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
			<div className="col-md-6"style={{ marginTop:"105px" }}>

			  <h6 className="fw-bold mb-3 " style={{ color: "#d56a47" }}>
				About Florist
			  </h6>

			  <h2 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
				Blossoming Your Special Moments with Nature's Finest
			  </h2>

			  <p className="text-muted mb-4">
				Welcome to the heart of Florist, where our love for flowers blooms into exquisite arrangements that celebrate life's most cherished moments. In this corner of the internet, we invite you to discover our passion, our team, and the essence of what makes Florist a blooming success. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
			  </p>
			</div>
		  </div>
    </div>
	
    <div className="container-fluid  px-5 py-5 " style={{backgroundColor:"#180000" }}>
      <div className="row align-items-center ">
        <div className="col-md-6 " style={{marginTop:"-30px"}}>

          <h6 className="fw-bold mb-3" style={{ color: "#d56a47" }}>
          Our Story
          </h6>

          <h2 className="fw-semibold mb-6 text-white" style={{fontSize: "3.0rem" }}>
           A Journey from Passion to Florist
          </h2>

          <p className="text-white  ">
            Our journey began with a seed of passion that blossomed into a flourishing business. Allow us to share the story of our founder's deep-rooted love for flowers and how it led to the creation of your trusted floral destination. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.<br/><br/>
         
            Explore the tale of dedication, creativity, and a vision to spread the joy of nature’s beauty through the art of floral design. Discover the moments that shaped our founder’s path and paved the way for Florist to become a symbol of floral excellence.
          </p>
        </div>
		
		<div className="col-md-6 d-flex gap-3 justify-content-end" style={{ position: "relative", bottom: "110px"  }}>
		  <img
			src="our-story.jpg"
			alt="florist"
			className="img-fluid story-img"
			style={{
			  width: "90%",
			  height: "600px",
			  maxHeight:"outo",
			  objectFit: "cover",
			  borderRadius: "280px 280px 0 0",
			}}
		  />
		</div>
		<div className="container-fluid border  border-end-0 border-start-0" style={{ marginTop: "-70px" }}>
		  <div className="row text-center justify-content-center align-items-center"style={{paddingTop:"30px"}}>

			<div className="col-6 col-md-3 mb-0">
			  <h2 className="fw-bold text-white">500k+</h2>
			  <p className="text-white">Happy Customers</p>
			</div>

			<div className="col-6 col-md-3 mb-0">
			  <h2 className="fw-bold text-white">400+</h2>
			  <p className="text-white">Products</p>
			</div>

			<div className="col-6 col-md-3 mb-0">
			  <h2 className="fw-bold text-white">43+</h2>
			  <p className="text-white">Worldwide Shop</p>
			</div>

			<div className="col-6 col-md-3 mb-0">
			  <h2 className="fw-bold text-white">8+</h2>
			  <p className="text-white">Winning Awards</p>
			</div>

		  </div>
		</div>


      </div>
    </div>
	
	<div className="container py-5  ">
	 <div className="container-fluid">
	  <img src="Full image.jpg"className="h-100 w-100 rounded-4"/>
	 </div>
    <div className="row mt-4">	
	  <div className="col-12 col-md-6">
	    <div className="text-start w-100 h-100 ">
		  <p className="stars fs-4">Our Vision</p>
		  <p>
			At Florist, our vision is to be the guiding light for floral elegance and creativity. We aspire to inspire, by reimagining the way flowers connect people, bring joy, and create lasting memories. We envision a world where every gesture, whether grand or subtle, is accompanied by the enchantment of flowers.
		  </p>
		 </div>
		</div>
		<div className="col-12 col-md-6 ">
		  <div className="text-start w-100 h-100 ">
			<p className="stars fs-4 ">Our Mission</p>
			<p>
			  Our mission is to craft floral artistry that elevates moments into memories. With dedication and expertise, we strive to provide our customers with the freshest, most enchanting blooms and personalized service that reflects the beauty and emotions of every occasion.
			</p>
		  </div>
	    </div>
	  </div>	
	</div>
	
	
		<div className="container-fluid py-5"style={{backgroundColor:"#FEF7F5"}}>
		 
		  
		  <div className="text-center mb-5">
			<h6 className="fw-bold" style={{ color: "#d46a4b", letterSpacing: "2px", }}>
			  Our Team

			</h6>

			<h1 className="fw-bold" style={{ fontSize: "2.8rem" }}>
			  Our Dedicated Team of Enthusiasts​
			</h1>

			<p className="text-muted mt-3">
			  Share some details here. This is Flexible section where you can share anything you want.
			</p>
		  </div>
		  <div className="row g-4 px-3">
			<div className="col-6 col-md-3">
			 <img src="team-skip-01.jpg"className="img-fluid" style={{borderRadius: "280px 280px 20px 20px"}}/>
			   <div className="text-center py-2 ">
		         <p className="my-0 fw-semibold fs-5">Elizabeth B.</p>
			     <p className="my-0 text-muted">Ownert</p>
               </div>
			</div>
			 <div className="col-6 col-md-3">
			  <img src="team-skip-02.jpg"className="img-fluid"style={{borderRadius: "280px 280px 20px 20px"}}/>
			    <div className="text-center py-2 ">
		         <p className="my-0 fw-semibold fs-5">Amelia M.</p>
			     <p className="my-0 text-muted">Co-Founder</p>
               </div>
			</div>
		    <div className="col-6 col-md-3">
		      <img src="team-skip-03.jpg"className="img-fluid"style={{borderRadius: "280px 280px 20px 20px"}}/>
			    <div className="text-center py-2 ">
		         <p className="my-0 fw-semibold fs-5">Victoria D.</p>
			     <p className="my-0 text-muted">Marketing Manager</p>
               </div>
		    </div>
		    <div className="col-6 col-md-3">
		      <img src="team-skip-04.jpg"className="img-fluid"style={{borderRadius: "280px 280px 20px 20px"}}/>
			   <div className="text-center py-2 ">
		         <p className="my-0 fw-semibold fs-5">Audrey S.</p>
			     <p className="my-0 text-muted">Florist</p>
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
             CALL TO ACTION
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

export default About;