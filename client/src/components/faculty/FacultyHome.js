import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotice } from "../../redux/actions/adminActions";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

const FacultyHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("facultyUser"));

  useEffect(() => {
    if (!user) {
      navigate("/login/facultylogin");
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getNotice());
    }
  }, [dispatch]);

  if (!user) return null;

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
      <div className="flex flex-col bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-y-hidden">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;
