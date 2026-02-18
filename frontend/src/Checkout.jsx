import { useEffect, useState } from "react";
import axios from "axios";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [validation, setValidation] = useState({});

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);

    let sum = 0;
    cartData.forEach((item) => {
      sum += item.Price * item.qty;
    });
    setTotal(sum);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let validation = {};

    if (!form.name.trim()) validation.name = "Name is required";

    if (!form.phone.trim()) {
      validation.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      validation.phone = "Enter valid 10 digit phone number";
    }

    if (!form.address.trim()) validation.address = "Address is required";
    if (!form.city.trim()) validation.city = "City is required";

    if (!form.pincode.trim()) {
      validation.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      validation.pincode = "Enter valid 6 digit pincode";
    }

    if (!paymentMethod) validation.payment = "Select payment method";

    setValidation(validation);
    return Object.keys(validation).length === 0;
  };

  // ================= PLACE ORDER =================
  const placeOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post("https://flower-shop-3b6m.onrender.com/place-order", {
        ...form,
		userId: localStorage.getItem("userId"),
        products: cart,
        total,
        paymentMethod,
        paymentStatus:
          paymentMethod === "Cash on Delivery" ? "Pending" : "payment ho gaya",
      });

      if (res.data.success) {
        alert("Order placed successfully");

        localStorage.removeItem("cart");
        setCart([]);
        setTotal(0);
        setForm({
          name: "",
          phone: "",
          address: "",
          city: "",
          pincode: "",
        });
        setPaymentMethod("");
        setErrors({});
      }
    } catch (err) {
     
    }
  };

  return (
    <div className="container my-5">
      <form onSubmit={placeOrder}>
        <div className="row">
          <div className="col-md-7">
            <h4>Billing Details</h4>

            <input
              className="form-control mb-1"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {validation.name && <small className="text-danger">{validation.name}</small>}

            <input
              className="form-control mb-1 mt-3"
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            {validation.phone && <small className="text-danger">{validation.phone}</small>}

            <textarea
              className="form-control mb-1 mt-3"
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            {validation.address && <small className="text-danger">{validation.address}</small>}

            <div className="row mt-3">
              <div className="col">
                <input
                  className="form-control mb-1"
                  placeholder="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
                {validation.city && <small className="text-danger">{validation.city}</small>}
              </div>

              <div className="col">
                <input
                  className="form-control mb-1"
                  placeholder="Pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
                {validation.pincode && (
                  <small className="text-danger">{validation.pincode}</small>
                )}
              </div>
            </div>

            {/* ================= PAYMENT ================= */}
            <h4 className="mt-4">Payment Method</h4>

            {validation.payment && (
              <small className="text-danger d-block mb-2">{validation.payment}</small>
            )}

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Online Payment</label>
            </div>
          </div>

          {/* ================= SUMMARY ================= */}
           <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Order Summary</h5>
                <hr />

                {cart.length === 0 && <p className="text-muted">No products in cart</p>}

                {cart.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={`https://flower-shop-3b6m.onrender.com/uploads/${item.Image}`}
                        alt={item.Name}
                        width="50"
                        height="50"
                        className="rounded me-2"
                      />
                      <div>
                        <div className="fw-bold">{item.Name}</div>
                        <small className="text-muted">Qty: {item.qty}</small>
                      </div>
                    </div>
                    <strong>₹{item.Price * item.qty}</strong>
                  </div>
                ))}

                <hr />
                <h5 className="d-flex justify-content-between">
                  <span>Total:</span>
                  <span>₹{total}</span>
                </h5>

                <button
                  type="submit"
                  className="btn btn-success w-100 mt-3"
                  disabled={cart.length === 0}
                >
                  {paymentMethod === "ONLINE"
                    ? "Pay & Place Order"
                    : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
