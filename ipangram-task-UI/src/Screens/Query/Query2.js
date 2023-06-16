import React, { useState, useEffect } from "react";
import TitleLabel from "../../CommonComponents/TitleLabel/TitleLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeptAPI, getEmpLocDeptAPI } from "../../API/DepartmentAPI";

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../CommonComponents/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { userLogout } from "../../ReduxStore/Action/LoginAction";
import {
  getAllEmployeeAPI,
  getEmpDeptNameDesc,
  updateMultiEmpDeptAPI,
} from "../../API/EmployeeAPI";

const Query2 = () => {
  const authUser = useSelector((state) => state.LoginReducer.list[0]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaderStatus, setLoaderStatus] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [deptData, setDeptData] = useState([]);
  const [deptObj, setDeptObj] = useState(null);
  const [location, setLocation] = useState("");

  const getAllEmpData = (e) => {
    e.preventDefault();
    setLoaderStatus(true);
    let token = authUser.token;
    let headers = {
      token,
    };

    const newObj = {
      id: deptObj.id,
    };

    axios
      .post(getEmpDeptNameDesc, newObj, { headers })
      .then((res) => {
        if (res.data === "UNAUTHORIZED") {
          sessionStorage.removeItem("token");
          dispatch(userLogout());
          setLoaderStatus(false);
          navigate("/");
        } else if (res.data !== null) {
          if (res.data.length > 0) {
            const output = res.data.map((obj) => {
              const updatedObj = { ...obj }; // Create a shallow copy of the original object

              updatedObj.deptName = updatedObj.department_master.departmentName;
              updatedObj.deptLocation = updatedObj.department_master.location;

              return updatedObj;
            });

            setTableData(output);
            setFilterData(output);
          } else {
            toast.info("No Records Found");
            setTableData([]);
            setFilterData([]);
          }

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

  const getAllDeptData = () => {
    setLoaderStatus(true);
    let token = authUser.token;
    let headers = {
      token,
    };

    axios
      .get(getAllDeptAPI, { headers })
      .then((res) => {
        if (res.data === "UNAUTHORIZED") {
          sessionStorage.removeItem("token");
          dispatch(userLogout());
          setLoaderStatus(false);
          navigate("/");
        } else if (res.data !== null) {
          setDeptData(res.data);

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
        navigate("/dashboard");
      }
      getAllDeptData();
    }
  }, [authUser]);

  //   Table Grid
  // Table Data Grid
  const [searchTerm, setSearchTerm] = useState("");

  //   id, departmentName, categoryName, location, salary, createdAt, updatedAt
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerClassName: "mc-table-head primary",
    },
    {
      field: "firstName",
      headerName: "First Name",
      headerClassName: "mc-table-head primary",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "email",
      headerName: "Email ID",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "deptName",
      headerName: "Department",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "deptLocation",
      headerName: "Location",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 100,
    },
  ];

  useEffect(() => {
    setFilterData(
      tableData.filter(
        (item) =>
          item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.deptName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="container">
      {loaderStatus ? <Loader /> : null}
      <TitleLabel titleLabel={"Query 2"} />
      <p>
        Make a query that retrieves an employee/s who are in Sales department
        and descending order of employees name.
      </p>
      <form onSubmit={getAllEmpData}>
        <div className="row mt-3">
          <div className="col-md-4">
            <strong>Select Department:</strong>
            <Autocomplete
              id="select-dept"
              fullWidth
              // sx={{ width: 300 }}
              options={deptData}
              value={deptObj}
              onChange={(event, newValue) => {
                setDeptObj(newValue);
              }}
              autoHighlight
              getOptionLabel={(option) => option.departmentName}
              renderInput={(params) => (
                <TextField
                  margin="dense"
                  required
                  size="small"
                  {...params}
                  label="Select Department"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </div>

          <div className="col-md-4">
            <button type="submit" className="btn btn-primary mt-5">
              SEARCH
            </button>
          </div>
        </div>
      </form>
      <hr />
      <div className="row mb-2">
        <div className="col-sm-3 offset-sm-9">
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>

      <DataGrid
        rows={filterData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Query2;
