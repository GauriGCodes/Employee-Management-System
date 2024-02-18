import axios from "axios";

const baseURL = "http://localhost:8080/api/employee/v1/";

export const listEmployees=() => axios.get(baseURL);

export const createEmployee = (employee) => axios.post(baseURL,employee);

export const getEmployee = (id) => axios.get(baseURL+id); 

export const updateEmployee = (employee) => axios.put(baseURL,employee);

export const deleteEmployee = (id) => axios.delete(baseURL+id);  