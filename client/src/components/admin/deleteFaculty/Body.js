import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaculty, getFaculty } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { DELETE_FACULTY, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [checkedValue, setCheckedValue] = useState([]);
  const [value, setValue] = useState({ department: "" });
  const [search, setSearch] = useState(false);
  const faculties = useSelector((state) => state.admin.faculties.result);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleInputChange = (e) => {
    const tempCheck = [...checkedValue];
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      const index = tempCheck.indexOf(e.target.value);
      tempCheck.splice(index, 1);
    }
    setCheckedValue(tempCheck);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getFaculty(value));
  };

  const dltFaculty = () => {
    setError({});
    setLoading(true);
    dispatch(deleteFaculty(checkedValue));
  };

  useEffect(() => {
    if (store.admin.facultyDeleted) {
      setLoading(false);
      setValue({ department: "" });
      dispatch({ type: DELETE_FACULTY, payload: false });
      setSearch(false);
    }
  }, [store.admin.facultyDeleted]);

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
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4361ee" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4361ee", borderWidth: "1.5px" },
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#ef4444", fontWeight: 600 }}>Delete Faculty</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#fef2f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>
          <DeleteIcon sx={{ fontSize: 22 }} />
        </div>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Delete Faculty</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Search by department and select faculty to delete</div>
        </div>
      </div>

      {/* Main Card */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: "900px" }}>

        {/* Search Section */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: "3px", height: "12px", background: "#ef4444", borderRadius: "2px" }} />
            Search Faculty
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "240px" }}>
              <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569" }}>Department</label>
              <Select
                required displayEmpty
                value={value.department}
                onChange={(e) => setValue({ ...value, department: e.target.value })}
                sx={selSx}
              >
                <MenuItem value="">None</MenuItem>
                {departments?.map((dp, idx) => (
                  <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>
                ))}
              </Select>
            </div>
            <button
              type="submit"
              style={{ height: "40px", padding: "0 24px", background: "#4361ee", color: "#fff", border: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
              onMouseOver={(e) => e.currentTarget.style.background = "#3451d1"}
              onMouseOut={(e) => e.currentTarget.style.background = "#4361ee"}
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div style={{ padding: "20px 24px" }}>

          {/* Loading */}
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", padding: "30px 0" }}>
              <Spinner message="Loading" height={50} width={150} color="#111111" messageColor="blue" />
            </div>
          )}

          {/* Error */}
          {(error.noFacultyError || error.backendError) && (
            <div style={{ padding: "12px 16px", borderRadius: "9px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px", fontWeight: 500 }}>
              ⚠️ {error.noFacultyError || error.backendError}
            </div>
          )}

          {/* Table */}
          {search && !loading && Object.keys(error).length === 0 && faculties?.length !== 0 && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Select</th>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Sr No.</th>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Name</th>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Username</th>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {faculties?.map((adm, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                      onMouseOver={(e) => e.currentTarget.style.background = "#f8fafc"}
                      onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "12px 14px" }}>
                        <input
                          type="checkbox"
                          value={adm._id}
                          onChange={handleInputChange}
                          style={{ width: "16px", height: "16px", accentColor: "#ef4444", cursor: "pointer" }}
                        />
                      </td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>{idx + 1}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 600, color: "#1e293b" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#4361ee", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>
                            {adm.name?.charAt(0).toUpperCase()}
                          </div>
                          {adm.name}
                        </div>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#475569" }}>{adm.username}</td>
                      <td style={{ padding: "12px 14px", color: "#475569" }}>{adm.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Delete Button */}
              <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={dltFaculty}
                  style={{ padding: "10px 26px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }}
                  onMouseOver={(e) => e.currentTarget.style.background = "#dc2626"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#ef4444"}
                >
                  <DeleteIcon sx={{ fontSize: 16 }} /> Delete Selected
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;