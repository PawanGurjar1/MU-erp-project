import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addFaculty } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_FACULTY, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    name: "",
    dob: "",
    email: "",
    department: "",
    contactNumber: "",
    avatar: "",
    joiningYear: Date().split(" ")[3],
    gender: "",
    designation: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value, email: "" });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addFaculty(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.facultyAdded) {
      setLoading(false);
      if (store.admin.facultyAdded) {
        setValue({
          name: "",
          dob: "",
          email: "",
          department: "",
          contactNumber: "",
          avatar: "",
          joiningYear: Date().split(" ")[3],
          gender: "",
          designation: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_FACULTY, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.facultyAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const inp = {
    width: "100%",
    height: "40px",
    padding: "0 13px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#1e293b",
    background: "#f8fafc",
    outline: "none",
    fontFamily: "inherit",
    transition: "border 0.15s, background 0.15s",
  };

  const lbl = {
    fontSize: "11.5px",
    fontWeight: 600,
    color: "#475569",
    marginBottom: "6px",
    display: "block",
  };

  const fieldWrap = { display: "flex", flexDirection: "column" };

  const selectSx = {
    height: 40, fontSize: "13px", background: "#f8fafc",
    borderRadius: "8px", fontFamily: "inherit", width: "100%",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0", borderWidth: "1.5px" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4361ee" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4361ee", borderWidth: "1.5px" },
  };

  const sectionTitle = {
    fontSize: "11px", fontWeight: 700, color: "#94a3b8",
    textTransform: "uppercase", letterSpacing: "1px",
    marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px",
  };

  const bar = {
    display: "inline-block", width: "3px", height: "12px",
    background: "#4361ee", borderRadius: "2px",
  };

  return (
    <div style={{
      flex: 1, overflowY: "auto", padding: "22px 24px",
      background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#4361ee", fontWeight: 600 }}>Add Faculty</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "11px",
          background: "#eff6ff", border: "1px solid #bfdbfe",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#4361ee",
        }}>
          <AddIcon sx={{ fontSize: 22 }} />
        </div>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Add Faculty</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Register a new faculty member</div>
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: "#fff", borderRadius: "16px",
        border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: "860px",
      }}>
        <form onSubmit={handleSubmit}>

          {/* Avatar Section */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={sectionTitle}>
              <span style={bar} /> Avatar
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "#4361ee", display: "flex", alignItems: "center",
                justifyContent: "center", color: "#fff", fontSize: "22px",
                fontWeight: 700, border: "3px solid #e2e8f0", flexShrink: 0,
              }}>
                {value.name ? value.name.charAt(0).toUpperCase() : "F"}
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>
                  JPG, PNG supported
                </div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
                />
              </div>
            </div>
          </div>

          {/* Fields Section */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={sectionTitle}>
              <span style={bar} /> Personal Details
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

              <div style={fieldWrap}>
                <label style={lbl}>Name</label>
                <input
                  style={inp} type="text" placeholder="Full Name" required
                  value={value.name}
                  onChange={(e) => setValue({ ...value, name: e.target.value })}
                  onFocus={(e) => { e.target.style.border = "1.5px solid #4361ee"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
                />
              </div>

              <div style={fieldWrap}>
                <label style={lbl}>DOB</label>
                <input
                  style={inp} type="date" required
                  value={value.dob}
                  onChange={(e) => setValue({ ...value, dob: e.target.value })}
                  onFocus={(e) => { e.target.style.border = "1.5px solid #4361ee"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
                />
              </div>

              <div style={fieldWrap}>
                <label style={lbl}>Email</label>
                <input
                  style={inp} type="email" placeholder="Email" required
                  value={value.email}
                  onChange={(e) => setValue({ ...value, email: e.target.value })}
                  onFocus={(e) => { e.target.style.border = "1.5px solid #4361ee"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
                />
              </div>

              <div style={fieldWrap}>
                <label style={lbl}>Designation</label>
                <input
                  style={inp} type="text" placeholder="Designation" required
                  value={value.designation}
                  onChange={(e) => setValue({ ...value, designation: e.target.value })}
                  onFocus={(e) => { e.target.style.border = "1.5px solid #4361ee"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
                />
              </div>

              <div style={fieldWrap}>
                <label style={lbl}>Contact Number</label>
                <input
                  style={inp} type="number" placeholder="Contact Number" required
                  value={value.contactNumber}
                  onChange={(e) => setValue({ ...value, contactNumber: e.target.value })}
                  onFocus={(e) => { e.target.style.border = "1.5px solid #4361ee"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
                />
              </div>

              <div style={fieldWrap}>
                <label style={lbl}>Department</label>
                <Select
                  required displayEmpty
                  value={value.department}
                  onChange={(e) => setValue({ ...value, department: e.target.value })}
                  sx={selectSx}
                >
                  <MenuItem value="">None</MenuItem>
                  {departments?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>
                  ))}
                </Select>
              </div>

              <div style={fieldWrap}>
                <label style={lbl}>Gender</label>
                <Select
                  required displayEmpty
                  value={value.gender}
                  onChange={(e) => setValue({ ...value, gender: e.target.value })}
                  sx={selectSx}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </div>

              <div style={fieldWrap}>
                <label style={lbl}>Joining Year</label>
                <input
                  style={{ ...inp, background: "#f1f5f9", color: "#94a3b8", cursor: "not-allowed" }}
                  type="text" readOnly value={value.joiningYear}
                />
              </div>

            </div>
          </div>

          {/* Error & Loading */}
          {(loading || error.emailError || error.backendError) && (
            <div style={{ padding: "12px 24px", borderBottom: "1px solid #f1f5f9" }}>
              {loading && (
                <Spinner message="Adding Faculty" height={30} width={150} color="#111111" messageColor="blue" />
              )}
              {(error.emailError || error.backendError) && (
                <div style={{
                  padding: "11px 14px", borderRadius: "8px",
                  background: "#fef2f2", border: "1px solid #fecaca",
                  color: "#dc2626", fontSize: "13px", fontWeight: 500,
                }}>
                  ⚠️ {error.emailError || error.backendError}
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div style={{
            padding: "14px 24px", background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex", gap: "10px",
          }}>
            <button
              type="submit"
              style={{
                padding: "10px 26px", background: "#4361ee", color: "#fff",
                border: "none", borderRadius: "9px", fontSize: "13px",
                fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#3451d1"}
              onMouseOut={(e) => e.currentTarget.style.background = "#4361ee"}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setValue({
                  name: "", dob: "", email: "", department: "",
                  contactNumber: "", avatar: "",
                  joiningYear: Date().split(" ")[3],
                  gender: "", designation: "",
                });
                setError({});
              }}
              style={{
                padding: "10px 20px", background: "#fff", color: "#64748b",
                border: "1.5px solid #e2e8f0", borderRadius: "9px",
                fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#f1f5f9"}
              onMouseOut={(e) => e.currentTarget.style.background = "#fff"}
            >
              Clear
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Body;