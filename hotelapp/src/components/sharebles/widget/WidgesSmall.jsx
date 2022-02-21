import React from 'react';
import './widgetsmall.css';
import { CancelOutlined } from '@mui/icons-material';

export default function WidgesSmall() {
    return (
        <div className="small">
            <span className="title">New Resrvations </span>
            <ul className="list">
                <li >
                    <div className="item">
                    <img src="" alt='' className="image" />
                    <div className="box-container">
                    <div className="box">
                        <span className="names">Andries sebola </span>
                    </div>
                    
                    <div className="box">
                        <span className="room">room name </span>
                    </div>
                    </div>
                    <div className="box">
                        <span className="status">pending</span>
                    </div>
                    <button className="button"><CancelOutlined className="icon" /></button>
                    </div>
                </li>
                <li >
                    <div className="item">
                    <img src="" alt='' className="image" />
                    <div className="box-container">
                    <div className="box">
                        <span className="names">Andries sebola </span>
                    </div>
                    
                    <div className="box">
                        <span className="room">room name </span>
                    </div>
                    </div>
                    <div className="box">
                        <span className="status">pending</span>
                    </div>
                    <button className="button"><CancelOutlined className="icon" /></button>
                    </div>
                </li>
                <li >
                    <div className="item">
                    <img src="" alt='' className="image" />
                    <div className="box-container">
                    <div className="box">
                        <span className="names">Andries sebola </span>
                    </div>
                    
                    <div className="box">
                        <span className="room">room name </span>
                    </div>
                    </div>
                    <div className="box">
                        <span className="status">pending</span>
                    </div>
                    <button className="button"><CancelOutlined className="icon" /></button>
                    </div>
                </li>


            </ul>
        </div>
    )
}
