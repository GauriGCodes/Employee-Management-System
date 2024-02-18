import { useEffect, useState } from "react";
import {addDepartment, getDepartmentById,updateDepartment} from "../services/DepartmentService.js";
import { useNavigate,useParams } from "react-router-dom";


const Department = () => {
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const navigator = useNavigate();
    const {id} = useParams();

    if(id){
        useEffect(() => {getDepartmentById(id).then(response => {
            setName(response.data.name)
            setDescription(response.data.description)
        }).catch(error => {
            console.log(error)
        })},[id])
    }

    const saveDepartment = (e) => {
        e.preventDefault();

        const department = {
            "name":name,
            "description":description
        }

        if(id){
            department["departmentID"]=id;
            updateDepartment(department).then(response => {
                navigator("/departments")
            }).catch(error => {
                console.log(error);
            })
        }else{
            addDepartment(department).then(response => {
                navigator('/departments')        
            }).catch(error => {
                console.log(error);
            });
        }
    }

    function pagetitle(){
        if(id) return "Update Department";
        return "Add Department";
    }

    return(
        <>
             <div className="container mt-5">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 bg-transparent border-dark">
                    <h2 className="text-center">{pagetitle()}</h2>
                        <div className="card-body">
                            <form>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Department Name"
                                            name="name"
                                            value={name}
                                            className="form-control"
                                            onChange={(e)=>setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label">Description</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Department Description"
                                            name="description"
                                            value={description}
                                            className="form-control"
                                            onChange={(e)=>setDescription(e.target.value)}
                                            required
                                        />
                                    </div>

                                </form>
                                <button className='btn btn-success' type="submit" onClick={saveDepartment}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        
        
        </>
    )
}

export default Department;