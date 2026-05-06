import React from "react";
import { Avatar } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import { useNavigate } from "react-router-dom";
import Data from "./Data";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("studentUser"));
  const navigate = useNavigate();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#4361ee", fontWeight: 600 }}>Profile</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", color: "#4361ee" }}>
            <AssignmentIndIcon sx={{ fontSize: 22 }} />
          </div>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Profile</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Your student account information</div>
          </div>
        </div>
        <button
          onClick={() => navigate("/student/update")}
          style={{ display: "flex", alignItems: "center", gap: "7px", padding: "9px 18px", background: "#4361ee", color: "#fff", border: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          onMouseOver={(e) => e.currentTarget.style.background = "#3451d1"}
          onMouseOut={(e) => e.currentTarget.style.background = "#4361ee"}
        >
          <SecurityUpdateIcon sx={{ fontSize: 16 }} /> Update Profile
        </button>
      </div>

      {/* Profile Card */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: "900px" }}>

        {/* Cover + Avatar */}
        <div style={{ height: "90px", background: "linear-gradient(135deg, #4361ee 0%, #7209b7 100%)", position: "relative" }}>
          <div style={{ position: "absolute", bottom: "-36px", left: "28px" }}>
            <Avatar
              src={user.result.avatar}
              sx={{ width: 72, height: 72, border: "3px solid #fff", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
            />
          </div>
        </div>

        {/* Name row */}
        <div style={{ padding: "46px 28px 20px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>{user.result.name}</div>
          <div style={{ fontSize: "12.5px", color: "#64748b", marginTop: "3px" }}>
            {user.result.department} &bull; Year {user.result.year} &bull; Section {user.result.section}
          </div>
        </div>

        {/* Personal Info */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: "3px", height: "12px", background: "#4361ee", borderRadius: "2px" }} />
            Personal Information
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Data label="Name"           value={user.result.name} />
            <Data label="DOB"            value={user.result.dob} />
            <Data label="Email"          value={user.result.email} />
            <Data label="Contact Number" value={user.result.contactNumber} />
            <Data label="Username"       value={user.result.username} />
            <Data label="Department"     value={user.result.department} />
          </div>
        </div>

        {/* Academic Info */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: "3px", height: "12px", background: "#4361ee", borderRadius: "2px" }} />
            Academic Details
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Data label="Batch"   value={user.result.batch} />
            <Data label="Year"    value={user.result.year} />
            <Data label="Section" value={user.result.section} />
          </div>
        </div>

        {/* Family Info */}
        <div style={{ padding: "24px 28px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: "3px", height: "12px", background: "#4361ee", borderRadius: "2px" }} />
            Family Details
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Data label="Father's Name"           value={user.result.fatherName} />
            <Data label="Father's Contact Number" value={user.result.fatherContactNumber} />
            <Data label="Mother's Name"           value={user.result.motherName} />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Body;