import React from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { loginCheckAPI } from "../../API/EmployeeAPI";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { userLogin } from "../../ReduxStore/Action/LoginAction";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      const loginObj = {
        email: values.email,
        password: values.password,
      };
      loginCheck(loginObj);
    },
  });

  const loginCheck = (data) => {
    axios
      .post(loginCheckAPI, data)
      .then((res) => {
        if (res.data !== null) {
          console.log("====================================");
          console.log(res.data);
          console.log("====================================");
          sessionStorage.setItem("token", res.data.token);
          let logObject = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            userType: res.data.userType,
            token: res.data.token,
          };
          dispatch(userLogin(logObject));
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login failed, try again.");
      });
  };

  return (
    <div className="login-wrapper">
      <img
        src={logo}
        style={{ marginBottom: "16px", width: "140px" }}
        alt="logo"
      />
      <div className="login-box">
        <strong className="login-title">LOGIN</strong>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} md={4}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              type="email"
              id="email"
              label="Email Id"
              variant="standard"
              margin="dense"
              size="small"
              {...formik.getFieldProps("email")}
            />
          </Box>
          {formik.touched.email && formik.errors.email && (
            <div className="error-text">{formik.errors.email}</div>
          )}

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              type="password"
              id="password"
              label="Password"
              variant="standard"
              margin="dense"
              size="small"
              {...formik.getFieldProps("password")}
            />
          </Box>
          {formik.touched.password && formik.errors.password && (
            <div className="error-text">{formik.errors.password}</div>
          )}

          <Box sx={{ marginTop: "16px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              fullWidth
            >
              LOGIN
            </Button>
          </Box>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default LoginComponent;
