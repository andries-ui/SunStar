import React from 'react';
import './Topbar.css';
import { NotificationsActiveOutlined, Settings } from '@mui/icons-material';

export default function TopBar() {
    return (
        <div>
            <div className="topbar">
                <div className="topbarwrapper">
                    <div className="topleft">
                    <img src='https://clipartix.com/wp-content/uploads/2016/12/Look-im-awesome-clipart.jpg' className="avater" alt='profile' />
                   
                        <span className="logo"> SunStar </span>
                    </div>
                    <div className="topright">
                       
                    

                        </div>

                </div>
            </div>

            
        </div>
    )
}
