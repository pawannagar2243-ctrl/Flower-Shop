import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const increaseQty = (id) => {
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map(item =>
      item._id === id && item.qty > 0
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.Price * item.qty,
    0
  );

  return (
    <div className="container-fluid px-5 py-5">
      <h2 className="mb-4">Cart</h2>

      <div className="row">
     
        <div className="col-lg-8">
          <table className="table align-middle">
            <thead style={{ background: "#fff6f1" }}>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map(item => (
                <tr key={item._id}>
                  <td className="d-flex align-items-center gap-3">
                    <button
                      className="btn btn-light rounded-circle"
                      onClick={() => removeItem(item._id)}
                    >
                      ✕
                    </button>

                    <img
                      src={`http://localhost:5000/uploads/${item.Image}`}
                      width="70"
                      height="70"
                      style={{ objectFit: "cover" }}
                    />

                    <span className="text-danger fw-semibold">
                      {item.Name}
                    </span>
                  </td>

                  <td>₹{item.Price}.00</td>

                  <td>
                    <div className="d-flex flex-wrap align-items-center gap-3  border rounded-2" style={{width:"111px"}}>
                      <button
                        className="btn btn-outline-secondary "
                        onClick={() => decreaseQty(item._id)}
                      >-</button>
                      <span className="">{item.qty}</span>
                      <button
                        className="btn btn-outline-secondary  "
                        onClick={() => increaseQty(item._id)}
                      >+</button>
                    </div>
                  </td>

                  <td className="fw-semibold">
                    ₹{item.Price * item.qty}.00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      
        <div className="col-lg-4 py-5">
          <div className="border p-4">
            <h4 className="mb-4">Cart totals</h4>

            <div className="d-flex justify-content-between mb-3">
              <span>Subtotal</span>
              <span>₹{subtotal}.00</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold mb-4">
              <span>Total</span>
              <span>₹{subtotal}.00</span>
            </div>

            <button
              className="btn w-100 text-white fw-bold mb-3"
              style={{ backgroundColor: "#ff6f4f" }}
			  onClick={() => navigate("/Checkout")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
