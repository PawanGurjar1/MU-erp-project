import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudent,
  markAttendance,
} from "../../../redux/actions/facultyActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { ATTENDANCE_MARKED, SET_ERRORS } from "../../../redux/actionTypes";
import { getSubject } from "../../../redux/actions/adminActions";

const Body = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("facultyUser"));
  const departments = useSelector((state) => state.admin.allDepartment);
  const subjects = useSelector((state) => state.admin.subjects.result);
  const students = useSelector((state) => state.admin.students.result); // Move up

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [subjectName, setSubjectName] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);
  const [value, setValue] = useState({
    department: "",
    year: "",
    section: "",
  });
  const [search, setSearch] = useState(false); // Ye state properly manage karo

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleInputChange = (e) => {
    const tempCheck = [...checkedValue];
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      const index = tempCheck.indexOf(e.target.value);
      if (index > -1) tempCheck.splice(index, 1); // Safety check
    }
    setCheckedValue(tempCheck);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true); // Search true karo
    setLoading(true);
    setError({});
    setCheckedValue([]);
    setSubjectName(""); // Reset subject bhi
    
    // Clear previous data
    dispatch({ type: SET_ERRORS, payload: {} });
    
    // API calls
    dispatch(getStudent(value));
    dispatch(getSubject({ department: value.department, year: value.year }));
  };

  const uploadAttendance = () => {
    if (!subjectName) {
      setError({ backendError: "Subject select karo pehle" });
      return;
    }
    if (checkedValue.length === 0) {
      setError({ backendError: "Koi student select karo" });
      return;
    }
    
    setError({});
    setLoading(true);
    dispatch(
      markAttendance(
        checkedValue,
        subjectName,
        value.department,
        value.year,
        value.section
      )
    );
  };

  // Success handling - RESET EVERYTHING
  useEffect(() => {
    if (store.faculty.attendanceUploaded) {
      setLoading(false);
      setValue({ department: "", year: "", section: "" });
      setSearch(false); // ❌ YE IMPORTANT HAI - search false karo
      setSubjectName("");
      setCheckedValue([]);
      setError({});
      dispatch({ type: SET_ERRORS, payload: {} });
      dispatch({ type: ATTENDANCE_MARKED, payload: false });
    }
  }, [store.faculty.attendanceUploaded]);

  // Students loaded - stop loading
  useEffect(() => {
    if (search && students !== undefined) { // students !== undefined check
      setLoading(false);
    }
  }, [students, search]);

  // Clear errors on mount
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        <div className="mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          
          {/* FORM - Always visible */}
          <form className="flex flex-col space-y-2 col-span-1" onSubmit={handleSubmit}>
            <label htmlFor="department">Department</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              value={value.department}
              onChange={(e) => setValue({ ...value, department: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            
            <label htmlFor="year">Year</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              value={value.year}
              onChange={(e) => setValue({ ...value, year: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
            
            <label htmlFor="section">Section</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              value={value.section}
              onChange={(e) => setValue({ ...value, section: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>

            <button className={`${classes.adminFormSubmitButton} w-56`} type="submit">
              Search
            </button>
          </form>

          {/* RESULTS AREA */}
          <div className="col-span-3 mr-6">
            {/* Loading/Error */}
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading students..."
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(!loading && error.noStudentError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noStudentError}
                </p>
              )}
              {(!loading && error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.backendError}
                </p>
              )}
            </div>

            {/* ✅ STUDENTS LIST - Simplified condition */}
            {search && !loading && students?.length > 0 && (
              <div>
                {/* Students Table */}
                <div className={`${classes.adminData} h-[20rem] overflow-y-auto`}>
                  <div className="grid grid-cols-7 sticky top-0 bg-white z-10">
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>Select</h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>Sr no.</h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>Name</h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>Username</h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>Section</h1>
                  </div>
                  {students.map((stu, idx) => (
                    <div key={stu._id || idx} className={`${classes.adminDataBody} grid grid-cols-7`}>
                      <input
                        onChange={handleInputChange}
                        value={stu._id}
                        type="checkbox"
                        className="col-span-1 border-2 w-16 h-4 mt-3 px-2"
                      />
                      <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>{idx + 1}</h1>
                      <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>{stu.name}</h1>
                      <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>{stu.username}</h1>
                      <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>{stu.section}</h1>
                    </div>
                  ))}
                </div>

                {/* Subject Selection + Mark Button */}
                <div className="space-x-3 flex items-center justify-center mt-5">
                  <label className="font-bold text-lg">Subject</label>
                  <Select
                    sx={{ height: 36, width: 224 }}
                    displayEmpty
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                  >
                    <MenuItem value="">Select Subject</MenuItem>
                    {subjects?.map((sub, idx) => (
                      <MenuItem key={idx} value={sub.subjectName}>
                        {sub.subjectName}
                      </MenuItem>
                    ))}
                  </Select>
                  <button
                    onClick={uploadAttendance}
                    disabled={checkedValue.length === 0}
                    className={`${classes.adminFormSubmitButton} bg-blue-500 disabled:bg-gray-400`}
                  >
                    Mark Attendance ({checkedValue.length})
                  </button>
                </div>
              </div>
            )}

            {/* No students found */}
            {search && !loading && students?.length === 0 && !error.noStudentError && (
              <p className="text-center text-gray-500 mt-10 text-xl">
                No students found for this selection
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;