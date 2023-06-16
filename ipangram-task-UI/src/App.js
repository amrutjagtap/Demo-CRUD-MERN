import { useState, useEffect } from "react";
import "./App.css";

import LoginComponent from "./Screens/Login/LoginComponent";
import MasterComp from "./CommonComponents/MasterComp";
import Dashboard from "./Screens/Dashoard/Dashboard";
import DepartmentMaster from "./Screens/Department/DepartmentMaster";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComp from "./CommonComponents/HeaderComp";
import EmployeeMaster from "./Screens/Employee/EmployeeMaster";

//redux
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./ReduxStore/Action/LoginAction";
import { useNavigate } from "react-router-dom";
import { getDataByTokenAPI } from "./API/EmployeeAPI";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DepartmentAllocation from "./Screens/Department/DepartmentAllocation";
import Query1 from "./Screens/Query/Query1";
import Query2 from "./Screens/Query/Query2";
import EmployeeProfile from "./Screens/Employee/EmployeeProfile";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.LoginReducer.list[0]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // console.log("Session Data", token);
      const headers = {
        token,
        // Other headers if needed
      };
      axios.get(getDataByTokenAPI, { headers }).then((res) => {
        if (res.data === "UNAUTHORIZED") {
          sessionStorage.removeItem("token");
          navigate("/");
        } else if (res.data !== null) {
          let logObject = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            userType: res.data.userType,
            token: res.data.token,
          };
          dispatch(userLogin(logObject));
        }
      });
      // const parseData = JSON.parse(sessionData);
      // dispatch(userLogin(parseData));
    }
  }, []);

  return (
    <>
      {authUser !== undefined ? <HeaderComp navigate={navigate} /> : null}

      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/department" element={<DepartmentMaster />} />
        <Route path="/employee" element={<EmployeeMaster />} />
        <Route path="/dept-allocation" element={<DepartmentAllocation />} />
        <Route path="/query-1" element={<Query1 />} />
        <Route path="/query-2" element={<Query2 />} />
        <Route path="/profile" element={<EmployeeProfile />} />
      </Routes>
    </>
  );
}

export default App;
