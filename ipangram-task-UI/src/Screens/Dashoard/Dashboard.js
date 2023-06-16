import React from "react";
import TitleLabel from "../../CommonComponents/TitleLabel/TitleLabel";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const authUser = useSelector((state) => state.LoginReducer.list[0]);
  return (
    <div className="container">
      <TitleLabel titleLabel={"Dashboard"} />

      <h1>Welcome...</h1>
      <h3>{authUser !== undefined ? authUser.name : ""}</h3>
    </div>
  );
};

export default Dashboard;
