import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllStudent,
  getAllFaculty,
  getAllAdmin,
  getAllDepartment,
  getNotice,
} from "../../redux/actions/adminActions";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("adminUser"));

  useEffect(() => {
    if (!user) {
      navigate("/login/adminlogin");
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getAllStudent());
      dispatch(getAllFaculty());
      dispatch(getAllAdmin());
      dispatch(getAllDepartment());
      dispatch(getNotice());
    }
  }, [dispatch]);

  if (!user) return null;

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: "#f0f4ff",
      height: "100vh",
      display: "flex",
      overflow: "hidden"
    }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default AdminHome;