import React, { useState, useEffect } from "react";
import TitleLabel from "../../CommonComponents/TitleLabel/TitleLabel";
import { useDispatch, useSelector } from "react-redux";
import { getEmpByIdApi } from "../../API/EmployeeAPI";
import axios from "axios";
import Loader from "../../CommonComponents/Loader";
import { userLogout } from "../../ReduxStore/Action/LoginAction";
import { useNavigate } from "react-router-dom";

const EmployeeProfile = () => {
  const authUser = useSelector((state) => state.LoginReducer.list[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [data, setData] = useState(null);

  const getEmpDataById = () => {
    setLoaderStatus(true);
    let token = authUser.token;
    let headers = {
      token,
    };

    axios
      .get(getEmpByIdApi, { headers })
      .then((res) => {
        if (res.data === "UNAUTHORIZED") {
          sessionStorage.removeItem("token");
          dispatch(userLogout());
          setLoaderStatus(false);
          navigate("/");
        } else if (res.data !== null) {
          setData(res.data);
          setLoaderStatus(false);
          
        }
      })
      .catch((err) => {
        setLoaderStatus(false);
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  };

  useEffect(() => {
    if (authUser != undefined) {
      if (authUser.userType == "employee") {
        getEmpDataById();
      }
    }
  }, [authUser]);
  return (
    <div className="container">
      {loaderStatus ? <Loader /> : null}

      <TitleLabel titleLabel={"Your Profile Details"} />

      {authUser !== undefined ? (
        <div className="row mt-5">
          <div className="col-md-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <td scope="col">{authUser.name}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Email Id</th>
                  <td>{authUser.email}</td>
                </tr>
                <tr>
                  <th scope="row">Role</th>
                  <td>{authUser.userType}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}

      {data ? (
        authUser.userType == "employee" ? (
          <div className="row">
            <div className="col-sm-12">
              <table className="table table-bordered border-primary">
                <thead>
                  <tr>
                    <th scope="col">Department Name</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{data.department_master.departmentName}</th>
                    <th scope="row">{data.department_master.categoryName}</th>
                    <th scope="row">{data.department_master.location}</th>
                    <th scope="row">{data.department_master.salary}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeeProfile;
