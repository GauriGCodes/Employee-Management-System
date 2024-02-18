import { useEffect, useState } from "react";
import { createEmployee,updateEmployee } from "../services/EmployeeService";
import {getDepartmentList} from "../services/DepartmentService.js";
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";

const baseURL = "http://localhost:8080/api/employee/v1/";

const EmployeeComponent = () => {
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[email,setEmail]=useState('')
    const[departmentID,setDepartmentID]=useState(1)
    const[departments,setDepartments]=useState([])
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })


    const navigator = useNavigate();
    const {id} = useParams(); 

    useEffect(() => {
       if(id){ 
        axios.get(baseURL+id)
            .then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setDepartmentID(response.data.departmentID)
            })
            .catch(errors => {
                console.log(errors.response);
            });
        }     
    }, [id]);

    useEffect(() => {
        getDepartmentList().then(response => {
            setDepartments(response.data);
        }).catch(error => {
            console.log(error);
        })
    },[])


    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update Employee</h2>
        } 
        return  <h2 className="text-center">Add Employee</h2>
    }

    const saveEmployee = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const employee = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "departmentID":departmentID
            }

            if(id){
                employee["employeeID"]=id;
                updateEmployee(employee).then((response) => {
                    navigator('/employees');
                }).catch(errors => {
                    console.log(errors);
                })
            }else{
                console.log(employee);
                createEmployee(employee).then((response) => {
                    navigator('/employees');
                }).catch(error => {
                    console.log(error);
                })
            }
        } 
    }

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors }
        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }
        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }
        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    return(
        <>
         <div className="container mt-5">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 bg-transparent border-dark">
                        {pageTitle()}
                        <div className="card-body">
                            <form>
                                    <div className="form-group mb-2">
                                        <label className="form-label">First Name:</label>
                                        <input
                                            type="text"
                                            placeholder="Enter First Name"
                                            name="firstName"
                                            value={firstName}
                                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                            onChange={(e)=>setFirstName(e.target.value)}
                                            required
                                        />
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label">Last Name:</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Last Name"
                                            name="lastName"
                                            value={lastName}
                                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                            onChange={(e)=>setLastName(e.target.value)}
                                            required
                                        />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            placeholder="Enter Email"
                                            name="email"
                                            value={email}
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            onChange={(e)=>setEmail(e.target.value)}
                                            required
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label">Select Depatment:</label>
                                        <select className="form-select" value={departmentID} onChange={(e) => setDepartmentID(e.target.value)}>
                                               {departments.map((dept) => (
                                               <option key={dept.departmentID} value={dept.departmentID}>{dept.name}</option>
                                        ))}
                                        </select>
                                    </div>


                                </form>
                                <button className='btn btn-success' type="submit" onClick={saveEmployee}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeComponent;