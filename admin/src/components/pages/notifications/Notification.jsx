import React from 'react';
import './notifications.css';
import { PhoneSharp, Publish } from '@mui/icons-material';
import { Divider } from '@mui/material';

export default function Notification() {
    return (
        <div className="user">

            <h3 className="title">Edit User</h3>
            <div className="usercontainer">
                <div className="usershow">

                    <div className="usershowtop">
                        <img src='https://st2.depositphotos.com/1811709/7121/i/600/depositphotos_71213521-stock-photo-fashionable-portrait-of-a-girl.jpg' alt='' className="usershowimage" />
                        <div className="usershownames">
                            <span className="usershowspannames">names </span>
                            <span className="usershowspanusernam">username </span>
                        </div>
                    </div>
                    <div className="usershowbottom">
                        <div className="usershowinfo">
                            <span className="header">Contact</span>
                            <Divider className="divider" />
                            <span className="usershowspan"> <PhoneSharp className="usericon" /> ********** </span> <br />
                            <span className="usershowspan"> <PhoneSharp className="usericon" /> ********** </span>
                        </div>
                        <div className="usershowinfo">
                            <span className="header">Address</span>
                            <Divider className="divider" />
                            <span className="usershowspan"> <PhoneSharp className="usericon" /> ********** </span> <br />
                            <span className="usershowspan"> <PhoneSharp className="usericon" /> ********** </span>
                        </div>

                    </div>
                </div>
                <div className="userupdate">
                    <span className="title">Edit user profile</span>

                    <form className="form">

                        <div>
                            <div className="update">
                                <div className="left">
                                    <div className="usershowtop">
                                        <span className="hint">Names</span>
                                        <div className="item">
                                            <input type={"text"} placeholder='names' className='input' />
                                        </div>

                                    </div>
                                    <div className="usershowtop">
                                        <span className="hint">Names</span>
                                        <div className="item">
                                            <input type={"text"} placeholder='names' className='input' />
                                        </div>

                                    </div>
                                    <div className="usershowtop">
                                        <span className="hint">Names</span>
                                        <div className="item">
                                            <input type={"text"} placeholder='names' className='input' />
                                        </div>

                                    </div>
                                    <div className="usershowtop">
                                        <span className="hint">Names</span>
                                        <div className="item">
                                            <input type={"text"} placeholder='names' className='input' />
                                        </div>

                                    </div>
                                </div>
                                <div className="right">

                                    <div className="frame">
                                        <img src='https://st2.depositphotos.com/1811709/7121/i/600/depositphotos_71213521-stock-photo-fashionable-portrait-of-a-girl.jpg' alt='image' className='uploadimage' />
                                        <button><Publish /></button>
                                    </div>
                                </div>
                            </div>
                            <button className="btnupdate">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
