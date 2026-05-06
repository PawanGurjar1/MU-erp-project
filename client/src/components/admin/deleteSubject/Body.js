import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getSubject, deleteSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { DELETE_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const subjects = useSelector((state) => state.admin.subjects.result);
  const store = useSelector((state) => state);

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkedValue, setCheckedValue] = useState([]);
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState({ department: "", year: "" });

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
    dispatch(getSubject(value));
  };

  const dltSubject = () => {
    setError({});
    setLoading(true);
    dispatch(deleteSubject(checkedValue));
  };

  useEffect(() => {
    if (store.admin.subjectDeleted) {
      setValue({ department: "", year: "" });
      setSearch(false);
      setLoading(false);
      dispatch({ type: DELETE_SUBJECT, payload: false });
    }
  }, [store.admin.subjectDeleted]);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

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

  const thS = {
    padding: "10px 14px", textAlign: "left", fontSize: "11px",
    fontWeight: 700, color: "#94a3b8", textTransform: "uppercase",
    letterSpacing: "0.6px", borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc", whiteSpace: "nowrap",
  };

  const noChk = checkedValue.length === 0;
  const showTable = search && !loading && Object.keys(error).length === 0 && subjects?.length !== 0;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#ef4444", fontWeight: 600 }}>Delete Subject</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#fef2f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>
          <DeleteIcon sx={{ fontSize: 22 }} />
        </div>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Delete Subject</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Search by department & year, then select subjects to delete</div>
        </div>
      </div>

      {/* Search Card */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px 24px", marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "inline-block", width: "3px", height: "12px", background: "#ef4444", borderRadius: "2px" }} />
          Search Subject
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "flex-end", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "200px" }}>
            <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569" }}>Department</label>
            <Select required displayEmpty value={value.department} onChange={(e) => setValue({ ...value, department: e.target.value })} sx={selSx}>
              <MenuItem value=""><span style={{ color: "#94a3b8" }}>None</span></MenuItem>
              {departments?.map((dp, idx) => <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>)}
            </Select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "140px" }}>
            <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569" }}>Year</label>
            <Select required displayEmpty value={value.year} onChange={(e) => setValue({ ...value, year: e.target.value })} sx={selSx}>
              <MenuItem value=""><span style={{ color: "#94a3b8" }}>None</span></MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
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
        <div style={{ padding: "12px 20px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#1e293b" }}>Subject List</span>
            {showTable && (
              <span style={{ background: "#eff6ff", color: "#4361ee", border: "1px solid #bfdbfe", fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px" }}>
                {subjects.length} record{subjects.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {search && !loading && Object.keys(error).length === 0 && (
            <button
              disabled={noChk}
              onClick={dltSubject}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 18px", background: noChk ? "#f3f4f6" : "#ef4444", color: noChk ? "#94a3b8" : "#fff", border: `1px solid ${noChk ? "#e2e8f0" : "transparent"}`, borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: noChk ? "not-allowed" : "pointer", fontFamily: "inherit" }}
              onMouseOver={(e) => { if (!noChk) e.currentTarget.style.background = "#dc2626"; }}
              onMouseOut={(e) => { if (!noChk) e.currentTarget.style.background = "#ef4444"; }}
            >
              <DeleteIcon sx={{ fontSize: 15 }} /> Delete{checkedValue.length > 0 ? ` (${checkedValue.length})` : ""}
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ padding: "48px 20px", display: "flex", justifyContent: "center" }}>
            <Spinner message="Loading" height={50} width={150} color="#111111" messageColor="blue" />
          </div>
        )}

        {/* Error */}
        {(error.noSubjectError || error.backendError) && (
          <div style={{ margin: "20px", padding: "12px 16px", borderRadius: "9px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px", fontWeight: 500 }}>
            ⚠️ {error.noSubjectError || error.backendError}
          </div>
        )}

        {/* Empty state */}
        {!search && !loading && (
          <div style={{ padding: "48px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "#94a3b8" }}>
            <span style={{ fontSize: "40px" }}>🔍</span>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#64748b" }}>No data yet</div>
            <div style={{ fontSize: "12.5px" }}>Select department & year, then click Search</div>
          </div>
        )}

        {/* Table */}
        {showTable && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr>
                  <th style={{ ...thS, width: "46px", textAlign: "center" }}>Select</th>
                  <th style={{ ...thS, width: "50px", textAlign: "center" }}>Sr No.</th>
                  <th style={thS}>Subject Code</th>
                  <th style={thS}>Subject Name</th>
                  <th style={thS}>Total Lectures</th>
                </tr>
              </thead>
              <tbody>
                {subjects?.map((adm, idx) => (
                  <tr
                    key={idx}
                    style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.1s" }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#f8fafc"}
                    onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "12px 14px", textAlign: "center" }}>
                      <input
                        type="checkbox"
                        value={adm._id}
                        onChange={handleInputChange}
                        style={{ width: "16px", height: "16px", accentColor: "#ef4444", cursor: "pointer" }}
                      />
                    </td>
                    <td style={{ padding: "12px 14px", textAlign: "center", color: "#94a3b8", fontWeight: 500 }}>{idx + 1}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ background: "#eff6ff", color: "#4361ee", border: "1px solid #bfdbfe", fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "6px", fontFamily: "monospace" }}>
                        {adm.subjectCode}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 600, color: "#1e293b" }}>{adm.subjectName}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "6px" }}>
                        {adm.totalLectures} lectures
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;