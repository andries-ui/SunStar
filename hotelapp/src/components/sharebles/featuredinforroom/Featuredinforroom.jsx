import React from 'react';
import './featuredinforroom.css';
import { Add, ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Featuredinforroom() {
    return (
        <div className="featured">
            <div className="featureditem">
                <span className="featuredtitle">Revenue</span>
                <div className="featuredmoneycontainer">
                    <span className="featuredmoney">R5,376.67</span>
                    <span className="featuredmoneyrate">-7.3  <ArrowDownward className='featuredicon negative' /></span>
                </div>
                <span className="featuredsub">Compared to last month</span>
            </div>

            <div className="featureditem">
                <span className="featuredtitle">Revenue</span>
                <div className="featuredmoneycontainer">
                    <span className="featuredmoney">R5,376.67</span>
                    <span className="featuredmoneyrate">-7.3  <ArrowDownward className='featuredicon negative' /></span>
                </div>
                <span className="featuredsub">Compared to last month</span>
            </div>

            <Link to={'/form'}>
                <div className="featuredbutton">

                    <button className="button">
                        <Add className="icon" /> Add Room
                    </button>
                </div>

            </Link>
        </div>
    )
}
