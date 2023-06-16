import React, { useState, useEffect } from "react";
import TitleLabel from "../../CommonComponents/TitleLabel/TitleLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createDeptAPI,
  updateDeptAPI,
  getAllDeptAPI,
  deleteDeptAPI,
} from "../../API/DepartmentAPI";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../CommonComponents/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "react-bootstrap/Modal";
import { userLogout } from "../../ReduxStore/Action/LoginAction";

const DepartmentMaster = () => {
  const authUser = useSelector((state) => state.LoginReducer.list[0]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [id, setId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const validate = (values) => {
    const errors = {};

    if (!values.departmentName) {
      errors.departmentName = "Department name is required";
    }

    if (!values.categoryName) {
      errors.categoryName = "Category name is required";
    }

    if (!values.location) {
      errors.location = "Location is required";
    }

    if (!values.salary) {
      errors.salary = "Salary is required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      departmentName: "",
      categoryName: "",
      location: "",
      salary: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      setLoaderStatus(true);
      // Handle form submission here
      console.log(values);
      let token = authUser.token;
      let headers = {
        token,
      };

      if (id == "") {
        axios
          .post(createDeptAPI, values, { headers })
          .then((res) => {
            if (res.data === "UNAUTHORIZED") {
              sessionStorage.removeItem("token");
              dispatch(userLogout());
              setLoaderStatus(false);
              navigate("/");
            } else if (res.data === "SAVED") {
              getAllDeptData();
              setLoaderStatus(false);
              toast.success("Department created sucessfully");
              resetForm();
            }
          })
          .catch((err) => {
            setLoaderStatus(false);
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            toast.error("Department creation failed, try again");
          });
      } else {
        values.id = id;
        axios
          .put(updateDeptAPI, values, { headers })
          .then((res) => {
            if (res.data === "UNAUTHORIZED") {
              sessionStorage.removeItem("token");
              dispatch(userLogout());
              setLoaderStatus(false);
              navigate("/");
            } else if (res.data === "UPDATED") {
              getAllDeptData();
              setLoaderStatus(false);
              toast.success("Department updated sucessfully");
              resetForm();
              setId("");
            }
          })
          .catch((err) => {
            setLoaderStatus(false);
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            toast.error("Department updation failed, try again");
          });
      }
    },
  });

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

  const deleteDept = () => {
    setLoaderStatus(true);
    let token = authUser.token;
    let headers = {
      token,
    };
    axios
      .delete(deleteDeptAPI + id, { headers })
      .then((res) => {
        if (res.data === "UNAUTHORIZED") {
          sessionStorage.removeItem("token");
          setLoaderStatus(false);
          navigate("/");
        } else if (res.data === "DELETED") {
          getAllDeptData();
          setShowModal(false);
          setId("");
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

  const [pageSize, setPageSize] = useState(5);
  //   id, departmentName, categoryName, location, salary, createdAt, updatedAt
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerClassName: "mc-table-head primary",
    },
    {
      field: "departmentName",
      headerName: "Department Name",
      headerClassName: "mc-table-head primary",
      flex: 1,
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "location",
      headerName: "Location",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "salary",
      headerName: "Salary",
      headerClassName: "mc-table-head primary",
      flex: 1,
      minWidth: 80,
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
                  departmentName: params.row.departmentName,
                  categoryName: params.row.categoryName,
                  location: params.row.location,
                  salary: params.row.salary,
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

            <span
              onClick={() => {
                //setAlertModal(true);
                setId(params.row.id);
                setShowModal(true);
              }}
              style={{
                backgroundColor: "#FBD8D7",
                borderRadius: "10px",
                marginLeft: "6px",
              }}
            >
              <DeleteIcon
                style={{
                  fontSize: "16px",
                  margin: "4px",
                  color: "#E90B04",
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
          item.departmentName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <div className="container">
      {loaderStatus ? <Loader /> : null}

      <TitleLabel titleLabel={"Department Master"} />

      <div className="mt-3">
        <Form onSubmit={formik.handleSubmit}>
          <div className="row">
            <Form.Group className="mb-3 col-md-3" controlId="departmentName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                {...formik.getFieldProps("departmentName")}
              />
              {formik.touched.departmentName && formik.errors.departmentName ? (
                <div className="error-text">{formik.errors.departmentName}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                {...formik.getFieldProps("categoryName")}
              />
              {formik.touched.categoryName && formik.errors.categoryName ? (
                <div className="error-text">{formik.errors.categoryName}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                {...formik.getFieldProps("location")}
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="error-text">{formik.errors.location}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter salary"
                {...formik.getFieldProps("salary")}
              />
              {formik.touched.salary && formik.errors.salary ? (
                <div className="error-text">{formik.errors.salary}</div>
              ) : null}
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
          <Button variant="danger" onClick={deleteDept}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default DepartmentMaster;
