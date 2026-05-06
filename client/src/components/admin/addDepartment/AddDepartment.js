import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Body from "./Body";

const AddDepartment = () => {
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

export default AddDepartment;