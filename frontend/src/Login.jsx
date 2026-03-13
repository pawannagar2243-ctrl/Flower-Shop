import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "./Toast";

const API = "https://flower-shop-3b6m.onrender.com"; // deploy ke time change kar dena

function Login() {
  const navigate = useNavigate();

  const [forgot, setForgot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // ---------------- LOGIN ----------------
  const handelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${API}/login`, data);
    showToast("Login Success ✅", "success");

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("loginUser", JSON.stringify(res.data.user));
    localStorage.setItem("userId", res.data.user._id);
     window.dispatchEvent(new Event("userLoggedIn"));
    setTimeout(() => navigate("/"), 1500);

  } catch (err) {
    showToast("Login Failed", "error");
  }
};

  // ---------------- SEND OTP ----------------
  const sendOtp = async () => {
    if (!forgotEmail) {
      alert("Enter Email First");
      return;
    }

    try {
      await axios.post(`${API}/send-otp`, {
        email: forgotEmail,
      });

      showToast("OTP Sent to your Email ✅", "success");
	  
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async () => {
    try {
      await axios.post(`${API}/verify-otp`, {
        email: forgotEmail.trim(),   // ← trim add karo
      otp: otp.trim(),             // ← trim add karo
      });

	  showToast("OTP Verified ✅", "success");
      setOtpVerified(true);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  // ---------------- RESET PASSWORD ----------------
  const resetPassword = async () => {
    try {
      await axios.post(`${API}/reset-password`, {
        email: forgotEmail,
        newPassword,
      });

      showToast("Password Updated Successfully ✅", "success");
	  

      setForgot(false);
      setOtpSent(false);
      setOtpVerified(false);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  return (
  <>
{toast && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={() => setToast(null)}
  />
)}
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "380px" }}>
        <div className="card-body p-4">

          {/* ---------------- LOGIN FORM ---------------- */}

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
                autoComplete="email"
                required
              />

              <input
                type="password"
                name="password"
                className="form-control mb-3"
                placeholder="Password"
                value={data.password}
                onChange={handelChange}
                autoComplete="current-password"
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

          {/* ---------------- FORGOT PASSWORD ---------------- */}

          {forgot && (
            <>
              <h4 className="text-center mb-3">Forgot Password</h4>

              {!otpSent && (
                <>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <button
				  type="button"
                    className="btn btn-primary w-100 mb-3"
                    onClick={sendOtp}
                  >
                    Send OTP
                  </button>
                </>
              )}

              {otpSent && !otpVerified && (
                <>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
				  type="button"
                    className="btn btn-success w-100 mb-3"
                    onClick={verifyOtp}
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {otpVerified && (
                <>
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    className="btn btn-warning w-100 mb-3"
                    onClick={resetPassword}
                  >
                    Reset Password
                  </button>
                </>
              )}

              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setForgot(false);
                  setOtpSent(false);
                  setOtpVerified(false);
                }}
              >
                Back to Login
              </button>
            </>
          )}

        </div>
      </div>
    </div>
	  </>
  );
}

export default Login;
