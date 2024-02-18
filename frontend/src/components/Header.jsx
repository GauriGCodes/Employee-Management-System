import { NavLink } from "react-router-dom";

const Header = () => {
    return(
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body justify-content-start" data-bs-theme="dark">
            <a className="navbar-brand" href="#">Employee Management Application</a>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row align-items-center">
                <li className="nav-item"><NavLink className="nav-link active" to="/employees">Employees</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link active" to="/departments">Departments</NavLink></li>
            </ul>
            </div>
           
        </nav>
    )
}

export default Header; 