import React, { useState, useEffect } from "react";
import TitleLabel from "../../CommonComponents/TitleLabel/TitleLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../CommonComponents/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "react-bootstrap/Modal";
import {
  createEmployeeAPI,
  updateEmployeeAPI,
  getAllEmployeeAPI,
} from "../../API/EmployeeAPI";
import { userLogout } from "../../ReduxStore/Action/LoginAction";

const EmployeeMaster = () => {
  const authUser = useSelector((state) => state.LoginReducer.list[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [id, setId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  //   Table Grid
  // Table Data Grid
  const [searchTerm, setSearchTerm] = useState("");

  // Formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      hobbies: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.firstName) {
        errors.firstName = "First Name is required";
      }

      if (!values.lastName) {
        errors.lastName = "Last Name is required";
      }

      if (!values.gender) {
        errors.gender = "Gender is required";
      }

      if (!values.hobbies) {
        errors.hobbies = "Hobbies are required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (
        !/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}/.test(values.password)
      ) {
        errors.password =
          "Password should be at least 8 characters long and include one capital letter and one symbol";
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      setLoaderStatus(true);
      // Handle form submission

      // console.log(values);

      let token = authUser.token;
      let headers = {
        token,
      };

      if (id == "") {
        values.userType = "employee";
        axios
          .post(createEmployeeAPI, values, { headers })
          .then((res) => {
            if (res.data === "UNAUTHORIZED") {
              sessionStorage.removeItem("token");
              dispatch(userLogout());
              setLoaderStatus(false);
              navigate("/");
            } else if (res.data === "SAVED") {
              getAllEmpData();
              setLoaderStatus(false);
              toast.success("Employee created sucessfully");
              resetForm();
            } else if (res.data === "ALREADYEXISTS") {
              setLoaderStatus(false);
              toast.warn("Employee already registered with this email id ");
            }
          })
          .catch((err) => {
            setLoaderStatus(false);
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            toast.error("Employee creation failed, try again");
          });
      } else {
        values.id = id;
        axios
          .put(updateEmployeeAPI, values, { headers })
          .then((res) => {
            if (res.data === "UNAUTHORIZED") {
              sessionStorage.removeItem("token");
              dispatch(userLogout());
              setLoaderStatus(false);
              navigate("/");
            } else if (res.data === "UPDATED") {
              getAllEmpData();
              setLoaderStatus(false);
              setId("");
              toast.success("Employee updated sucessfully");
              resetForm();
            } else if (res.data === "ALREADYEXISTS") {
              setLoaderStatus(false);
              toast.warn("Employee already registered with this email id ");
            }
          })
          .catch((err) => {
            setLoaderStatus(false);
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            toast.error("Employee updation failed, try again");
          });
      }
    },
  });

  const getAllEmpData = () => {
    setLoaderStatus(true);
    let token = authUser.token;
    let headers = {
      token,
    };

    axios
      .get(getAllEmployeeAPI, { headers })
      .then((res) => {
        if (res.data === "UNAUTHORIZED") {
          sessionStorage.removeItem("token");
          dispatch(userLogout());
          setLoaderStatus(false);
          navigate("/");
        } else if (res.data !== null) {
          setTableData(res.data);
          setFilterData(res.data);
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
      getAllEmpData();
    }
  }, [authUser]);

  //   Table Grid

  const [pageSize, setPageSize] = useState(5);
  //  id, firstName, lastName, gender, hobbies, email, password, userType, createdAt, updatedAt, departmentId
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
      headerName: "Email Id",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "password",
      headerName: "Password",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "gender",
      headerName: "Gender",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "hobbies",
      headerName: "Hobbies",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "edit",
      headerName: "Action",
      headerClassName: "mc-table-head primary",
      flex: 1,
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <span
              onClick={() => {
                //setAlertModal(true);
                setId(params.row.id);
                formik.setValues({
                  firstName: params.row.firstName,
                  lastName: params.row.lastName,
                  gender: params.row.gender,
                  hobbies: params.row.hobbies,
                  email: params.row.email,
                  password: params.row.password,
                });
              }}
              style={{
                backgroundColor: "#D4FECB",
                borderRadius: "10px",
                marginLeft: "6px",
              }}
            >
              <EditIcon
                style={{
                  fontSize: "16px",
                  margin: "4px",
                  color: "#1A9200",
                  cursor: "pointer",
                }}
              />
            </span>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setFilterData(
      tableData.filter(
        (item) =>
          item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="container">
      {loaderStatus ? <Loader /> : null}

      <TitleLabel titleLabel={"Employee Master"} />
      {/* id, firstName, lastName, gender, hobbies, email, password, userType, createdAt, updatedAt, departmentId */}
      <div className="mt-3">
        <Form onSubmit={formik.handleSubmit}>
          <div className="row">
            <Form.Group className="mb-3 col-md-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.firstName && formik.errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.lastName && formik.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.gender && formik.errors.gender}
              >
                <option value="" defaultValue disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.gender}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="hobbies">
              <Form.Label>Hobbies</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hobbies"
                value={formik.values.hobbies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.hobbies && formik.errors.hobbies}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.hobbies}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="email">
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-12" controlId="actions">
              <Button variant={id === "" ? "primary" : "warning"} type="submit">
                {id === "" ? "Submit" : "Update"}
              </Button>
              <Button
                variant="danger"
                type="reset"
                className="mx-2"
                onClick={() => {
                  formik.handleReset();
                  setId("");
                }}
              >
                Cancel
              </Button>
            </Form.Group>
          </div>
        </Form>
      </div>
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
        sx={{
          width: "100%",
          "& .super-app-theme--header": {
            background: "rgb(43,119,229)",
            background: "linear-gradient(to top, rgb(43,119,229), #2b77e5)",
            color: "#fff",
          },
        }}
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

      {/* Delete Modal */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setId("");
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <h4 className="text-danger">Really want to delete?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setId("");
            }}
          >
            Close
          </Button>
          <Button variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default EmployeeMaster;
