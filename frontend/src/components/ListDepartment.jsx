import { useEffect, useState } from "react";
import {getDepartmentList,deleteDepartment} from "../services/DepartmentService.js";
import { useNavigate } from "react-router-dom";

const ListDepartment = () => {
    const [departments,setDepartments] = useState([]); 
    const navigator = useNavigate();

    useEffect(()=>{
        getDepartmentList().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.log(error);
        })
    },[]);


    function addNewDepartment(){
        navigator('/add-department');
    }

    function updateDepartment(id){
        navigator(`/update-department/${id}`)
    }

    function removeDepartment(id){
        deleteDepartment(id).then(response => {
            getDepartmentList().then((response) => {
                setDepartments(response.data);
            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            console.log(error);
        })
    }

    return(
        <div className="container">
        <h2 className="text-center">List of Departments</h2>
        <button className="btn btn-primary mb-2" onClick={()=> addNewDepartment()}>Add Department</button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Department ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    departments.map(department => 
                    <tr key={department.departmentID}>
                        <td>{department.departmentID}</td>
                        <td>{department.name}</td>
                        <td>{department.description}</td>
                        <td><button className="btn btn-info" onClick={()=>updateDepartment(department.departmentID)}>Update</button>
                            <button className="btn btn-danger ms-3"  onClick={()=>removeDepartment(department.departmentID)}>Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>

    )
}

export default ListDepartment;