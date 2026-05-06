import React from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Profile = () => {
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

export default Profile;