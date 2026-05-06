import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addDepartment({ department }));
    setDepartment("");
  };

  useEffect(() => {
    if (store.errors || store.admin.departmentAdded) {
      setLoading(false);
      if (store.admin.departmentAdded) {
        setDepartment("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_DEPARTMENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.departmentAdded]);

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

  return (
    <div style={{
      flex: 1, overflowY: "auto", padding: "22px 24px",
      background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#4361ee", fontWeight: 600 }}>Add Department</span>
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
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Add Department</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Create a new department in the system</div>
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: "#fff", borderRadius: "16px",
        border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: "520px",
      }}>
        <form onSubmit={handleSubmit}>

          {/* Field Section */}
          <div style={{ padding: "24px" }}>
            <div style={{
              fontSize: "11px", fontWeight: 700, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "1px",
              marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{
                display: "inline-block", width: "3px", height: "12px",
                background: "#4361ee", borderRadius: "2px",
              }} />
              Department Details
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={lbl}>Department Name</label>
              <input
                style={inp}
                type="text"
                placeholder="e.g. Computer Science"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                onFocus={(e) => {
                  e.target.style.border = "1.5px solid #4361ee";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1.5px solid #e2e8f0";
                  e.target.style.background = "#f8fafc";
                }}
              />
            </div>

            {/* Error & Loading */}
            {loading && (
              <div style={{ marginTop: "16px" }}>
                <Spinner
                  message="Adding Department"
                  height={30} width={150}
                  color="#111111" messageColor="blue"
                />
              </div>
            )}
            {(error.departmentError || error.backendError) && (
              <div style={{
                marginTop: "14px", padding: "11px 14px", borderRadius: "8px",
                background: "#fef2f2", border: "1px solid #fecaca",
                color: "#dc2626", fontSize: "13px", fontWeight: 500,
              }}>
                ⚠️ {error.departmentError || error.backendError}
              </div>
            )}
          </div>

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
              onClick={() => setDepartment("")}
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