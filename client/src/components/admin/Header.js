import React, { useState, useRef, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const bellRef = useRef(null);

  const notices = useSelector((state) => state.admin.notices?.result) ?? [];

  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login/adminlogin");
  };

  if (!user) return null;

  return (
    <>
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes badgePop {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .notif-item:hover { background: #f0f4ff !important; }
        .notif-scroll::-webkit-scrollbar { width: 4px; }
        .notif-scroll::-webkit-scrollbar-track { background: transparent; }
        .notif-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }
      `}</style>

      <header style={{
        height: "62px",
        background: "#fff",
        borderBottom: "1px solid #e8edf5",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        gap: "14px",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 8px rgba(67,97,238,0.06)",
      }}>

        {/* Title */}
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", flex: 1, letterSpacing: "-0.2px" }}>
          Dashboard
        </div>

        {/* ── Notification Bell ── */}
        <div ref={bellRef} style={{ position: "relative" }}>
          <button
            onClick={() => setNotifOpen((p) => !p)}
            style={{
              width: "38px", height: "38px", borderRadius: "10px",
              border: `1.5px solid ${notifOpen ? "#4361ee" : "#e2e8f0"}`,
              background: notifOpen ? "#f0f4ff" : "#f8fafc",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
              transition: "all 0.18s", outline: "none",
              boxShadow: notifOpen ? "0 0 0 3px rgba(67,97,238,0.12)" : "none",
            }}
          >
            <NotificationsIcon sx={{ fontSize: 18, color: notifOpen ? "#4361ee" : "#64748b" }} />

            {/* Count Badge */}
            {notices.length > 0 && (
              <span style={{
                position: "absolute", top: "-6px", right: "-6px",
                minWidth: "18px", height: "18px",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                borderRadius: "99px", border: "2px solid #fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "9.5px", fontWeight: 800, color: "#fff",
                padding: "0 4px", lineHeight: 1,
                animation: "badgePop 0.35s cubic-bezier(.36,.07,.19,.97)",
                boxShadow: "0 2px 6px rgba(239,68,68,0.45)",
              }}>
                {notices.length > 99 ? "99+" : notices.length}
              </span>
            )}
          </button>

          {/* ── Dropdown ── */}
          {notifOpen && (
            <div style={{
              position: "absolute", top: "46px", right: 0,
              width: "320px", background: "#fff",
              borderRadius: "16px", border: "1px solid #e8edf5",
              boxShadow: "0 20px 60px rgba(15,23,42,0.14), 0 4px 16px rgba(67,97,238,0.08)",
              zIndex: 200, overflow: "hidden",
              animation: "dropIn 0.2s ease",
            }}>

              {/* Dropdown Top Bar */}
              <div style={{
                padding: "14px 18px 12px",
                background: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <NotificationsIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.85)" }} />
                  <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#fff", letterSpacing: "-0.1px" }}>
                    Notices
                  </span>
                </div>
                <span style={{
                  fontSize: "11px", fontWeight: 700,
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff", padding: "3px 10px", borderRadius: "99px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(4px)",
                }}>
                  {notices.length} {notices.length === 1 ? "notice" : "notices"}
                </span>
              </div>

              {/* Notice List */}
              <div className="notif-scroll" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {notices.length === 0 ? (
                  <div style={{
                    padding: "32px 20px", textAlign: "center",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                  }}>
                    <span style={{ fontSize: "28px" }}>🔔</span>
                    <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500 }}>No notices yet</span>
                  </div>
                ) : (
                  notices.map((notice, idx) => (
                    <div key={idx} className="notif-item" style={{
                      padding: "13px 18px",
                      borderBottom: idx !== notices.length - 1 ? "1px solid #f1f5f9" : "none",
                      cursor: "pointer", transition: "background 0.12s",
                      display: "flex", gap: "12px", alignItems: "flex-start",
                    }}>
                      {/* Icon dot */}
                      <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: "#4361ee", marginTop: "5px", flexShrink: 0,
                        boxShadow: "0 0 0 3px rgba(67,97,238,0.15)",
                      }} />

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: "13px", fontWeight: 600, color: "#1e293b",
                          marginBottom: "3px", letterSpacing: "-0.1px",
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                          {notice.topic || notice.title || `Notice ${idx + 1}`}
                        </div>
                        <div style={{
                          fontSize: "11.5px", color: "#64748b", lineHeight: 1.5,
                          display: "-webkit-box", WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical", overflow: "hidden",
                        }}>
                          {notice.notice || notice.description || notice.content || "—"}
                        </div>
                        {notice.date && (
                          <div style={{
                            fontSize: "10.5px", color: "#94a3b8", marginTop: "5px",
                            display: "flex", alignItems: "center", gap: "4px",
                          }}>
                            🗓 {new Date(notice.date).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notices.length > 0 && (
                <div style={{
                  padding: "10px 18px",
                  borderTop: "1px solid #f1f5f9",
                  background: "#fafbff",
                  textAlign: "center",
                }}>
                  <span
                    onClick={() => { setNotifOpen(false); navigate("/admin/createNotice"); }}
                    style={{
                      fontSize: "12px", color: "#4361ee", fontWeight: 600,
                      cursor: "pointer", letterSpacing: "-0.1px",
                    }}
                  >
                    Manage Notices →
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Pill */}
        <div
          onClick={() => navigate("/admin/profile")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "4px 12px 4px 4px", borderRadius: "40px",
            border: "1.5px solid #e2e8f0", cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = "#f0f4ff"; e.currentTarget.style.borderColor = "#4361ee"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
        >
          <Avatar
            src={user.result.avatar}
            alt={user.result.name.charAt(0).toUpperCase()}
            sx={{ width: 28, height: 28, fontSize: "12px", fontWeight: 700 }}
          />
          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#1e293b" }}>
            {user.result.name.split(" ")[0]}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "7px 13px", borderRadius: "8px",
            border: "1.5px solid #fecaca", background: "#fef2f2",
            color: "#dc2626", fontSize: "11.5px", fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.borderColor = "#fca5a5"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.borderColor = "#fecaca"; }}
        >
          <LogoutIcon sx={{ fontSize: 14 }} />
          Logout
        </button>
      </header>
    </>
  );
};

export default Header;