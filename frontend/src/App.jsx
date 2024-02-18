import './App.css'
import ListEmployeeComponent from './components/ListEmployee';
import ListDepartment from './components/ListDepartment';
import Department from './components/Department';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import EmployeeComponent from './components/Employee';

function App() {
  return (
    <>
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={ <ListEmployeeComponent/>}></Route>
          <Route path="/employees" element={ <ListEmployeeComponent/>}></Route>
          <Route path="/add-employee" element={<EmployeeComponent/>}></Route>
          <Route path="/update-employee/:id" element={<EmployeeComponent/>}></Route>
          <Route path="/departments" element={<ListDepartment/>}></Route>
          <Route path="/add-department" element={<Department/>}></Route>
          <Route path="/update-department/:id" element={<Department/>}></Route>
        </Routes>
        <Footer />
    </BrowserRouter>
    </>
    )
}

export default App;
