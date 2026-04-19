import { useEffect, useState } from "react";
import axios from "axios";

function OrderSuccess(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Calculate days passed
  const getDaysPassed = (createdAt) => {
    if (!createdAt) return 0;
    const orderDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - orderDate);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  // ✅ Check if return is allowed (within 7 days)
  const isReturnAllowed = (createdAt) => {
    return getDaysPassed(createdAt) <= 7;
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get("https://flower-shop-3b6m.onrender.com/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://flower-shop-3b6m.onrender.com/cancel-order/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order Cancelled Successfully");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  const handleReturn = async (orderId, productId) => {
    if (!window.confirm("Request return for this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://flower-shop-3b6m.onrender.com/return-product",
        { orderId, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Return request sent successfully!");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Return failed");
    }
  };

  // ✅ Status Color Logic
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Shipped":
        return "primary";
      case "Cancelled":
        return "danger";
      case "Returned":
        return "warning";
      default:
        return "warning";
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4 border-bottom pb-2">📦 My Orders</h3>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          You have no orders yet.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card shadow-sm mb-4 border-0">
            {/* Order Header */}
            <div className="card-header bg-white d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <span className="text-muted small">Order ID: </span>
                <strong className="text-dark">{order._id}</strong>
              </div>
              <div>
                <span className={`badge bg-${getStatusClass(order.status)}`}>
                  {order.status || "Processing"}
                </span>
              </div>
            </div>

            {/* Order Body */}
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="mb-1 text-muted small">Order Date</p>
                  <h6>{new Date(order.createdAt).toLocaleString()}</h6>
                </div>
                <div className="col-md-6 text-md-end">
                  <p className="mb-1 text-muted small">Shipping Address</p>
                  <h6>{order.address || "N/A"}</h6>
                </div>
              </div>

              {/* Products Table */}
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" width="100">Product</th>
                      <th scope="col">Details</th>
                      <th scope="col" className="text-center">Price</th>
                      <th scope="col" className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products &&
                      order.products.map((p, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={`https://flower-shop-3b6m.onrender.com/uploads/${p.Image}`}
                              alt={p.Name}
                              className="rounded"
                              width="70"
                              height="70"
                              style={{ objectFit: "cover" }}
                            />
                          </td>
                          <td>
                            <strong>{p.Name}</strong>
                            <br />
                            <small className="text-muted">
                              Qty: {p.qty} × ₹{p.Price}
                            </small>
                            <br />
                            {/* Return Status Logic */}
                            {p.returnStatus ? (
                              <span className="badge bg-warning text-dark mt-1">
                                Return: {p.returnStatus}
                              </span>
                            ) : null}
                          </td>
                          <td className="text-center">
                            <strong>₹{p.Price * p.qty}</strong>
                          </td>
                          <td className="text-center">
                            {/* Return Button Logic */}
                            {order.status === "Delivered" && !p.returnStatus ? (
                              isReturnAllowed(order.createdAt) ? (
                                <button
                                  className="btn btn-sm btn-danger me-2"
                                  onClick={() => handleReturn(order._id, p._id)}
                                >
                                  Return Product
                                </button>
                              ) : (
                                <span className="text-muted small">
								  Return expired ({getDaysPassed(order.createdAt)} days passed)
								</span>
                              )
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Footer */}
            <div className="card-footer bg-white d-flex justify-content-between align-items-center flex-wrap">
              <div>
                {order.status !== "Delivered" &&
                  order.status !== "Cancelled" && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancel(order._id)}
                    >
                      Cancel Order
                    </button>
                  )}
              </div>
              <h5 className="mb-0 mt-2 mt-md-0">
                Total Amount: <span className="text-success">₹{order.total || 0}</span>
              </h5>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderSuccess;
