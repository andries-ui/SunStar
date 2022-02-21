import React, { useState } from 'react';
import Home from '../components/pages/home/Home';
import UserList from '../components/pages/userlist/UserList';
import Sidebar from '../components/sharebles/sidebar/sidebar';
import TopBar from '../components/sharebles/topbar/TopBar';
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import User from '../components/pages/user/User';
import './dashboard.css';
import Login from './../auth/login/login';
import Reset from '../auth/reset/reset';
import Property from '../components/pages/property/Property';
import Form from '../components/pages/property/form/Form';

export default function Dashboards() {

 const [signedin, setsignedin] = useState(false);

 const handleLogin=()=>{
   setsignedin(true);
   localStorage.setItem("loggedin", true);
 }

  return (

    <BrowserRouter className="container">
      <TopBar />

      {signedin  ? 
        <div className="sidebarcontainer">

          <Sidebar />

          <Routes className="route">
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/property" element={<Property />} />
            <Route path="/form" element={<Form />} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </div>:
        <Routes className="route">
        <Route path="/" element={<Login loggingin={handleLogin} />} />
        <Route path="/reset" element={<Reset />} /> 
      </Routes>}

    </BrowserRouter >
  )
}
