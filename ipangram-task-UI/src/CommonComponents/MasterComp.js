import React from "react";
import HeaderComp from "./HeaderComp";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Screens/Dashoard/Dashboard";
import DepartmentMaster from "../Screens/Department/DepartmentMaster";
import LoginComponent from "../Screens/Login/LoginComponent";
import DepartmentAllocation from "../Screens/Department/DepartmentAllocation";
const MasterComp = () => {
  return (
    <>
      <HeaderComp />
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/department" element={<DepartmentMaster />} />
        <Route path="/dept-allocation" element={<DepartmentAllocation />} />
      </Routes>
    </>
  );
};

export default MasterComp;
