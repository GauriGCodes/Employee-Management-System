import axios from "axios";

const base_URL = "http://localhost:8080/api/department/v1/";

export const getDepartmentList = () => axios.get(base_URL);
export const addDepartment = (department) => axios.post(base_URL,department);
export const updateDepartment = (department) => axios.put(base_URL,department);
export const getDepartmentById = (id) => axios.get(base_URL+id);
export const deleteDepartment=(id) => axios.delete(base_URL+id);