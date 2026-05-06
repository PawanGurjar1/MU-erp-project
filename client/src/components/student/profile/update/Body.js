import React, { useEffect, useState } from "react";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../../../redux/actions/studentActions";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../../utils/Spinner";
import { SET_ERRORS } from "../../../../redux/actionTypes";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("studentUser"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    name: "", dob: "", email: user.result.email,
    department: "", contactNumber: "", avatar: "",
    batch: "", year: "", motherName: "", fatherName: "",
    fatherContactNumber: "", section: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) setError(store.errors);
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    const { email, ...rest } = value;
    const isEmpty = Object.values(rest).every((v) => v === "");
    if (isEmpty) {
      alert("Enter atleast one value");
      setLoading(false);
    } else {
      dispatch(updateStudent(value));
      alert("Kindly login again to see updates");
    }
  };

  useEffect(() => {
    if (store.errors || store.student.updatedStudent) setLoading(false);
    else setLoading(true);
  }, [store.errors, store.student.updatedStudent]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const inp = (disabled = false) => ({
    width: "100%", height: "40px", padding: "0 13px",
    border: "1.5px solid #e2e8f0", borderRadius: "8px",
    fontSize: "13px", color: disabled ? "#94a3b8" : "#1e293b",
    background: disabled ? "#f1f5f9" : "#f8fafc",
    outline: "none", fontFamily: "inherit",
    cursor: disabled ? "not-allowed" : "text",
  });

  const lbl = {
    fontSize: "11.5px", fontWeight: 600, color: "#475569",
    marginBottom: "6px", display: "block",
  };

  const fw = { display: "flex", flexDirection: "column" };

  const selSx = {
    height: 40, fontSize: "13px", background: "#f8fafc",
    borderRadius: "8px", fontFamily: "inherit", width: "100%",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0", borderWidth: "1.5px" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4361ee" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4361ee", borderWidth: "1.5px" },
  };

  const focus = (e) => { e.target.style.border = "1.5px solid #4361ee"; e.target.style.background = "#fff"; };
  const blur  = (e) => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; };

  const secTitle = (color = "#4361ee") => ({
    fontSize: "11px", fontWeight: 700, color: "#94a3b8",
    textTransform: "uppercase", letterSpacing: "1px",
    marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px",
  });

  const bar = (color = "#4361ee") => ({
    display: "inline-block", width: "3px", height: "12px",
    background: color, borderRadius: "2px",
  });

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#4361ee", fontWeight: 600 }}>Update Profile</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", color: "#4361ee" }}>
            <SecurityUpdateIcon sx={{ fontSize: 22 }} />
          </div>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Update Profile</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Update your student profile information</div>
          </div>
        </div>
        <button
          onClick={() => navigate("/student/update/password")}
          style={{ display: "flex", alignItems: "center", gap: "7px", padding: "9px 18px", background: "#fff", color: "#475569", border: "1.5px solid #e2e8f0", borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          onMouseOver={(e) => e.currentTarget.style.background = "#f8fafc"}
          onMouseOut={(e) => e.currentTarget.style.background = "#fff"}
        >
          <VisibilityOffIcon sx={{ fontSize: 16 }} /> Password
        </button>
      </div>

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: "900px" }}>
        <form onSubmit={handleSubmit}>

          {/* Avatar Section */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={secTitle()}>
              <span style={bar()} /> Avatar
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#4361ee", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "22px", fontWeight: 700, border: "3px solid #e2e8f0", flexShrink: 0 }}>
                {user.result.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>JPG, PNG supported</div>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setValue({ ...value, avatar: base64 })} />
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={secTitle()}>
              <span style={bar()} /> Personal Information
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={fw}>
                <label style={lbl}>Name</label>
                <input style={inp()} type="text" placeholder={user.result?.name} value={value.name} onChange={(e) => setValue({ ...value, name: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>DOB</label>
                <input style={inp()} type="text" placeholder={user.result?.dob} value={value.dob} onChange={(e) => setValue({ ...value, dob: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>Email</label>
                <input style={inp(true)} type="text" placeholder={user.result?.email} disabled />
              </div>
              <div style={fw}>
                <label style={lbl}>Contact Number</label>
                <input style={inp()} type="text" placeholder={user.result?.contactNumber} value={value.contactNumber} onChange={(e) => setValue({ ...value, contactNumber: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>Department</label>
                <Select displayEmpty value={value.department} onChange={(e) => setValue({ ...value, department: e.target.value })} sx={selSx}>
                  <MenuItem value="">None</MenuItem>
                  {departments?.map((dp, idx) => <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>)}
                </Select>
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={secTitle()}>
              <span style={bar()} /> Academic Details
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={fw}>
                <label style={lbl}>Batch</label>
                <input style={inp()} type="text" placeholder={user.result?.batch} value={value.batch} onChange={(e) => setValue({ ...value, batch: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>Year</label>
                <input style={inp()} type="text" placeholder={user.result?.year} value={value.year} onChange={(e) => setValue({ ...value, year: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>Section</label>
                <input style={inp()} type="text" placeholder={user.result?.section} value={value.section} onChange={(e) => setValue({ ...value, section: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
            </div>
          </div>

          {/* Family Info */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={secTitle()}>
              <span style={bar()} /> Family Details
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={fw}>
                <label style={lbl}>Father's Name</label>
                <input style={inp()} type="text" placeholder={user.result?.fatherName} value={value.fatherName} onChange={(e) => setValue({ ...value, fatherName: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>Father's Contact Number</label>
                <input style={inp()} type="text" placeholder={user.result?.fatherContactNumber} value={value.fatherContactNumber} onChange={(e) => setValue({ ...value, fatherContactNumber: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>Mother's Name</label>
                <input style={inp()} type="text" placeholder={user.result?.motherName} value={value.motherName} onChange={(e) => setValue({ ...value, motherName: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ padding: "12px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <Spinner message="Updating" height={30} width={150} color="#111111" messageColor="blue" />
            </div>
          )}

          {/* Buttons */}
          <div style={{ padding: "14px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{ padding: "10px 26px", background: "#4361ee", color: "#fff", border: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              onMouseOver={(e) => e.currentTarget.style.background = "#3451d1"}
              onMouseOut={(e) => e.currentTarget.style.background = "#4361ee"}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/profile")}
              style={{ padding: "10px 20px", background: "#fff", color: "#64748b", border: "1.5px solid #e2e8f0", borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              onMouseOver={(e) => e.currentTarget.style.background = "#f1f5f9"}
              onMouseOut={(e) => e.currentTarget.style.background = "#fff"}
            >
              Cancel
            </button>
          </div>

        </form>
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