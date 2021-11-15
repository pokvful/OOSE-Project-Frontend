import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import './index.css';
import EmployeeList from './pages/employee_list';
import EmployeeDetail from './pages/employee_detail';
import EmployeeEdit from './pages/employee_edit';
import Nav from './components/navbar/Nav';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Components from './pages/components/ComponentsDemo';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Nav/>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<div> </div>} />
      <Route path="/components" element={<Components/>}/>
      <Route path="employees">
        <Route index  element={<EmployeeList />}/>
        <Route path=":id" element={<EmployeeDetail />}/>
        <Route path="edit/:id" element={<EmployeeEdit />}/>
      </Route> 
      <Route
      //todo 404
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>  
          </main>
        }
      />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
