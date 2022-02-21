import React from 'react';
import './sidebar.css';
import { BuildCircleRounded, DriveEtaRounded, History, Home, HomeMaxSharp, House, HouseboatSharp, NotificationsActiveOutlined, PersonTwoTone, ReportRounded, Timeline, TrendingUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">

            <div className="sidebarwrapper">
                <h3 className="sidebartitle">
                    Quick Menu
                </h3>

                <ul className="sidebarlist">
                <Link to={'/'} className='link'>
                        <li className="sidebarlistitem"> <House className="sidebaricon" /> Home</li>
                    </Link>
                    <Link to={'/hotels'} className='link'>
                        <li className="sidebarlistitem"> <HouseboatSharp className="sidebaricon" /> Hotels</li>
                    </Link>
  
                    <Link to={'/users'} className='link'>
                        <li className="sidebarlistitem"> <PersonTwoTone className="sidebaricon" /> Users </li>
                    </Link>
                    <Link to={'/transaction'} className='link'>
                        <li className="sidebarlistitem"> <History className="sidebaricon" /> Transactions</li>
                    </Link>
                    <Link to={'/report'} className='link'>
                        <li className="sidebarlistitem"> <ReportRounded className="sidebaricon" /> Reports </li>
                    </Link>
                </ul>
            </div>

            <div className="sidebarwrapper">
                <h3 className="sidebartitle">
                    Notifications
                </h3>

                <ul className="sidebarlist">
                    <Link to={'/notification/hotel'} className='link'>
                    <li className="sidebarlistitem">  <div className="topiconcontainer">
                            <NotificationsActiveOutlined className="icon" />
                            <span className="iconbedge">1</span>
                        </div> Hotels</li>
                        </Link>
                    <Link to={'/notification/hotel'} className='link'>
                   <li className="sidebarlistitem">  <div className="topiconcontainer">
                            <NotificationsActiveOutlined className="icon" />
                            <span className="iconbedge">1</span>
                        </div> Users </li>
                        </Link>
                </ul>
            </div>

            

        </div>
    )
}

export default Sidebar
