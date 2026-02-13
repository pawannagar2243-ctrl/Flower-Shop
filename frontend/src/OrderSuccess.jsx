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
      console.log("API Response:", res.data);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
	
  return (
    <div className="container mt-4">
      <h4 className="mb-3">📦 Order Details</h4>

      {orders.length === 0 && <p>No Orders Found</p>}

      {orders.map((order) => {
        const items =
          order.items ||
          order.cartItems ||
          order.orderItems ||
          [];

        return (
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
                className={`badge ${
                  order.status === "Delivered"
                    ? "bg-success"
                    : order.status === "Shipped"
                    ? "bg-primary"
                    : "bg-warning"
                }`}
              >
                {order.status || "Pending"}
              </span>
            </p>
            <hr />

			{order.products && order.products.length > 0 ? (
			  order.products.map((p, index) => (
				<div
				  key={index}
				  className="d-flex align-items-center mb-3"
				>
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
					<p>Address:-{order.address}</p>
					 
				  </div>

				  <div>
					₹{p.Price * p.qty}
				  </div>
				</div>
			  ))
			) : (
			  <p>No Items Found</p>
			)}
			 <div className="d-flex justify-content-end">
			 <button className="btn btn-sm btn-warning me-2">Edit</button>
			 </div>
           <hr />

            <h5 className="text-end">
              Total: ₹{order.totalAmount || order.total || 0}
            </h5>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSuccess;
