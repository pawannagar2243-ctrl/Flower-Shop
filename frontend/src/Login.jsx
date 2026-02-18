import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function Login() {
  const navigate = useNavigate()
  const [forgot, setForgot] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    checkbox: false,
  });

  const handelChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const handelSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("https://flower-shop-3b6m.onrender.com/login", {
      email: data.email,
      password: data.password,
    });

    if (res.data.token) {
      alert("Login Success");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loginUser", JSON.stringify(res.data.user));
      localStorage.setItem("userId", res.data.user._id); // 👈 FIXED

      navigate("/");
      window.location.reload();
    }
  } catch (err) {
    alert("Invalid Email or Password");
    console.log(err);
  }
};




  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "380px" }}>
        <div className="card-body p-4">

          {!forgot && (
            <form onSubmit={handelSubmit}>
              <h4 className="text-center mb-4">Login</h4>

              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Email"
                value={data.email}
                onChange={handelChange}
                required
              />

              <input
                type="password"
                name="password"
                className="form-control mb-3"
                placeholder="Password"
                value={data.password}
                onChange={handelChange}
                required
              />

              <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="checkbox"
                    type="checkbox"
                    checked={data.checkbox}
                    onChange={handelChange}
                  />
                  <label className="form-check-label">
                    Remember me
                  </label>
                </div>

                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setForgot(true)}
                >
                  Forgot password?
                </span>
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Login
              </button>

              <p className="text-center mb-0">
                Don’t have an account?
                <Link to="/Signup" className="fw-bold text-primary ms-1">
                  Sign up
                </Link>
              </p>
            </form>
          )}

          {forgot && (
            <>
              <h4 className="text-center mb-3">Forgot Password</h4>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter email"
              />
              <button className="btn btn-primary w-100 mb-3">
                Send Reset Link
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => setForgot(false)}
              >
                Back to Login
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;
