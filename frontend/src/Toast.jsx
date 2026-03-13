import { useEffect, useState } from "react";

function Toast({ message, type = "success", onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400); // animation ke baad close
    }, 5000); // ← 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const config = {
    success: { bg: "#28a745", icon: "bi-check-circle-fill" },
    error:   { bg: "#dc3545", icon: "bi-trash-fill" },
    warning: { bg: "#ff7750", icon: "bi-exclamation-circle-fill" },
    info:    { bg: "#0d6efd", icon: "bi-info-circle-fill" },
  };

  const { bg, icon } = config[type];

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        minWidth: "300px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        overflow: "hidden",
        animation: visible ? "slideIn 0.4s ease" : "slideOut 0.4s ease",
        borderLeft: `5px solid ${bg}`,
      }}
    >
      {/* Main Content */}
      <div className="d-flex align-items-center gap-3 px-3 py-3">
        <div
          style={{
            background: bg,
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <i className={`bi ${icon} text-white`} style={{ fontSize: "16px" }}></i>
        </div>

        <span style={{ flex: 1, fontWeight: "500", color: "#333", fontSize: "15px" }}>
          {message}
        </span>

        <button
          onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            color: "#aaa",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ height: "3px", background: "#f0f0f0" }}>
        <div
          style={{
            height: "100%",
            background: bg,
            animation: "progress 5s linear forwards",
          }}
        />
      </div>
    </div>
  );
}

export default Toast;