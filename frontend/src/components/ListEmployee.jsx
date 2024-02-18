import { useEffect, useState } from "react";
import {listEmployees,deleteEmployee} from "../services/EmployeeService";
import {useNavigate} from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees,setEmployees] = useState([]); 
    const navigator = useNavigate();

    useEffect(() => {
     listEmployees().then((response) => {
        setEmployees(response.data)
     }).catch(error => {
        console.error(error);
     })},[])

    
     function addNewEmployee(){
        navigator('/add-employee');
     }


     function updateEmployee(id){
        navigator(`/update-employee/${id}`);
     }


     function removeEmployee(id){
        deleteEmployee(id).then((response)=>{
            console.log(response.data);
            listEmployees().then((response) => {
                setEmployees(response.data)
             }).catch(error => {
                console.error(error);
             })
        }).catch((error)=>{
            console.log(error);
        })
     }

     return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <button className="btn btn-primary mb-2" onClick={()=> addNewEmployee()}>Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Employee Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => 
                        <tr key={employee.employeeID}>
                            <td>{employee.employeeID}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td><button className="btn btn-info" onClick={()=>updateEmployee(employee.employeeID)}>Update</button>
                                <button className="btn btn-danger ms-3"  onClick={()=>removeEmployee(employee.employeeID)}>Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent;