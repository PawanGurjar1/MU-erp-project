import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, deleteAdmin } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { DELETE_ADMIN, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch    = useDispatch();
  const departments = useSelector((s) => s.admin.allDepartment);
  const students    = useSelector((s) => s.admin.students?.result);
  const store       = useSelector((s) => s);

  const [error,       setError]       = useState({});
  const [loading,     setLoading]     = useState(false);
  const [checked,     setChecked]     = useState(new Set());
  const [value,       setValue]       = useState({ department: "" });
  const [search,      setSearch]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast,       setToast]       = useState({ show: false, msg: "", ok: true });

  useEffect(() => { dispatch({ type: SET_ERRORS, payload: {} }); }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (store.admin.adminDeleted) {
      setValue({ department: "" });
      setLoading(false);
      setSearch(false);
      setChecked(new Set());
      dispatch({ type: DELETE_ADMIN, payload: false });
      flash("Admins deleted successfully!", true);
    }
  }, [store.admin.adminDeleted]);

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  const flash = (msg, ok = true) => {
    setToast({ show: true, msg, ok });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.department) return;
    setSearch(true);
    setLoading(true);
    setError({});
    setChecked(new Set());
    dispatch(getAdmin(value));
  };

  const toggleRow = (id) =>
    setChecked((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const toggleAll = () => {
    if (!students?.length) return;
    setChecked((prev) =>
      prev.size === students.length ? new Set() : new Set(students.map((s) => s._id))
    );
  };

  const dltAdmin = () => {
    setShowConfirm(false);
    setError({});
    setLoading(true);
    dispatch(deleteAdmin([...checked]));
  };

  const hasError  = error.noAdminError || error.backendError;
  const showTable = search && !loading && !hasError && students?.length > 0;
  const allChk    = !!students?.length && checked.size === students.length;
  const noChk     = checked.size === 0;

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

  const AVS = [
    { bg: "#e0e7ff", color: "#4338ca" }, { bg: "#dcfce7", color: "#16a34a" },
    { bg: "#fef9c3", color: "#ca8a04" }, { bg: "#fce7f3", color: "#be185d" },
    { bg: "#dbeafe", color: "#1d4ed8" }, { bg: "#ffedd5", color: "#c2410c" },
  ];
  const initials = (n = "") => n.split(" ").map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif", position: "relative" }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "18px" }}>
        🏠 Home &rsaquo; <span style={{ color: "#ef4444", fontWeight: 600 }}>Delete Admin</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#fef2f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>
            <DeleteIcon sx={{ fontSize: 22 }} />
          </div>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Delete Admin</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Search by department · select · delete</div>
          </div>
        </div>
        {checked.size > 0 && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", fontSize: "12.5px", fontWeight: 600, padding: "5px 14px", borderRadius: "20px" }}>
            {checked.size} selected
          </div>
        )}
      </div>

      {/* Search Card */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px 24px", marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "inline-block", width: "3px", height: "12px", background: "#ef4444", borderRadius: "2px" }} />
          Search Admin
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "flex-end", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569" }}>Department</label>
            <Select required displayEmpty value={value.department} onChange={(e) => setValue({ ...value, department: e.target.value })} sx={selSx}>
              <MenuItem value=""><span style={{ color: "#94a3b8" }}>Select department…</span></MenuItem>
              {departments?.map((dp, i) => <MenuItem key={i} value={dp.department}>{dp.department}</MenuItem>)}
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

      {/* Table Card */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>

        {/* Toolbar */}
        <div style={{ padding: "12px 20px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#1e293b" }}>Admin List</span>
            {showTable && (
              <span style={{ background: "#eff6ff", color: "#4361ee", border: "1px solid #bfdbfe", fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px" }}>
                {students.length} record{students.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {search && !loading && !hasError && (
            <button
              disabled={noChk}
              onClick={() => { if (!noChk) setShowConfirm(true); }}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 18px", background: noChk ? "#f3f4f6" : "#ef4444", color: noChk ? "#94a3b8" : "#fff", border: `1px solid ${noChk ? "#e2e8f0" : "transparent"}`, borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: noChk ? "not-allowed" : "pointer", fontFamily: "inherit" }}
              onMouseOver={(e) => { if (!noChk) e.currentTarget.style.background = "#dc2626"; }}
              onMouseOut={(e) => { if (!noChk) e.currentTarget.style.background = "#ef4444"; }}
            >
              <DeleteIcon sx={{ fontSize: 15 }} /> Delete{!noChk ? ` (${checked.size})` : ""}
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ padding: "48px 20px", display: "flex", justifyContent: "center" }}>
            <Spinner message="Loading…" height={50} width={150} color="#111111" messageColor="blue" />
          </div>
        )}

        {/* Error */}
        {!loading && hasError && (
          <div style={{ margin: "20px", padding: "12px 16px", borderRadius: "9px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px", fontWeight: 500 }}>
            ⚠️ {error.noAdminError || error.backendError}
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
                  <th style={{ ...thS, textAlign: "center", width: "46px" }}>
                    <input type="checkbox" checked={allChk} onChange={toggleAll} style={{ accentColor: "#ef4444", width: "15px", height: "15px", cursor: "pointer" }} />
                  </th>
                  <th style={{ ...thS, width: "48px", textAlign: "center" }}>#</th>
                  <th style={thS}>Name</th>
                  <th style={thS}>Username</th>
                  <th style={thS}>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((adm, idx) => {
                  const sel = checked.has(adm._id);
                  const av = AVS[idx % AVS.length];
                  return (
                    <tr
                      key={adm._id}
                      onClick={() => toggleRow(adm._id)}
                      style={{ background: sel ? "rgba(239,68,68,0.04)" : "transparent", borderBottom: "1px solid #f1f5f9", cursor: "pointer", transition: "background 0.1s" }}
                      onMouseOver={(e) => { if (!sel) e.currentTarget.style.background = "#f8fafc"; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = sel ? "rgba(239,68,68,0.04)" : "transparent"; }}
                    >
                      <td style={{ padding: "12px 14px", textAlign: "center" }}>
                        <input type="checkbox" checked={sel} onChange={() => toggleRow(adm._id)} onClick={(e) => e.stopPropagation()} style={{ accentColor: "#ef4444", width: "15px", height: "15px", cursor: "pointer" }} />
                      </td>
                      <td style={{ padding: "12px 14px", textAlign: "center", color: "#94a3b8", fontWeight: 500 }}>{idx + 1}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: av.bg, color: av.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                            {initials(adm.name)}
                          </div>
                          <span style={{ fontWeight: 600, color: "#1e293b" }}>{adm.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ background: "#eff6ff", color: "#4361ee", border: "1px solid #bfdbfe", fontSize: "12px", fontWeight: 500, padding: "3px 10px", borderRadius: "6px", fontFamily: "monospace" }}>
                          {adm.username}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>{adm.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div style={{ background: "#fff", borderRadius: "18px", padding: "36px 32px", maxWidth: "380px", width: "90%", textAlign: "center", boxShadow: "0 24px 60px rgba(0,0,0,0.16)", border: "1px solid #fecaca" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#fef2f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", margin: "0 auto 18px" }}>
              🗑️
            </div>
            <h3 style={{ margin: "0 0 10px", fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Delete Admins?</h3>
            <p style={{ margin: "0 0 24px", fontSize: "13.5px", color: "#64748b", lineHeight: 1.7 }}>
              You are about to permanently delete <strong style={{ color: "#ef4444" }}>{checked.size} admin{checked.size !== 1 ? "s" : ""}</strong>. This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setShowConfirm(false)} style={{ padding: "10px 26px", background: "#f3f4f6", color: "#475569", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                Cancel
              </button>
              <button onClick={dltAdmin}
                style={{ padding: "10px 26px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                onMouseOver={(e) => e.currentTarget.style.background = "#dc2626"}
                onMouseOut={(e) => e.currentTarget.style.background = "#ef4444"}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div style={{ position: "fixed", bottom: "28px", right: "28px", background: toast.ok ? "#f0fdf4" : "#fef2f2", border: `1px solid ${toast.ok ? "#bbf7d0" : "#fecaca"}`, color: toast.ok ? "#16a34a" : "#ef4444", fontSize: "13.5px", fontWeight: 500, padding: "12px 20px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px", zIndex: 10000, boxShadow: "0 8px 30px rgba(0,0,0,0.10)" }}>
          {toast.ok ? "✅" : "⚠️"} {toast.msg}
        </div>
      )}
    </div>
  );
};

export default Body;