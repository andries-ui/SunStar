import React from 'react';
import './widgetsmall.css';
import { CancelOutlined } from '@mui/icons-material';

export default function WidgesSmall() {
    return (
        <div className="small">
            <span className="title">New Resrvations </span>
            <ul className="list">
                <li className="item">
                    <img src="" alt='' className="image" />
                    <div className="box">
                        <span className="names">Andries sebola</span><br />
                        <span className="room">room name </span>
                    </div>
                    <span className="status">pending</span>
                    <button className="button"><CancelOutlined className="icon" /></button>
                </li>

                <li className="item">
                    <img src="" alt='' className="image" />
                    <div className="box">
                        <span className="names">Andries sebola</span><br />
                        <span className="room">room name </span>
                    </div>
                    <span className="status">pending</span>
                    <button className="button"><CancelOutlined className="icon" /></button>
                </li>

                <li className="item">
                    <img src="" alt='' className="image" />
                    <div className="box">
                        <span className="names">Andries sebola</span><br />
                        <span className="room">room name </span>
                    </div>
                    <span className="status">pending</span>
                    <button className="button"><CancelOutlined className="icon" /></button>
                </li>

                <li className="item">
                    <img src="" alt='' className="image" />
                    <div className="box">
                        <span className="names">Andries sebola</span><br />
                        <span className="room">room name </span>
                    </div>
                    <span className="status">pending</span>
                    <button className="button"><CancelOutlined className="icon" /></button>
                </li>
            </ul>
        </div>
    )
}
