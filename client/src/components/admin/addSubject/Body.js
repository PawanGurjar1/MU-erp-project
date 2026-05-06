import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    subjectName: "", subjectCode: "", year: "", totalLectures: "", department: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ subjectName: "", subjectCode: "", year: "", totalLectures: "", department: "" });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addSubject(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.subjectAdded) {
      setLoading(false);
      if (store.admin.subjectAdded) {
        setValue({ subjectName: "", subjectCode: "", year: "", totalLectures: "", department: "" });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_SUBJECT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.subjectAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const inp = {
    width: "100%", height: "40px", padding: "0 13px",
    border: "1.5px solid #e2e8f0", borderRadius: "8px",
    fontSize: "13px", color: "#1e293b", background: "#f8fafc",
    outline: "none", fontFamily: "inherit",
  };
  const lbl = { fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "6px", display: "block" };
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

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#4361ee", fontWeight: 600 }}>Add Subject</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", color: "#4361ee" }}>
          <AddIcon sx={{ fontSize: 22 }} />
        </div>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Add Subject</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Add a new subject to the curriculum</div>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: "760px" }}>
        <form onSubmit={handleSubmit}>

          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ display: "inline-block", width: "3px", height: "12px", background: "#4361ee", borderRadius: "2px" }} />
              Subject Details
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={fw}>
                <label style={lbl}>Subject Name</label>
                <input style={inp} type="text" placeholder="Subject Name" required value={value.subjectName} onChange={(e) => setValue({ ...value, subjectName: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>Subject Code</label>
                <input style={inp} type="text" placeholder="Subject Code" required value={value.subjectCode} onChange={(e) => setValue({ ...value, subjectCode: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>Total Lectures</label>
                <input style={inp} type="number" placeholder="Total Lectures" required value={value.totalLectures} onChange={(e) => setValue({ ...value, totalLectures: e.target.value })} onFocus={focus} onBlur={blur} />
              </div>
              <div style={fw}>
                <label style={lbl}>Year</label>
                <Select required displayEmpty value={value.year} onChange={(e) => setValue({ ...value, year: e.target.value })} sx={selSx}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                </Select>
              </div>
              <div style={fw}>
                <label style={lbl}>Department</label>
                <Select required displayEmpty value={value.department} onChange={(e) => setValue({ ...value, department: e.target.value })} sx={selSx}>
                  <MenuItem value="">None</MenuItem>
                  {departments?.map((dp, idx) => <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>)}
                </Select>
              </div>
            </div>
          </div>

          {(loading || error.subjectError || error.backendError) && (
            <div style={{ padding: "12px 24px", borderBottom: "1px solid #f1f5f9" }}>
              {loading && <Spinner message="Adding Subject" height={30} width={150} color="#111111" messageColor="blue" />}
              {(error.subjectError || error.backendError) && (
                <div style={{ padding: "11px 14px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px", fontWeight: 500 }}>
                  ⚠️ {error.subjectError || error.backendError}
                </div>
              )}
            </div>
          )}

          <div style={{ padding: "14px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px" }}>
            <button type="submit"
              style={{ padding: "10px 26px", background: "#4361ee", color: "#fff", border: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              onMouseOver={(e) => e.currentTarget.style.background = "#3451d1"}
              onMouseOut={(e) => e.currentTarget.style.background = "#4361ee"}>
              Submit
            </button>
            <button type="button"
              onClick={() => { setValue({ subjectName: "", subjectCode: "", year: "", totalLectures: "", department: "" }); setError({}); }}
              style={{ padding: "10px 20px", background: "#fff", color: "#64748b", border: "1.5px solid #e2e8f0", borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              onMouseOver={(e) => e.currentTarget.style.background = "#f1f5f9"}
              onMouseOut={(e) => e.currentTarget.style.background = "#fff"}>
              Clear
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
export default Body;