import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './components/navbar/Nav';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Components from './pages/components/ComponentsDemo';
import AreaList from './pages/area-list/AreaList';
import AreaDetail from './pages/area-detail/AreaDetail';
import AreaEdit from './pages/area-edit/AreaEdit';
import LocationList from './pages/location-list/LocationList';
import LocationDetail from './pages/location-detail/LocationDetail';
import LocationEdit from './pages/location-edit/LocationEdit';
import Home from './pages/home/Home';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Nav/>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/components" element={<Components/>}/>
      <Route path="areas">
        <Route index element={<AreaList/>}/>
        <Route path=":id" element={<AreaDetail/>}/>
        <Route path="edit/:id" element={<AreaEdit/>}/>
      </Route>
      <Route path="locations">
        <Route index element={<LocationList />}/>
        <Route path=":id" element={<LocationDetail />}/>
        <Route path="edit/:id" element={<LocationEdit />}/>
      </Route>
      <Route
      //todo 404
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <h2>404 page not found</h2>
            <p>There's nothing here!</p>  
          </main>
        }
      />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
