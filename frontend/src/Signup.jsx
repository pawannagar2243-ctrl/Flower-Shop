import { Link } from "react-router-dom"; 
import { useState } from "react";
import axios from "axios";
import "./App.css";

function Signup() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
	image:"",
  });

  const handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", image);

    await axios.post("http://localhost:5000/signup",
      formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("User add ho gaya ");

    setData({ username: "", email: "", password: "" });
    setImage(null);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "350px" }}>
        <form onSubmit={handelSubmit}>
          <h4 className="text-center mb-3">Sign up</h4>

          <input
            className="form-control mb-2"
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handelChange}
            required
          />

          <input
            className="form-control mb-2"
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handelChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handelChange}
            required
          />

          <input
            className="form-control mb-2"
            type="file"
			name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <button className="btn btn-primary w-100">Submit</button>

          <Link to="/Login" className="nav-link text-center mt-2">
            Already have an account?
            <span className="text-primary"> Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
