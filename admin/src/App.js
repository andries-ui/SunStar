import React from 'react';
import './App.css';
import Home from './components/pages/home/Home';
import UserList from './components/pages/userlist/UserList';
import Sidebar from './components/sharebles/sidebar/sidebar';
import TopBar from './components/sharebles/topbar/TopBar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import User from './components/pages/user/User';
import HotelList from './components/pages/hotellist/HotelList';
import Hotel from './components/pages/hotel/Hotel';
import HotelForm from './components/pages/hotellist/form/HotelForm';
import Verify from './components/pages/verify/Verify';
import Transactions from './components/pages/transactions/Transactions';
import Reports from './components/pages/reports/Reports';
import Notification from './components/pages/notifications/Notification';
import NotificationUser from './components/pages/Notification_user/Notification_User';

function App() {
  return (

    <BrowserRouter className="App">

      <TopBar />
      <div className="sidebarcontainer">

        <Sidebar />

        <Routes className="route">
          <Route path="/" element={<Home />}/>
          <Route path="/users" element={<UserList />}/>
          <Route path="/user/:id" element={<User/>}/>
          <Route path="/hotels" element={<HotelList/>}/>
          <Route path="/hotel/:id" element={<Hotel/>}/>
          <Route path="/hotelform" element={<HotelForm/>}/>
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/transaction" element={<Transactions/>}/>
          <Route path="/report" element={<Reports/>}/>
          <Route path="/notification/hotel" element={<Notification/>}/>
          <Route path="/notification/user" element={<NotificationUser/>}/>
          
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
