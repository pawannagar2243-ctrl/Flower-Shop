import { useEffect, useState } from "react";
import axios from "axios";

const OrderSuccess = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // ✅ Cancel Order
  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?"))
      return;

    try {
      await axios.put(
        `http://localhost:5000/cancel-order/${orderId}`
      );
      alert("Order Cancelled Successfully");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  // ✅ Return Product
  const handleReturn = async (orderId, productId) => {
    try {
      await axios.post("http://localhost:5000/return-product", {
        orderId,
        productId,
      });

      alert("Return request sent successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Return error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📦 Order Details</h4>

      {orders.length === 0 && <p>No Orders Found</p>}

      {orders.map((order) => (
        <div key={order._id} className="card p-3 shadow-sm mb-4">
          <p><strong>Order ID:</strong> {order._id}</p>

          <p>
            <strong>Date:</strong>{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge
                ${order.status === "Pending" && "bg-warning"}
                ${order.status === "Shipped" && "bg-primary"}
                ${order.status === "Delivered" && "bg-success"}
                ${order.status === "Cancelled" && "bg-danger"}
              `}
            >
              {order.status || "Pending"}
            </span>
          </p>

          <hr />

          {order.products && order.products.length > 0 ? (
            order.products.map((p, index) => (
              <div key={index} className="mb-3 pb-2">
                <div className="d-flex align-items-center">
                  <img
                    src={`http://localhost:5000/uploads/${p.Image}`}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover" }}
                    alt={p.Name}
                  />

                  <div className="flex-grow-1 ms-3">
                    <div>{p.Name}</div>
                    <p className="mb-0">
                      ₹{p.Price} × {p.qty}
                    </p>
                    <p className="mb-0">
                      Address: {order.address}
                    </p>
                  </div>

                  <div>
                    ₹{p.Price * p.qty}
                  </div>
                </div>

                {/* ✅ Return Section */}
                <div className="mt-2 text-end">
                  {p.returnStatus ? (
                    <span className="badge bg-info">
                      Return: {p.returnStatus}
                    </span>
                  ) : order.status === "Delivered" ? (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleReturn(order._id, p._id)
                      }
                    >
                      Return Product
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <p>No Items Found</p>
          )}

          <hr />

          {/* ✅ Buttons Section */}
          <div className="d-flex justify-content-end">
            {order.status !== "Delivered" &&
              order.status !== "Cancelled" && (
                <button
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => handleCancel(order._id)}
                >
                  Cancel Order
                </button>
              )}

            <button className="btn btn-sm btn-warning me-2">
              Edit
            </button>
          </div>

          <h5 className="text-end mt-2">
            Total: ₹{order.totalAmount || order.total || 0}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default OrderSuccess;
