import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteDepartment, getAllDepartment } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { DELETE_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const departments = useSelector((state) => state.admin.allDepartment);
  const store = useSelector((state) => state);
  const faculties = useSelector((state) => state.admin.faculties.result);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    dispatch(deleteDepartment({ department }));
  };

  useEffect(() => {
    if (store.admin.departmentDeleted) {
      setLoading(false);
      setDepartment("");
      dispatch(getAllDepartment());
      dispatch({ type: DELETE_DEPARTMENT, payload: false });
    }
  }, [store.admin.departmentDeleted]);

  useEffect(() => {
    if (faculties?.length !== 0) setLoading(false);
  }, [faculties]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const selSx = {
    height: 40, fontSize: "13px", background: "#f8fafc",
    borderRadius: "8px", fontFamily: "inherit", width: "100%",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0", borderWidth: "1.5px" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444", borderWidth: "1.5px" },
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#ef4444", fontWeight: 600 }}>Delete Department</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#fef2f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>
          <DeleteIcon sx={{ fontSize: 22 }} />
        </div>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Delete Department</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Select a department to permanently delete it</div>
        </div>
      </div>

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: "520px" }}>
        <form onSubmit={handleSubmit}>

          {/* Field */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ display: "inline-block", width: "3px", height: "12px", background: "#ef4444", borderRadius: "2px" }} />
              Select Department
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569" }}>Department</label>
              <Select
                required displayEmpty
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                sx={selSx}
              >
                <MenuItem value="">None</MenuItem>
                {departments?.map((dp, idx) => (
                  <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>
                ))}
              </Select>
            </div>

            {/* Warning Box */}
            <div style={{ marginTop: "16px", padding: "12px 14px", borderRadius: "9px", background: "#fff7ed", border: "1px solid #fed7aa", display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span>
              <div style={{ fontSize: "12px", color: "#92400e", lineHeight: 1.5 }}>
                This action is <strong>permanent</strong>. Deleting a department will remove all associated data. Please proceed carefully.
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div style={{ marginTop: "14px" }}>
                <Spinner message="Deleting" height={30} width={150} color="#111111" messageColor="blue" />
              </div>
            )}

            {/* Error */}
            {(error.noFacultyError || error.backendError) && (
              <div style={{ marginTop: "14px", padding: "11px 14px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px", fontWeight: 500 }}>
                ⚠️ {error.noFacultyError || error.backendError}
              </div>
            )}
          </div>

          {/* Button */}
          <div style={{ padding: "14px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{ padding: "10px 26px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }}
              onMouseOver={(e) => e.currentTarget.style.background = "#dc2626"}
              onMouseOut={(e) => e.currentTarget.style.background = "#ef4444"}
            >
              <DeleteIcon sx={{ fontSize: 16 }} /> Delete
            </button>
            <button
              type="button"
              onClick={() => { setDepartment(""); setError({}); }}
              style={{ padding: "10px 20px", background: "#fff", color: "#64748b", border: "1.5px solid #e2e8f0", borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
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