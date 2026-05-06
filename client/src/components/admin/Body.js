import React, { useState } from "react";
import { useSelector } from "react-redux";
import Notice from "../notices/Notice";
import ShowNotice from "../notices/ShowNotice";
import ReplyIcon from "@mui/icons-material/Reply";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const MONTHS = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const StatCard = ({ icon, label, value, color, bg }) => (
  <div style={{
    background: "#fff", borderRadius: "14px", padding: "18px 20px",
    border: "1px solid #e2e8f0", display: "flex", alignItems: "center",
    gap: "14px", flex: 1, minWidth: "120px",
  }}>
    <div style={{
      width: "46px", height: "46px", borderRadius: "12px",
      background: bg, display: "flex", alignItems: "center",
      justifyContent: "center", flexShrink: 0, color
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 500, marginBottom: "3px" }}>{label}</div>
      <div style={{ fontSize: "24px", fontWeight: 700, color: "#1e293b", lineHeight: 1 }}>{value ?? "—"}</div>
    </div>
  </div>
);

const Calendar = () => {
  const [cur, setCur] = useState(new Date(2026, 4, 1));
  const today = new Date();
  const m = cur.getMonth(), y = cur.getFullYear();
  const firstDay = new Date(y, m, 1).getDay();
  const lastDate = new Date(y, m + 1, 0).getDate();
  const prevLast = new Date(y, m, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++)
    cells.push({ d: prevLast - firstDay + i + 1, other: true });
  for (let d = 1; d <= lastDate; d++)
    cells.push({ d, isToday: d === today.getDate() && m === today.getMonth() && y === today.getFullYear() });
  while (cells.length < 42) cells.push({ d: cells.length - firstDay - lastDate + 1, other: true });

  return (
    <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{MONTHS[m]} {y}</span>
        <div style={{ display: "flex", gap: "4px" }}>
          {[-1, 1].map(dir => (
            <button key={dir} onClick={() => setCur(new Date(y, m + dir, 1))} style={{
              width: "26px", height: "26px", borderRadius: "6px",
              border: "1px solid #e2e8f0", background: "#f8fafc",
              cursor: "pointer", fontSize: "13px", color: "#64748b"
            }}>{dir === -1 ? "‹" : "›"}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px", textAlign: "center" }}>
        {DAYS.map(d => (
          <div key={d} style={{ fontSize: "9.5px", color: "#94a3b8", fontWeight: 600, padding: "4px 0", textTransform: "uppercase" }}>{d}</div>
        ))}
        {cells.map((c, i) => (
          <div key={i} style={{
            fontSize: "12px", padding: "5px 2px", borderRadius: "6px",
            cursor: "pointer", fontWeight: c.isToday ? 700 : 500,
            background: c.isToday ? "#4361ee" : "transparent",
            color: c.isToday ? "#fff" : c.other ? "#cbd5e1" : "#1e293b",
          }}>{c.d}</div>
        ))}
      </div>
    </div>
  );
};

const Body = () => {
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const notices = useSelector((state) => state.admin.notices.result);
  const students = useSelector((state) => state.admin.allStudent);
  const faculties = useSelector((state) => state.admin.allFaculty);
  const admins = useSelector((state) => state.admin.allAdmin);
  const departments = useSelector((state) => state.admin.allDepartment);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#f0f4ff" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#64748b", marginBottom: "18px" }}>
        🏠 &nbsp;Home <span style={{ color: "#4361ee", fontWeight: 600 }}>/ Dashboard</span>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "20px" }}>
        <StatCard icon={<EngineeringIcon sx={{ fontSize: 22 }} />} label="Faculty" value={faculties?.length} color="#ea580c" bg="#fff7ed" />
        <StatCard icon={<BoyIcon sx={{ fontSize: 22 }} />} label="Students" value={students?.length} color="#2563eb" bg="#eff6ff" />
        <StatCard icon={<SupervisorAccountIcon sx={{ fontSize: 22 }} />} label="Admins" value={admins?.length} color="#7c3aed" bg="#faf5ff" />
        <StatCard icon={<MenuBookIcon sx={{ fontSize: 22 }} />} label="Departments" value={departments?.length} color="#16a34a" bg="#f0fdf4" />
      </div>

      {/* Bottom Row */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {/* Calendar */}
        <div style={{ width: "280px", minWidth: "260px", flexShrink: 0 }}>
          <Calendar />
        </div>

        {/* Notices */}
        <div style={{
          flex: 1, minWidth: "260px", background: "#fff",
          borderRadius: "14px", border: "1px solid #e2e8f0", padding: "18px",
          display: "flex", flexDirection: "column"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "14px" }}>
            {open && (
              <ReplyIcon onClick={() => setOpen(false)}
                style={{ cursor: "pointer", marginRight: "8px", color: "#64748b", fontSize: "18px" }} />
            )}
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>📋 Notices</span>
          </div>
          <div style={{ overflowY: "auto", maxHeight: "230px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {!open ? (
              notices?.map((notice, idx) => (
                <div key={idx} onClick={() => { setOpen(true); setOpenNotice(notice); }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "10px",
                    padding: "11px 14px", borderRadius: "10px",
                    background: "#f8fafc", border: "1px solid #f1f5f9", cursor: "pointer"
                  }}>
                  <Notice idx={idx} notice={notice} notFor="" />
                </div>
              ))
            ) : (
              <ShowNotice notice={openNotice} />
            )}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 600px) {
          div[style*="flex: 1, minWidth"] { min-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default Body;