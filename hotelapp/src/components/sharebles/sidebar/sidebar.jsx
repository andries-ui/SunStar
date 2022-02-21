import React from 'react';
import './sidebar.css';
import { BuildCircleRounded, DriveEtaRounded, History, Home, HouseboatSharp, PersonTwoTone, ReportRounded, Timeline, TrendingUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarwrapper">
                <h3 className="sidebartitle">
                    Dashboard
                </h3>

                <ul className="sidebarlist">
                    
                    <Link to={'/'} className='link'>
                        <li className="sidebarlistitem active"> <Home className="sidebaricon" /> Home</li>
                    </Link>
                    <Link to={'/property'} className='link'>
                        <li className="sidebarlistitem"> <Timeline className="sidebaricon" /> Property </li>
                    </Link>
                    <Link to={'/home'} className='link'>
                        <li className="sidebarlistitem"> <TrendingUp className="sidebaricon" />Instant booking </li>
                    </Link>
                </ul>
            </div>


            <div className="sidebarwrapper">
                <h3 className="sidebartitle">
                    Quick Menu
                </h3>

                <ul className="sidebarlist">
    
                    <Link to={'/home'} className='link'>
                        <li className="sidebarlistitem"> <DriveEtaRounded className="sidebaricon" /> Certify Driver</li>
                    </Link>
                    <Link to={'/users'} className='link'>
                        <li className="sidebarlistitem"> <PersonTwoTone className="sidebaricon" /> Guests </li>
                    </Link>
                    <Link to={'/home'} className='link'>
                        <li className="sidebarlistitem"> <History className="sidebaricon" /> Transactions</li>
                    </Link>
                    <Link to={'/home'} className='link'>
                        <li className="sidebarlistitem"> <ReportRounded className="sidebaricon" /> Reports </li>
                    </Link>
                </ul>
            </div>

            <div className="sidebarwrapper">
                <h3 className="sidebartitle">
                    Notifications
                </h3>

                <ul className="sidebarlist">
                    <li className="sidebarlistitem"> <Timeline className="sidebaricon" /> Drivers</li>
                    <li className="sidebarlistitem"> <TrendingUp className="sidebaricon" /> Users </li>
                    <li className="sidebarlistitem"> <Home className="sidebaricon" /> Administration</li>
                </ul>
            </div>

            <div className="sidebarwrapper">
                <h3 className="sidebartitle">
                    Staff
                </h3>

                <ul className="sidebarlist">
                    <li className="sidebarlistitem"> <Home className="sidebaricon" /> Manage</li>
                    <li className="sidebarlistitem"> <TrendingUp className="sidebaricon" /> Report </li>
                </ul>
            </div>

        </div>
    )
}

export default Sidebar
