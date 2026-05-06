import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import BoyIcon from "@mui/icons-material/Boy";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const active = {
  display: "flex", alignItems: "center", gap: "10px",
  padding: "9px 18px", cursor: "pointer",
  color: "#fff", fontSize: "13px", fontWeight: 500,
  borderLeft: "2px solid #4361ee",
  background: "rgba(67,97,238,0.15)",
  textDecoration: "none", transition: "all 0.15s",
};

const inactive = {
  display: "flex", alignItems: "center", gap: "10px",
  padding: "9px 18px", cursor: "pointer",
  color: "rgba(255,255,255,0.65)", fontSize: "13px", fontWeight: 500,
  borderLeft: "2px solid transparent",
  background: "transparent",
  textDecoration: "none", transition: "all 0.15s",
};

const SectionLabel = ({ children }) => (
  <div style={{
    fontSize: "9.5px", fontWeight: 600, color: "rgba(255,255,255,0.25)",
    textTransform: "uppercase", letterSpacing: "1.2px",
    padding: "14px 18px 5px"
  }}>
    {children}
  </div>
);

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("adminUser")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/adminLogin");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decoded = decode(token);
      if (decoded.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("admin")));
  }, [navigate]);

  const sidebarStyle = {
    width: "220px",
    background: "#0f172a",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    overflowY: "auto",
    height: "100vh",
    position: "sticky",
    top: 0,
    zIndex: 100,
    transition: "transform 0.3s",
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "none", position: "fixed", top: "13px", left: "14px",
          zIndex: 200, background: "#f8fafc", border: "1px solid #e2e8f0",
          borderRadius: "8px", width: "34px", height: "34px",
          alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}
        className="hamburger-btn"
      >
        <MenuIcon sx={{ fontSize: 18 }} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
            zIndex: 99, display: "block"
          }}
        />
      )}

      <nav style={{
        ...sidebarStyle,
        transform: open ? "translateX(0)" : undefined,
      }}>
        {/* Logo */}
        <div style={{
          padding: "20px 18px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", gap: "10px"
        }}>
          <div style={{
            width: "34px", height: "34px", background: "#4361ee",
            borderRadius: "8px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff"
          }}>MU</div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>EduAdmin</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.5px" }}>
              Mewar University
            </div>
          </div>
          {open && (
            <CloseIcon
              onClick={() => setOpen(false)}
              sx={{ fontSize: 18, color: "rgba(255,255,255,0.4)", marginLeft: "auto", cursor: "pointer" }}
            />
          )}
        </div>

        {/* Nav Items */}
        <SectionLabel>Main</SectionLabel>
        <NavLink to="/admin/home" style={({ isActive }) => isActive ? active : inactive}>
          <HomeIcon sx={{ fontSize: 17 }} /> Dashboard
        </NavLink>
        <NavLink to="/admin/profile" style={({ isActive }) => isActive ? active : inactive}>
          <AssignmentIndIcon sx={{ fontSize: 17 }} /> Profile
        </NavLink>

        <SectionLabel>Notices</SectionLabel>
        <NavLink to="/admin/createNotice" style={({ isActive }) => isActive ? active : inactive}>
          <NotificationsActiveIcon sx={{ fontSize: 17 }} /> Create Notice
        </NavLink>

        <SectionLabel>Admins</SectionLabel>
        <NavLink to="/admin/addadmin" style={({ isActive }) => isActive ? active : inactive}>
          <AddIcon sx={{ fontSize: 17 }} /> Add Admin
        </NavLink>
        <NavLink to="/admin/deleteadmin" style={({ isActive }) => isActive ? active : inactive}>
          <DeleteIcon sx={{ fontSize: 17 }} /> Delete Admin
        </NavLink>

        <SectionLabel>Departments</SectionLabel>
        <NavLink to="/admin/adddepartment" style={({ isActive }) => isActive ? active : inactive}>
          <ApartmentIcon sx={{ fontSize: 17 }} /> Add Department
        </NavLink>
        <NavLink to="/admin/deletedepartment" style={({ isActive }) => isActive ? active : inactive}>
          <DeleteIcon sx={{ fontSize: 17 }} /> Delete Department
        </NavLink>

        <SectionLabel>Faculty</SectionLabel>
        <NavLink to="/admin/allfaculty" style={({ isActive }) => isActive ? active : inactive}>
          <EngineeringIcon sx={{ fontSize: 17 }} /> Our Faculty
        </NavLink>
        <NavLink to="/admin/addfaculty" style={({ isActive }) => isActive ? active : inactive}>
          <AddIcon sx={{ fontSize: 17 }} /> Add Faculty
        </NavLink>
        <NavLink to="/admin/deletefaculty" style={({ isActive }) => isActive ? active : inactive}>
          <DeleteIcon sx={{ fontSize: 17 }} /> Delete Faculty
        </NavLink>

        <SectionLabel>Students</SectionLabel>
        <NavLink to="/admin/allstudent" style={({ isActive }) => isActive ? active : inactive}>
          <BoyIcon sx={{ fontSize: 17 }} /> Our Students
        </NavLink>
        <NavLink to="/admin/addstudent" style={({ isActive }) => isActive ? active : inactive}>
          <AddIcon sx={{ fontSize: 17 }} /> Add Student
        </NavLink>
        <NavLink to="/admin/deletestudent" style={({ isActive }) => isActive ? active : inactive}>
          <DeleteIcon sx={{ fontSize: 17 }} /> Delete Student
        </NavLink>

        <SectionLabel>Subjects</SectionLabel>
        <NavLink to="/admin/allsubject" style={({ isActive }) => isActive ? active : inactive}>
          <MenuBookIcon sx={{ fontSize: 17 }} /> Subjects
        </NavLink>
        <NavLink to="/admin/addsubject" style={({ isActive }) => isActive ? active : inactive}>
          <AddIcon sx={{ fontSize: 17 }} /> Add Subject
        </NavLink>
        <NavLink to="/admin/deletesubject" style={({ isActive }) => isActive ? active : inactive}>
          <DeleteIcon sx={{ fontSize: 17 }} /> Delete Subject
        </NavLink>
      </nav>

      <style>{`
        @media (max-width: 900px) {
          nav { position: fixed !important; transform: translateX(-220px); }
          nav.open { transform: translateX(0) !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Sidebar;