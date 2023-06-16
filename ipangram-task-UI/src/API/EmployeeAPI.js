import { BaseIp } from "./APIURL";

// ipangram/login/check
export const loginCheckAPI = BaseIp + "ipangram/login/check";

// get-data-by-token
export const getDataByTokenAPI = BaseIp + "ipangram/login/get-data-by-token";

// ipangram/employee/
export const getAllEmployeeAPI = BaseIp + "ipangram/employee/get-all-emp";
export const createEmployeeAPI = BaseIp + "ipangram/employee/create";
export const updateEmployeeAPI = BaseIp + "ipangram/employee/update";
export const getAllEmployeeByDeptNameDescAPI =
  BaseIp + "ipangram/employee/get-emp-desc-order";
export const deleteEmployeeAPI = BaseIp + "ipangram/employee/delete/";

// update-muli-emp
export const updateMultiEmpDeptAPI =
  BaseIp + "ipangram/employee/update-muli-emp";

// get-emp-desc-order
export const getEmpDeptNameDesc =
  BaseIp + "ipangram/employee/get-emp-desc-order";

// get-emp-by-id/:id
export const getEmpByIdApi = BaseIp + "ipangram/employee/get-emp-by-id";
