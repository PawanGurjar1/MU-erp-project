import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import { getFaculty } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";

const AVS = [
  { bg: "#e0e7ff", color: "#4338ca" }, { bg: "#dcfce7", color: "#16a34a" },
  { bg: "#fef9c3", color: "#ca8a04" }, { bg: "#fce7f3", color: "#be185d" },
  { bg: "#dbeafe", color: "#1d4ed8" }, { bg: "#ffedd5", color: "#c2410c" },
];
const initials = (n = "") => n.split(" ").map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase();

const Body = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const departments = useSelector((state) => state.admin.allDepartment);
  const faculties = useSelector((state) => state.admin.faculties.result);
  const store = useSelector((state) => state);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getFaculty({ department }));
  };

  useEffect(() => {
    if (faculties?.length !== 0) setLoading(false);
  }, [faculties]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const selSx = {
    height: 40, fontSize: "13px", background: "#f8fafc",
    borderRadius: "8px", fontFamily: "inherit", minWidth: 220,
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0", borderWidth: "1.5px" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4361ee" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4361ee", borderWidth: "1.5px" },
  };

  const thS = {
    padding: "10px 14px", textAlign: "left", fontSize: "11px",
    fontWeight: 700, color: "#94a3b8", textTransform: "uppercase",
    letterSpacing: "0.6px", borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc", whiteSpace: "nowrap",
  };

  const showTable = search && !loading && Object.keys(error).length === 0 && faculties?.length !== 0;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#4361ee", fontWeight: 600 }}>All Faculty</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", color: "#4361ee" }}>
          <EngineeringIcon sx={{ fontSize: 22 }} />
        </div>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>All Faculty</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Search faculty by department</div>
        </div>
      </div>

      {/* Search Card */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px 24px", marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "inline-block", width: "3px", height: "12px", background: "#4361ee", borderRadius: "2px" }} />
          Search Faculty
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "flex-end", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569" }}>Department</label>
            <Select required displayEmpty value={department} onChange={(e) => setDepartment(e.target.value)} sx={selSx}>
              <MenuItem value=""><span style={{ color: "#94a3b8" }}>None</span></MenuItem>
              {departments?.map((dp, idx) => <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>)}
            </Select>
          </div>
          <button
            type="submit"
            style={{ height: "40px", padding: "0 24px", background: "#4361ee", color: "#fff", border: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            onMouseOver={(e) => e.currentTarget.style.background = "#3451d1"}
            onMouseOut={(e) => e.currentTarget.style.background = "#4361ee"}
          >
            Search
          </button>
        </form>
      </div>

      {/* Results Card */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>

        {/* Toolbar */}
        <div style={{ padding: "12px 20px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#1e293b" }}>Faculty List</span>
          {showTable && (
            <span style={{ background: "#eff6ff", color: "#4361ee", border: "1px solid #bfdbfe", fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px" }}>
              {faculties.length} record{faculties.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ padding: "48px 20px", display: "flex", justifyContent: "center" }}>
            <Spinner message="Loading" height={50} width={150} color="#111111" messageColor="blue" />
          </div>
        )}

        {/* Error */}
        {(error.noFacultyError || error.backendError) && (
          <div style={{ margin: "20px", padding: "12px 16px", borderRadius: "9px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px", fontWeight: 500 }}>
            ⚠️ {error.noFacultyError || error.backendError}
          </div>
        )}

        {/* Empty state */}
        {!search && !loading && (
          <div style={{ padding: "48px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "#94a3b8" }}>
            <span style={{ fontSize: "40px" }}>🔍</span>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#64748b" }}>No data yet</div>
            <div style={{ fontSize: "12.5px" }}>Select a department and click Search</div>
          </div>
        )}

        {/* Table */}
        {showTable && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr>
                  <th style={{ ...thS, width: "50px", textAlign: "center" }}>Sr No.</th>
                  <th style={thS}>Name</th>
                  <th style={thS}>Username</th>
                  <th style={thS}>Email</th>
                  <th style={thS}>Designation</th>
                </tr>
              </thead>
              <tbody>
                {faculties?.map((fac, idx) => {
                  const av = AVS[idx % AVS.length];
                  return (
                    <tr
                      key={idx}
                      style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.1s" }}
                      onMouseOver={(e) => e.currentTarget.style.background = "#f8fafc"}
                      onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "12px 14px", textAlign: "center", color: "#94a3b8", fontWeight: 500 }}>{idx + 1}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: av.bg, color: av.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                            {initials(fac.name)}
                          </div>
                          <span style={{ fontWeight: 600, color: "#1e293b" }}>{fac.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ background: "#eff6ff", color: "#4361ee", border: "1px solid #bfdbfe", fontSize: "12px", fontWeight: 500, padding: "3px 10px", borderRadius: "6px", fontFamily: "monospace" }}>
                          {fac.username}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>{fac.email}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "6px" }}>
                          {fac.designation}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;