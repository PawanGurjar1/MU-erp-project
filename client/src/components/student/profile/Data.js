import React from "react";

const Data = ({ label, value }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px" }}>
        {label}
      </span>
      <span style={{
        fontSize: "14px", fontWeight: 500, color: "#1e293b",
        background: "#f8fafc", border: "1.5px solid #e2e8f0",
        borderRadius: "8px", padding: "9px 14px", minWidth: "200px",
        display: "inline-block",
      }}>
        {value || "—"}
      </span>
    </div>
  );
};

export default Data;