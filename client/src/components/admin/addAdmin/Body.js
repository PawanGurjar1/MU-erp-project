import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addAdmin } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_ADMIN, SET_ERRORS } from "../../../redux/actionTypes";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "13.5px",
  color: "#1e293b",
  background: "#f8fafc",
  outline: "none",
  fontFamily: "inherit",
  transition: "border 0.15s",
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#64748b",
  marginBottom: "6px",
  display: "block",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0",
};

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [value, setValue] = useState({
    name: "", dob: "", email: "", department: "",
    contactNumber: "", avatar: "",
    joiningYear: Date().split(" ")[3],
    password: "", username: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue((v) => ({ ...v, email: "" }));
    }
  }, [store.errors]);

  useEffect(() => {
    if (store.errors || store.admin.adminAdded) {
      setLoading(false);
      if (store.admin.adminAdded) {
        clearForm();
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_ADMIN, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.adminAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const clearForm = () => {
    setValue({
      name: "", dob: "", email: "", department: "",
      contactNumber: "", avatar: "",
      joiningYear: Date().split(" ")[3],
      password: "", username: "",
    });
    setAvatarPreview(null);
    setError({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addAdmin(value));
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: "#f0f4ff" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>
        🏠 Home <span style={{ color: "#4361ee", fontWeight: 600 }}>/ Add Admin</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px",
          background: "#eff6ff", display: "flex", alignItems: "center",
          justifyContent: "center", color: "#4361ee"
        }}>
          <PersonAddIcon sx={{ fontSize: 20 }} />
        </div>
        <div>
          <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b", margin: 0 }}>Add Admin</h1>
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Fill in the details to create a new admin account</p>
        </div>
      </div>

      {/* Form Card */}
      <div style={{
        background: "#fff", borderRadius: "16px",
        border: "1px solid #e2e8f0", padding: "28px",
        maxWidth: "860px",
      }}>
        <form onSubmit={handleSubmit}>

          {/* Avatar Preview + Upload */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "28px", paddingBottom: "24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: avatarPreview ? "transparent" : "linear-gradient(135deg, #4361ee, #7209b7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "26px", fontWeight: 700,
              flexShrink: 0, overflow: "hidden", border: "2px solid #e2e8f0"
            }}>
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : (value.name ? value.name.charAt(0).toUpperCase() : "A")
              }
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", marginBottom: "6px" }}>Profile Photo</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>Upload avatar image (optional)</div>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setValue({ ...value, avatar: base64 });
                  setAvatarPreview(base64);
                }}
              />
            </div>
          </div>

          {/* Fields Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

            <div style={fieldStyle}>
              <label style={labelStyle}>Full Name</label>
              <input
                style={inputStyle} type="text" placeholder="e.g. Rahul Sharma"
                required value={value.name}
                onChange={(e) => setValue({ ...value, name: e.target.value })}
                onFocus={e => e.target.style.border = "1px solid #4361ee"}
                onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Email Address</label>
              <input
                style={inputStyle} type="email" placeholder="admin@college.edu"
                required value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
                onFocus={e => e.target.style.border = "1px solid #4361ee"}
                onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Date of Birth</label>
              <input
                style={inputStyle} type="date"
                required value={value.dob}
                onChange={(e) => setValue({ ...value, dob: e.target.value })}
                onFocus={e => e.target.style.border = "1px solid #4361ee"}
                onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Contact Number</label>
              <input
                style={inputStyle} type="number" placeholder="10-digit mobile number"
                required value={value.contactNumber}
                onChange={(e) => setValue({ ...value, contactNumber: e.target.value })}
                onFocus={e => e.target.style.border = "1px solid #4361ee"}
                onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Department</label>
              <Select
                required displayEmpty
                value={value.department}
                onChange={(e) => setValue({ ...value, department: e.target.value })}
                sx={{
                  height: 42, fontSize: "13.5px",
                  background: "#f8fafc", borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4361ee" },
                }}
              >
                <MenuItem value="">Select Department</MenuItem>
                {departments?.map((dp, idx) => (
                  <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>
                ))}
              </Select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Joining Year</label>
              <input
                style={{ ...inputStyle, background: "#f1f5f9", color: "#94a3b8" }}
                type="text" value={value.joiningYear} readOnly
              />
            </div>

          </div>

          {/* Error */}
          {(error.emailError || error.backendError) && (
            <div style={{
              marginTop: "16px", padding: "12px 16px", borderRadius: "8px",
              background: "#fef2f2", border: "1px solid #fecaca",
              color: "#dc2626", fontSize: "13px", fontWeight: 500
            }}>
              ⚠️ {error.emailError || error.backendError}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "10px", color: "#4361ee", fontSize: "13px" }}>
              <Spinner message="Adding Admin..." height={24} width={120} color="#4361ee" messageColor="#4361ee" />
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
            <button
              type="submit"
              style={{
                padding: "11px 28px", background: "#4361ee", color: "#fff",
                border: "none", borderRadius: "9px", fontSize: "13.5px",
                fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                transition: "background 0.15s",
              }}
              onMouseOver={e => e.target.style.background = "#3451d1"}
              onMouseOut={e => e.target.style.background = "#4361ee"}
            >
              Add Admin
            </button>
            <button
              type="button"
              onClick={clearForm}
              style={{
                padding: "11px 24px", background: "#fff", color: "#64748b",
                border: "1px solid #e2e8f0", borderRadius: "9px", fontSize: "13.5px",
                fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              }}
              onMouseOver={e => e.target.style.background = "#f8fafc"}
              onMouseOut={e => e.target.style.background = "#fff"}
            >
              Clear Form
            </button>
          </div>

        </form>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          form > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Body;