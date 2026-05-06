// AddStudent.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDepartment } from "../../../redux/actions/adminActions";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Body from "./Body";

const AddStudent = () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getAllDepartment()); }, [dispatch]);
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f0f4ff", height: "100vh", display: "flex", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header />
        <Body />
      </div>
    </div>
  );
};
export default AddStudent;